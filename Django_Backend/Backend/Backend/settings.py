"""
Django settings for Backend project.

Generated by 'django-admin startproject' using Django 5.1.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.1/ref/settings/
"""

from datetime import timedelta
import os
from pathlib import Path
import dj_database_url
from dotenv import load_dotenv


# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


ENVIRONMENT = os.getenv("DJANGO_ENV", "production")

# Load .env only if in development mode
print (ENVIRONMENT)
if ENVIRONMENT == "development":
    load_dotenv()  # Load environment variables from .env file

# Settings for both development and production
SECRET_KEY = os.getenv("SECRET_KEY", "DJANGO_SECRET_KEY")
DEBUG = os.getenv("DEBUG", "False").lower() == "true"

# Configure allowed hosts based on environment
if ENVIRONMENT == "development":
    ALLOWED_HOSTS = os.getenv("ALLOWED_HOSTS", "localhost,127.0.0.1").split(",")
else:
    ALLOWED_HOSTS = os.getenv("ALLOWED_HOSTS", "onevote-a49c.onrender.com,one-vote-khaki.vercel.app").split(",")

print(f"ALLOWED_HOSTS: {ALLOWED_HOSTS}")



# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
# SECRET_KEY = os.environ.get("DJANGO_SECRET_KEY")


# # SECURITY WARNING: don't run with debug turned on in production!
# DEBUG = os.environ.get("DEBUG", "False").lower() == "true"

# ALLOWED_HOSTS = os.environ.get("ALLOWED_HOSTS", "localhost").split(',')


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'api',
    'corsheaders',
    'rest_framework_simplejwt',
    'cloudinary_storage',
    'cloudinary',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    # 'cloudinary.middleware.CloudinaryMiddleware',
]

ROOT_URLCONF = 'Backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'Backend.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.1/ref/settings/#databases

# Default database setup (for development)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',  # SQLite for local development
    }
}

# If DATABASE_URL is set (i.e., in production), override the default with that configuration
database_url = os.getenv("DATABASE_URL")

if database_url:
    DATABASES["default"] = dj_database_url.parse(database_url)

# Password validation
# https://docs.djangoproject.com/en/5.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.1/howto/static-files/


STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')


# Default primary key field type
# https://docs.djangoproject.com/en/5.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",  # Local development (React dev server)
    "https://one-vote-khaki.vercel.app",  # Production URL (Vercel app)
    "https://one-vote-git-main-anmol-rais-projects.vercel.app",
    "https://one-vote-mnkknii8o-anmol-rais-projects.vercel.app",
    "https://one-vote-anmol-rais-projects.vercel.app"
]

CORS_ALLOW_ALL_ORIGINS = False
CORS_ALLOW_HEADERS = [
    'content-type',
    'x-csrftoken',
    'authorization',
    'x-requested-with',
    'accept',
    'origin',
    'user-agent',
    'access-control-allow-origin',
]
CORS_ALLOW_CREDENTIALS = True

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    )
}

CSRF_TRUSTED_ORIGINS = [
    'http://localhost:5173',
    'https://one-vote-khaki.vercel.app',
]


SIMPLE_JWT = {
   'ACCESS_TOKEN_LIFETIME': timedelta(minutes=5),
   'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
   'ROTATE_REFRESH_TOKENS': False,
   'BLACKLIST_AFTER_ROTATION': True,
}

DEFAULT_FILE_STORAGE = 'cloudinary_storage.storage.MediaCloudinaryStorage'

API_KEY = os.environ.get("CLOUDINARY_STORAGE_API_KEY")
API_SECRET = os.environ.get("CLOUDINARY_STORAGE_SECRET_KEY")
CLOUDINARY_STORAGE = {
    'CLOUD_NAME': 'did5gvbtr',
    'API_KEY': API_KEY,
    'API_SECRET': API_SECRET,
}


# settings.py

# import os

# BASE_DIR = Path(__file__).resolve().parent.parent  # This points to the root of your Django project

# MEDIA_URL = '/media/'
# MEDIA_ROOT = os.path.join(BASE_DIR, 'media')  # 'media' folder will be in your project root


# MEDIA_URL = f'https://res.cloudinary.com/did5gvbtr/'

# STATIC_ROOT = BASE_DIR / 'staticfiles'


