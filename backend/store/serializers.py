from rest_framework import serializers
from .models import Product, CartItem, Order, OrderItem
from django.contrib.auth import get_user_model

User = get_user_model()


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    product_id = serializers.UUIDField(write_only=True)

    class Meta:
        model = CartItem
        fields = ('id', 'user', 'product', 'product_id', 'quantity', 'added_at')
        read_only_fields = ('id', 'added_at')

    def create(self, validated_data):
        user = validated_data.get('user')
        product_id = validated_data.pop('product_id')
        product = Product.objects.get(id=product_id)
        item, created = CartItem.objects.get_or_create(user=user, product=product, defaults={'quantity': validated_data.get('quantity',1)})
        if not created:
            item.quantity = validated_data.get('quantity', item.quantity)
            item.save()
        return item


class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)

    class Meta:
        model = OrderItem
        fields = ('id', 'product', 'quantity', 'price')


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = ('id', 'user', 'status', 'total', 'created_at', 'items')
        read_only_fields = ('id', 'created_at', 'total')
