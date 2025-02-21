from django.http import HttpResponse, HttpResponseNotFound
from django.shortcuts import render
from requests import Session
from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

from libraryquest_app.util import batch_create_libraries
from .permissions import UserPermission
from .models import Library, Reader, MembershipZone
from .serializers import LibrarySerializer, ReaderSerializer, MembershipZoneSerializer


class LibraryView(viewsets.ModelViewSet):
    search_fields = [
        "address",
        "city",
        "name",
    ]
    filter_backends=(filters.SearchFilter,)
    serializer_class = LibrarySerializer
    queryset = Library.objects.all()

    # /api/libraries/batch/
    @action(
        detail=False,
        methods=["POST"],
        name="Batch Library Uploader",
        permission_classes=[IsAdminUser],
    )
    def batch(self, request):
        source_url = request.data["url"]
        with Session() as session:
            response = session.get(source_url)
            batch_create_libraries.create_libraries(response.text)

            return HttpResponse("Success!")
        return HttpResponse("Something went wrong", status_code=500)


class MembershipZoneView(viewsets.ModelViewSet):
    serializer_class = MembershipZoneSerializer
    queryset = MembershipZone.objects.all()


class ReaderView(viewsets.ModelViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, UserPermission]
    serializer_class = ReaderSerializer
    queryset = Reader.objects.all()


def confirm_new_password(request, uid, token):
    return render(request, "confirm_password.html", {"uid": uid, "token": token})


def default_view(request):
    return HttpResponseNotFound("<h1>404 Not Found</h1>")
