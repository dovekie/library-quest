from rest_framework import serializers
from djoser.serializers import (
    UserSerializer,
    UserCreateSerializer as BaseUserSerializer,
)
from .models import Library, Reader, MembershipZone


class LibrarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Library
        fields = "__all__"


class MembershipZoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = MembershipZone
        fields = "__all__"


class ReaderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reader
        fields = [
            "id",
            "is_superuser",
            "username",
            "first_name",
            "last_name",
            "is_staff",
            "name",
            "membership_zone",
        ]
        extra_kwargs = {"membership_zone": {"allow_empty": True}}


class UserCreateSerializer(BaseUserSerializer):
    class Meta(BaseUserSerializer.Meta):
        fields = ["id", "email", "username", "password"]


class CurrentUserSerializer(UserSerializer):
    class Meta(UserSerializer.Meta):
        fields = ["id", "email", "username", "password"]
