import csv
from libraryquest_app.models import Library, MembershipZone


def convert_line_to_library(
    name,
    membership_zone_name,
    phone,
    lat,
    lon,
    address,
    city,
    zip,
    __,
    ___,
    url,
):
    membership_zones = MembershipZone.objects.filter(name=membership_zone_name.title())

    if membership_zones.exists():
        membership_zone = membership_zones.first()
    else:
        membership_zone = MembershipZone.objects.create(
            name=membership_zone_name.title()
        )

    return {
        "name": name.title(),
        "phone": phone,
        "lat": lat,
        "lon": lon,
        "address": address.title(),
        "city": city.title(),
        "zip": zip,
        "url": url,
        "membership_zone": membership_zone,
    }


def is_valid_library_field(field) -> bool:
    return field != None and field != ""


def is_valid_library(library_data) -> bool:
    library_fields = [
        "name",
        "phone",
        "lat",
        "lon",
        "address",
        "city",
        "zip",
        "url",
        "membership_zone",
    ]
    for field, value in library_data.items():
        if field not in library_fields or is_valid_library_field(value) is False:
            print(f"bad {field} in library", library_data)
            return False
    return True


def create_libraries(libraries_csv):
    reader = csv.reader(libraries_csv.split("\n"))
    next(reader)  # skip the header row
    libraries = [convert_line_to_library(*line) for line in reader if len(line)]

    for library_data in libraries:
        if is_valid_library(library_data):
            library = Library.objects.create(**library_data)
            library.save()
