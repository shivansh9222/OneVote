from django.shortcuts import render
from .models import Contact, Party, Profile
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from rest_framework import viewsets
from .models import Party, Contact
from .serializers import PartySerializer, ContactSerializer, SignupSerializer, LoginSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
import json
from django.utils import timezone

# Create your views here.

# def contact(request):
#     if request.method == "POST":
#         userName = request.POST.get('name','')
#         usereEmail = request.POST.get('email','')
#         userQuery = request.POST.get('query','')

#         contact = Contact(name=userName, email=usereEmail, queries=userQuery)
#         contact.save()

#         return JsonResponse({'message':'success'})




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
    

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data
            login(request, user)
            return Response({"message": "Login successful"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
    def post(self, request, *args, **kwargs):
        logout(request)
        return Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)


def update_vote(request):
    if request.method == 'POST':
        if request.user.is_authenticated:
            data = json.loads(request.body)
            party_id = data.get('partyId')

            party = Party.objects.get(party_id=party_id)

            party.totalVote += 1
            party.save()

            user_vote = Profile.objects.get(user=request.user)
            user_vote.is_voted = True
            user_vote.voted_at = timezone.now()
            user_vote.save()

            return JsonResponse({'success': True, 'totalVote': party.totalVote})
        else:
            return JsonResponse({'error': 'User not authenticated'}, status=403)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)
