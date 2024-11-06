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


from deepface import DeepFace
from django.core.files.base import ContentFile
import base64

class UserProfileRegistrationSerializer(serializers.ModelSerializer):
    image = serializers.CharField(write_only=True)  # Base64 image field, write-only

    class Meta:
        model = Profile
        fields = ['image', 'face_image', 'face_encoding']  # Expose face_image and face_encoding

    def create(self, validated_data):
        image_data = validated_data.pop('image')
        format, imgstr = image_data.split(';base64,')
        img_data = ContentFile(base64.b64decode(imgstr), name='profile.jpg')

        # Generate the face encoding using DeepFace
        face_encoding = DeepFace.represent(img_data, model_name="Facenet")[0]["embedding"]

        # Create a new UserProfile instance with the image and encoding
        user_profile = Profile.objects.create(
            user=self.context['request'].user,
            face_image=img_data,
            face_encoding=face_encoding
        )
        return user_profile
    

class FaceVerificationSerializer(serializers.Serializer):
    image = serializers.CharField(write_only=True)  # Base64 image for verification

    def validate(self, data):
        image_data = data.get('image')
        format, imgstr = image_data.split(';base64,')
        live_img = ContentFile(base64.b64decode(imgstr), name='live_temp.jpg')

        user = self.context['request'].user
        profile = Profile.objects.get(user=user)

        # Verify face using DeepFace
        result = DeepFace.verify(img1_path=live_img, img2_path=profile.face_image.path, model_name="Facenet")

        if not result["verified"]:
            raise serializers.ValidationError("Face verification failed.")

        return data

