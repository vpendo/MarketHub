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
    product_id = serializers.UUIDField(write_only=True)

    class Meta:
        model = OrderItem
        fields = ('id', 'product', 'product_id', 'quantity', 'price')
        read_only_fields = ('id',)


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = ('id', 'user', 'status', 'total', 'created_at', 'items')
        read_only_fields = ('id', 'created_at', 'total', 'user')

    def create(self, validated_data):
        items_data = validated_data.pop('items', [])
        user = self.context['request'].user
        order = Order.objects.create(user=user, status=validated_data.get('status', 'pending'), total=0)
        total = 0
        for item in items_data:
            product_id = item.get('product_id')
            quantity = item.get('quantity', 1)
            price = item.get('price', 0)
            product = Product.objects.get(id=product_id)
            OrderItem.objects.create(order=order, product=product, quantity=quantity, price=price)
            total += price * quantity
        order.total = total
        order.save()
        return order
