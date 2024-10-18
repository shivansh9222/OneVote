from django.shortcuts import render
from .models import Contact, Party
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from rest_framework import viewsets
from .models import Party, Contact
from .serializers import PartySerializer, ContactSerializer

# Create your views here.

def contact(request):
    if request.method == "POST":
        userName = request.POST.get('name','')
        usereEmail = request.POST.get('email','')
        userQuery = request.POST.get('query','')

        contact = Contact(name=userName, email=usereEmail, queries=userQuery)
        contact.save()

        return JsonResponse({'message':'success'})




# ViewSet for Party
class PartyViewSet(viewsets.ModelViewSet):
    queryset = Party.objects.all()
    serializer_class = PartySerializer

# ViewSet for Contact
class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
