from django.contrib import admin
from .models import Library, MembershipZone, Reader

class LibraryAdmin(admin.ModelAdmin):
    list_display = ('name', 'address', 'lat', 'lon')

class MembershipZoneAdmin(admin.ModelAdmin):
    list_display = ['name']

class ReaderAdmin(admin.ModelAdmin):
    list_display = ('name', 'email')

# Register the model
admin.site.register(Library, LibraryAdmin)
admin.site.register(MembershipZone, MembershipZoneAdmin)
admin.site.register(Reader, ReaderAdmin)