from django.contrib import admin
from django.urls import path, include
from django.views.generic.base import RedirectView
from django.http import HttpResponse


def home(request):
    return HttpResponse("Welcome to MarketHub API!")
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('', home),
    path('admin/', admin.site.urls),
    path('api/auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/', include('store.urls')),
]
