from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .forms import ReaderCreationForm, ReaderChangeForm
from .models import Library, MembershipZone, Reader

class LibraryAdmin(admin.ModelAdmin):
    list_display = ('name', 'address', 'lat', 'lon')

class MembershipZoneAdmin(admin.ModelAdmin):
    list_display = ['name']

class ReaderAdmin(UserAdmin):
    add_form = ReaderCreationForm
    form = ReaderChangeForm
    model = Reader
    list_display = ('name', 'email')

# Register the model
admin.site.register(Library, LibraryAdmin)
admin.site.register(MembershipZone, MembershipZoneAdmin)
admin.site.register(Reader, ReaderAdmin)