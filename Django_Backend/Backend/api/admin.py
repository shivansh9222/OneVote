from django.contrib import admin
# Register your models here.

from .models import Contact, Party
admin.site.register(Contact)
admin.site.register(Party)