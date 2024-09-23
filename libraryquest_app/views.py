from django.http import HttpResponseNotFound
from rest_framework import viewsets
from .models import Library, Reader
from .serializers import LibrarySerializer, ReaderSerializer

class LibraryView(viewsets.ModelViewSet):
    serializer_class = LibrarySerializer
    queryset = Library.objects.all()

class ReaderView(viewsets.ModelViewSet):
    serializer_class = ReaderSerializer
    queryset = Reader.objects.all()

def default_view(request):
    return HttpResponseNotFound("<h1>404 Not Found</h1>")