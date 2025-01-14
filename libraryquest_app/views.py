import json
from django.http import HttpResponseNotFound
from django.core.mail import send_mail
from django.conf import settings
from django.shortcuts import redirect
from django.views.decorators.csrf import csrf_exempt
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

@csrf_exempt
def send_mail_page(request):
    context = {}
    if request.method == "POST":
        request_body = json.loads(request.body)
        address = request_body["email"]

        if address:
            try:
                send_mail(
                    "Your LibraryQuest password reset link",
                    "This is where the link goes",
                    settings.EMAIL_HOST_USER,
                    [address],
                )
                context["result"] = "email sent successfully"
                # FIXME return something here
            except Exception as e:
                context["result"] = f"Error sending mail: {e}"
                raise
        return redirect("http://localhost:5173/") # FIXME don't hardcode this
    else:
        return HttpResponseNotFound("<h1>404 Not Found</h1>")


def default_view(request):
    return HttpResponseNotFound("<h1>404 Not Found</h1>")
