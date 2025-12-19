from django.contrib.auth import get_user_model, authenticate
from django.shortcuts import get_object_or_404

from rest_framework import (
    viewsets,
    permissions,
    status,
    serializers
)
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import (
    IsAuthenticated,
    IsAuthenticatedOrReadOnly,
    IsAdminUser
)

from rest_framework_simplejwt.tokens import RefreshToken
from drf_spectacular.utils import extend_schema

from .models import Product, CartItem, Order
from .serializers import (
    ProductSerializer,
    CartItemSerializer,
    OrderSerializer
)

User = get_user_model()

# =====================================================
# AUTH SERIALIZERS
# =====================================================

class RegisterSerializer(serializers.Serializer):
    name = serializers.CharField(min_length=2)
    email = serializers.EmailField()
    password = serializers.CharField(min_length=6)
    return_token = serializers.BooleanField(required=False, default=True)


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()


# =====================================================
# HELPERS
# =====================================================

def user_to_dict(user):
    return {
        "id": str(user.id),
        "name": user.get_full_name() or user.username,
        "email": user.email,
        "is_staff": bool(user.is_staff),
        "role": "admin" if user.is_staff else "customer",
    }


# =====================================================
# AUTH APIS
# =====================================================

class RegisterAPIView(APIView):
    permission_classes = [permissions.AllowAny]

    @extend_schema(
        request=RegisterSerializer,
        responses={201: serializers.DictField()},
        description="Register a new user and optionally return JWT tokens."
    )
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        if User.objects.filter(email=data["email"]).exists():
            return Response(
                {"detail": "User with this email already exists."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user = User.objects.create_user(
            username=data["email"],
            email=data["email"],
            password=data["password"],
        )

        if " " in data["name"]:
            first, *rest = data["name"].split(" ")
            user.first_name = first
            user.last_name = " ".join(rest)
        else:
            user.first_name = data["name"]

        # Auto-admin (optional)
        if data["email"].lower() == "markethub250@gmail.com":
            user.is_staff = True

        user.save()

        return_token = data.get("return_token", True)

        if return_token:
            refresh = RefreshToken.for_user(user)
            return Response(
                {
                    "user": user_to_dict(user),
                    "access": str(refresh.access_token),
                    "refresh": str(refresh),
                },
                status=status.HTTP_201_CREATED,
            )

        return Response(
            {"user": user_to_dict(user)},
            status=status.HTTP_201_CREATED,
        )


class LoginAPIView(APIView):
    permission_classes = [permissions.AllowAny]

    @extend_schema(
        request=LoginSerializer,
        responses={200: serializers.DictField()},
        description="Login and receive JWT tokens."
    )
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        email = data["email"]
        password = data["password"]

        try:
            user_obj = User.objects.get(email=email)
            username = user_obj.username
        except User.DoesNotExist:
            username = email

        user = authenticate(request, username=username, password=password)

        if not user:
            return Response(
                {"detail": "Invalid credentials"},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        refresh = RefreshToken.for_user(user)

        return Response(
            {
                "user": user_to_dict(user),
                "access": str(refresh.access_token),
                "refresh": str(refresh),
            }
        )


# =====================================================
# PRODUCT API (ADMIN SAFE DELETE)
# =====================================================

class ProductViewSet(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    lookup_field = "id"

    def get_permissions(self):
        if self.action in ["create", "update", "partial_update", "destroy"]:
            return [IsAdminUser()]
        return [IsAuthenticatedOrReadOnly()]

    def get_queryset(self):
        qs = Product.objects.filter(is_active=True)
        q = self.request.query_params.get("q")
        category = self.request.query_params.get("category")

        if q:
            qs = qs.filter(title__icontains=q) | qs.filter(description__icontains=q)

        if category:
            qs = qs.filter(category__iexact=category)

        return qs

    # ✅ SOFT DELETE (FIXES YOUR DELETE BUTTON)
    def destroy(self, request, *args, **kwargs):
        product = self.get_object()
        product.is_active = False
        product.save()
        return Response(status=status.HTTP_204_NO_CONTENT)


# =====================================================
# CART API
# =====================================================

class CartItemViewSet(viewsets.ModelViewSet):
    serializer_class = CartItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return CartItem.objects.filter(
            user=self.request.user
        ).select_related("product")

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# =====================================================
# ORDER API
# =====================================================

class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        if self.action in ["update", "partial_update", "destroy"]:
            return [IsAdminUser()]
        return [IsAuthenticated()]

    def get_queryset(self):
        if self.request.user.is_staff:
            return Order.objects.all().prefetch_related("items")
        return Order.objects.filter(
            user=self.request.user
        ).prefetch_related("items")

    @action(detail=True, methods=["post"])
    def pay(self, request, pk=None):
        order = get_object_or_404(Order, pk=pk, user=request.user)
        order.status = "processing"
        order.save()
        return Response({"status": "processing"})

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
