from django.http import HttpResponseNotFound
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework_simplejwt.authentication import JWTAuthentication
from .permissions import UserPermission
from .models import Library, Reader
from .serializers import LibrarySerializer, ReaderSerializer


class LibraryView(viewsets.ModelViewSet):
    serializer_class = LibrarySerializer
    queryset = Library.objects.all()


class ReaderView(viewsets.ModelViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, UserPermission]
    serializer_class = ReaderSerializer
    queryset = Reader.objects.all()


def default_view(request):
    return HttpResponseNotFound("<h1>404 Not Found</h1>")
