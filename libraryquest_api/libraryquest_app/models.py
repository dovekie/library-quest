from django.db import models
from django.contrib.auth.models import AbstractUser

# have you registered your models in admin.py?


class MembershipZone(models.Model):
    name = models.CharField("Name", max_length=240)

    def __str__(self):
        return self.name


class Library(models.Model):
    name = models.CharField("Name", max_length=240)
    address = models.CharField("Address", max_length=240)
    city = models.CharField("City", max_length=240)
    zip = models.CharField("Zip", max_length=5)
    url = models.URLField("URL")
    phone = models.CharField("Phone", max_length=14)
    # TODO use PostGIS type for lat and lon
    lat = models.FloatField("Lat")
    lon = models.FloatField("Lon")
    membership_zone = models.ForeignKey(
        MembershipZone, on_delete=models.PROTECT, null=True
    )

    def __str__(self):
        return self.name


class Reader(AbstractUser):
    name = models.CharField("Name", max_length=240)
    email = models.EmailField("Email")
    membership_zone = models.ManyToManyField(MembershipZone)

    def __str__(self):
        return self.name
