from django.shortcuts import render
from .models import Contact, Party, Profile
from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
from rest_framework import viewsets
from .serializers import PartySerializer, ContactSerializer, SignupSerializer, LoginSerializer, FaceVerificationSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.utils import timezone
import json
import logging
from django.middleware.csrf import get_token
from django.views.decorators.csrf import csrf_exempt

logger = logging.getLogger(__name__)

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
            try:
                user = serializer.save()  # Create the user and associated profile
                return Response({"message": "User created successfully", "status": "success"}, status=201)
            except Exception as e:
                logger.error(f"Error during user creation: {str(e)}")
                return Response({"message": "An error occurred during user creation", "status": "error", "error": str(e)}, status=500)
        else:
            logger.error(f"Signup error: {serializer.errors}")
            return Response({"message": "User already exists", "status": "error", "errors": serializer.errors}, status=400)

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

            return Response({
                "user_profile": user_profile,
                "message": "Login successful",
                "refresh": validated_data["refresh"],
                "access": validated_data["access"],
            }, status=status.HTTP_200_OK)

        return Response({
            "message": "Invalid credentials! Please try again",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
    def post(self, request, *args, **kwargs):
        logout(request)
        return Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)

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
            "is_authenticated": True,
            "username": request.user.username
        }
    else:
        data = {
            "is_authenticated": False,
            "message": "Please log in to view the content.",
        }
    return JsonResponse(data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def protected_view(request):
    return Response({'message': 'User is authenticated'}, status=status.HTTP_200_OK)

class VerifyFaceView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = FaceVerificationSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        return Response({"message": "Face verified successfully!"}, status=status.HTTP_200_OK)
