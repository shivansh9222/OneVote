from rest_framework import serializers
from .models import Party, Contact, Profile  # Import the models
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework import status

# Serializer for Party model
class PartySerializer(serializers.ModelSerializer):
    class Meta:
        model = Party
        fields = '__all__'  # Or list specific fields ['id', 'name', 'logo']

# Serializer for Contact model
class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'  # Or list specific fields ['id', 'name', 'email', 'message']
        

class SignupSerializer(serializers.ModelSerializer):
    unique_id = serializers.CharField(max_length=12)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'unique_id']
        extra_kwargs = {'password': {'write_only': True}}  # Make password write-only

    def create(self, validated_data):
        unique_id = validated_data.pop('unique_id')

        # Create user
        user = User.objects.create_user(
            username=unique_id,
            email=validated_data['email'],
            first_name=validated_data['username'],
            password=validated_data['password']
        )

        # Create associated profile with unique_id
        Profile.objects.create(user=user, unique_id=unique_id)
        return user   
        

# serializers.py

from rest_framework import serializers
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

class LoginSerializer(serializers.Serializer):
    unique_id = serializers.CharField(max_length=12, required=True)
    password = serializers.CharField(required=True, write_only=True)

    def validate(self, data):
        unique_id = data.get("unique_id")
        password = data.get("password")

        # Authenticate user
        user = authenticate(username=unique_id, password=password)
        if user is not None:
            # Generate JWT tokens
            refresh = RefreshToken.for_user(user)
            return {
                "user": user,
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            }
        else:
            raise serializers.ValidationError("Invalid login credentials")


