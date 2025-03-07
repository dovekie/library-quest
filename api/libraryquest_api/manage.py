#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys


def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'libraryquest.settings')
    try:
        port = os.getenv('DJANGO_PORT', '8000')  # Default to 8000 if not set
        from django.core.management import execute_from_command_line
        execute_from_command_line(['manage.py', 'runserver', f'0.0.0.0:{port}'])
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()
