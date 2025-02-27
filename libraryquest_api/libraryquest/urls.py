"""
URL configuration for libraryquest project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)

from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from libraryquest_app import views

router = DefaultRouter()
router.register(r"libraries", views.LibraryView)
router.register(r"readers", views.ReaderView)
router.register(r"membershipZones", views.MembershipZoneView)

urlpatterns = [
    path("", views.default_view),
    path("api/", include(router.urls)),
    path("admin/", admin.site.urls),
    path("auth/", include("djoser.urls")),
    path("auth/", include("djoser.urls.jwt")),
    path("users/reset_password/<uid>/<token>", views.confirm_new_password),
    # OpenAPI
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    # Two different OpenAPI UIs. Don't need both. FIXME pick one
    # Swagger UI:
    path(
        "api/schema/swagger-ui/",
        SpectacularSwaggerView.as_view(url_name="schema"),
        name="swagger-ui",
    ),
    # Redoc UI:
    path(
        "api/schema/redoc/",
        SpectacularRedocView.as_view(url_name="schema"),
        name="redoc",
    ),
]
