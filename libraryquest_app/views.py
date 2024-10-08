from django.http import HttpResponseNotFound
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from .permissions import UserPermission
from .models import Library, Reader, MembershipZone
from .serializers import LibrarySerializer, ReaderSerializer, MembershipZoneSerializer


class LibraryView(viewsets.ModelViewSet):
    serializer_class = LibrarySerializer
    queryset = Library.objects.all()


class MembershipZoneView(viewsets.ModelViewSet):
    serializer_class = MembershipZoneSerializer
    queryset = MembershipZone.objects.all()


class ReaderView(viewsets.ModelViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, UserPermission]
    serializer_class = ReaderSerializer
    queryset = Reader.objects.all()


def default_view(request):
    return HttpResponseNotFound("<h1>404 Not Found</h1>")
