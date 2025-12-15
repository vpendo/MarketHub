from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Product, CartItem, Order, OrderItem
from .serializers import ProductSerializer, CartItemSerializer, OrderSerializer
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAdminUser
from rest_framework.views import APIView
from django.contrib.auth import get_user_model, authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import serializers


User = get_user_model()


class RegisterSerializer(serializers.Serializer):
    name = serializers.CharField(min_length=2)
    email = serializers.EmailField()
    password = serializers.CharField(min_length=6)
    # optional flag: when false, do not return an auth token in the response
    return_token = serializers.BooleanField(required=False, default=True)


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()


def user_to_dict(user):
    return {
        "id": str(user.id),
        "name": user.get_full_name() or user.username,
        "email": user.email,
        "is_staff": bool(user.is_staff),
        "role": "admin" if user.is_staff else "customer",
    }


class RegisterAPIView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        # create user, use email as username
        if User.objects.filter(email=data['email']).exists():
            return Response({"detail": "User with this email already exists."}, status=status.HTTP_400_BAD_REQUEST)
        user = User.objects.create_user(username=data['email'], email=data['email'], password=data['password'])
        # try to set first/last name from full name
        if ' ' in data['name']:
            first, *rest = data['name'].split(' ')
            user.first_name = first
            user.last_name = ' '.join(rest)
        else:
            user.first_name = data['name']
        user.save()

        # Determine whether to return token: allow override via JSON field or query param
        return_token = data.get('return_token', True)
        qp = request.query_params.get('return_token')
        if qp is not None:
            # accept 'false' / '0' as False
            if str(qp).lower() in ('0', 'false', 'no'):
                return_token = False
            else:
                return_token = True

        if return_token:
            refresh = RefreshToken.for_user(user)
            return Response({
                "user": user_to_dict(user),
                "access": str(refresh.access_token),
                "refresh": str(refresh),
            })
        return Response({"user": user_to_dict(user)})


class LoginAPIView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        user = authenticate(request, username=data['email'], password=data['password'])
        if not user:
            return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
        refresh = RefreshToken.for_user(user)
        return Response({
            "user": user_to_dict(user),
            "access": str(refresh.access_token),
            "refresh": str(refresh),
        })


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.filter(is_active=True)
    serializer_class = ProductSerializer
    lookup_field = 'id'

    def get_permissions(self):
        # Only admin users may create/update/delete products
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [IsAdminUser()]
        return [IsAuthenticatedOrReadOnly()]

    def get_queryset(self):
        qs = Product.objects.filter(is_active=True)
        q = self.request.query_params.get('q')
        category = self.request.query_params.get('category')
        if q:
            qs = qs.filter(title__icontains=q) | qs.filter(description__icontains=q)
        if category:
            qs = qs.filter(category__iexact=category)
        return qs


class CartItemViewSet(viewsets.ModelViewSet):
    serializer_class = CartItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return CartItem.objects.filter(user=self.request.user).select_related('product')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_permissions(self):
        # Only admins may modify orders (update status, etc). Authenticated users may create/list their orders.
        if self.action in ['partial_update', 'update', 'destroy']:
            return [IsAdminUser()]
        return [permissions.IsAuthenticated()]

    def get_queryset(self):
        # Admins can view all orders, normal users only their own
        if self.request.user and self.request.user.is_staff:
            return Order.objects.all().prefetch_related('items')
        return Order.objects.filter(user=self.request.user).prefetch_related('items')

    @action(detail=True, methods=['post'])
    def pay(self, request, pk=None):
        # Placeholder: integrate payment gateway here
        order = get_object_or_404(Order, pk=pk, user=request.user)
        order.status = 'processing'
        order.save()
        return Response({'status': 'processing'})
