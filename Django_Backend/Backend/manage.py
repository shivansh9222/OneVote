#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys

from dotenv import load_dotenv

# Conditionally load .env file only if DJANGO_ENV is not already set to "production"
if os.getenv("DJANGO_ENV") != "production":
    load_dotenv()

def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Backend.settings')
    port = os.getenv("PORT", "8000")
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    
    # Only append the port argument when in production
    if "runserver" in sys.argv and os.getenv("DJANGO_ENV") == "production":
        sys.argv.append(f"0.0.0.0:{port}")  # Bind to 0.0.0.0 and the PORT environment variable for production
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()
