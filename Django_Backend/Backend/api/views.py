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


    

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data["user"]  # Get the user from validated data
            login(request, user)
            # return redirect('/home')
            return Response({"message": "Login successful"}, status=status.HTTP_200_OK)
        return Response({"message": "Invalid credentials! Please try again", "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
    def post(self, request, *args, **kwargs):
        logout(request)
        return Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)

# @api_view(['POST'])
# @authentication_classes([SessionAuthentication])
# @permission_classes([IsAuthenticated])
# @csrf_protect
def update_vote(request):
    print("aa")
    if request.method == 'POST':
        if request.user.is_authenticated:
            data = json.loads(request.body)
            party_id = data.get('partyId')

                party = Party.objects.get(party_id=party_id)

                party.totalVote += 1
                party.save()

                user_vote, created = Profile.objects.get_or_create(user=request.user)

                if not user_vote.is_voted:
                    user_vote.is_voted = True
                    user_vote.voted_at = timezone.now()
                    user_vote.save()
                    return JsonResponse({'success': True, 'totalVote': party.totalVote})
                else:
                    return JsonResponse({'error': 'User has already voted'}, status=400)
            # else:
                # return JsonResponse({'error': 'User not authenticated'}, status=403)
        # else:
        #     return JsonResponse({'error': 'Invalid request method'}, status=400)
    # except Exception as e:
    #     print("Error in update_vote:", str(e))
        # return JsonResponse({'error': 'Internal Server Error'}, status=500)
# def update_vote(request):
#     print('csrf token',{get_token(request)})
#     if request.method == 'POST':
#         if request.user.is_authenticated:

#             data = json.loads(request.body)
#             # print(data)
#             party_id = data.get('partyId')

#             party = Party.objects.get(party_id=party_id)

#             party.totalVote += 1
#             party.save()

#             user_vote, created = Profile.objects.get_or_create(user=request.user)

#             if not user_vote.is_voted:  # Only update if the user hasn't voted yet
#                 user_vote.is_voted = True
#                 user_vote.voted_at = timezone.now()
#                 user_vote.save()
#                 return JsonResponse({'success': True, 'totalVote': party.totalVote})
#             else:
#                 return JsonResponse({'error': 'User has already voted'}, status=400)
#         else:
#             return JsonResponse({'error': 'User not authenticated'}, status=403)
#     else:
#         return JsonResponse({'error': 'Invalid request method'}, status=400)


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



def get_csrf_token(request):
    csrf_token = get_token(request)
    # prin
    return JsonResponse({'csrfToken': csrf_token})
