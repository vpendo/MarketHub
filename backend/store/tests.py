from django.test import TestCase
from django.contrib.auth import get_user_model
from .models import Product

User = get_user_model()


class ProductModelTest(TestCase):
    def test_create_product(self):
        p = Product.objects.create(title='Test', price=9.99)
        self.assertEqual(str(p), 'Test')
