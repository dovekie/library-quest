from django.db import models

class Library(models.Model):
    name=models.CharField("Name", max_length=240)
    address=models.CharField("Address", max_length=240)
    # TODO use PostGIS type for lat and lon
    lat=models.FloatField("Lat")
    lon=models.FloatField("Lon")
    def __str__(self):
        return self.name