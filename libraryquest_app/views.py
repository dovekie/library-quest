from django.http import HttpResponseNotFound
from rest_framework import viewsets
from .models import Library
from .serializers import LibrarySerializer

class LibraryView(viewsets.ModelViewSet):
    serializer_class = LibrarySerializer
    queryset = Library.objects.all()

def default_view(request):
    return HttpResponseNotFound("<h1>404 Not Found</h1>")