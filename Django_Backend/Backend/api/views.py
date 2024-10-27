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
from django.shortcuts import redirect
from django.middleware.csrf import get_token
from django.views.decorators.csrf import csrf_protect

from rest_framework.decorators import api_view,authentication_classes,permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication

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


import logging

logger = logging.getLogger(__name__)

class SignupView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = SignupSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User created successfully", "status": "success"}, status=201)
        else:
            logger.error(f"Signup error: {serializer.errors}")
            return Response({"message": "User already exists", "status": "error", "errors": serializer.errors}, status=400)


# views.py

from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import login
from .serializers import LoginSerializer

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            validated_data = serializer.validated_data  # Get validated data from serializer
            user = validated_data["user"]  # Extract the user object
            login(request, user)  # Log in the user
            profile = Profile.objects.get(user=user)
            user_profile = {
                "unique_id": profile.unique_id,
                "has_voted": profile.is_voted,
                "voted_at": profile.voted_at,
            }
            

            # print(user_profile)
            # Return tokens and success message in the response
            return Response({
                "user_profile": user_profile,
                "message": "Login successful",
                "refresh": validated_data["refresh"],
                "access": validated_data["access"],
            }, status=status.HTTP_200_OK)

        # Handle invalid data
        return Response({
            "message": "Invalid credentials! Please try again",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)



class LogoutView(APIView):
    def post(self, request, *args, **kwargs):
        logout(request)
        return Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)


from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import Party, Profile
import json
from django.utils import timezone

@csrf_exempt
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_vote(request):
    try:
        data = json.loads(request.body)
        party_id = data.get('partyId')
        party = Party.objects.get(party_id=party_id)

        

        # Ensure user hasn't already voted
        user_vote, created = Profile.objects.get_or_create(user=request.user)
        if not user_vote.is_voted:
            user_vote.is_voted = True
            user_vote.voted_at = timezone.now()
            user_vote.save()
            # Update vote count
            party.totalVote += 1
            party.save()
            return JsonResponse({'success': True, 'totalVote': party.totalVote})
        else:
            return JsonResponse({'error': 'User has already voted'}, status=400)

    except Party.DoesNotExist:
        return JsonResponse({'error': 'Party not found'}, status=404)
    except Exception as e:
        return JsonResponse({'error': 'An error occurred: ' + str(e)}, status=500)


def home_view(request):
    if request.user.is_authenticated:
        data = {
            "is_authenticated":True,
            "username":request.user.username
        }
    else:
        data = {
            "is_authenticated": False,
            "message": "Please log in to view the content.",
        }
    return JsonResponse(data)


from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def protected_view(request):
    return Response({'message': 'OK, user is authenticated'}, status=status.HTTP_200_OK)

