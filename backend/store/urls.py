from rest_framework import routers
from django.urls import path, include
from .views import ProductViewSet, CartItemViewSet, OrderViewSet
from .views import RegisterAPIView, LoginAPIView

router = routers.DefaultRouter()
router.register(r'products', ProductViewSet, basename='product')
router.register(r'cart', CartItemViewSet, basename='cart')
router.register(r'orders', OrderViewSet, basename='order')

urlpatterns = [
    path('auth/register/', RegisterAPIView.as_view(), name='register'),
    path('auth/login/', LoginAPIView.as_view(), name='login'),
    path('', include(router.urls)),
]
