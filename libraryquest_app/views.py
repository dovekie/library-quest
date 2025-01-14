from django.http import HttpResponseNotFound
from django.core.mail import send_mail
from django.conf import settings
from django.shortcuts import render
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


def send_mail_page(request):
    context = {}

    if request.method == "POST":
        address = request.POST.get("address")
        subject = request.POST.get("subject")
        message = request.POST.get("message")

        if address and subject and message:
            try:
                send_mail(
                    subject,
                    message,
                    settings.EMAIL_HOST_USER,
                    [address],
                )
                context["result"] = "email sent successfully"
            except Exception as e:
                context["result"] = f"Error sending mail: {e}"
                raise
    return render(request, "email.html")


def default_view(request):
    return HttpResponseNotFound("<h1>404 Not Found</h1>")
