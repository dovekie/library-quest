from django.contrib import admin
from .models import Library

class LibraryAdmin(admin.ModelAdmin):
    list_display = ('name', 'address', 'lat', 'lon')

# Register the model
admin.site.register(Library, LibraryAdmin)