from django.contrib import admin
# Register your models here.

from .models import Contact, Party, Profile
admin.site.register(Contact)
admin.site.register(Party)
admin.site.register(Profile)
