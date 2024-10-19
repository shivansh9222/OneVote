from django.shortcuts import render
from .models import Contact, Party
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from rest_framework import viewsets
from .models import Party, Contact
from .serializers import PartySerializer, ContactSerializer, SignupSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from rest_framework.views import APIView


# ViewSet for Party
class PartyViewSet(viewsets.ModelViewSet):
    queryset = Party.objects.all()
    serializer_class = PartySerializer

# ViewSet for Contact
class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer


@api_view(['POST'])
def contact_us(request):
    if request.method == 'POST':
        serializer = ContactSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'status': 'success', 'message': 'Message sent successfully!'}, status=status.HTTP_201_CREATED)
        return Response({'status': 'error', 'message': 'Invalid data'}, status=status.HTTP_400_BAD_REQUEST)


class SignupView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = SignupSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


