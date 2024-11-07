import logging
from venv import logger
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
        

# class SignupSerializer(serializers.ModelSerializer):
#     unique_id = serializers.CharField(max_length=12)

#     class Meta:
#         model = User
#         fields = ['username', 'email', 'password', 'unique_id']
#         extra_kwargs = {'password': {'write_only': True}}  # Make password write-only

#     def create(self, validated_data):
#         unique_id = validated_data.pop('unique_id')

#         # Create user
#         user = User.objects.create_user(
#             username=unique_id,
#             email=validated_data['email'],
#             first_name=validated_data['username'],
#             password=validated_data['password']
#         )

#         # Create associated profile with unique_id
#         Profile.objects.create(user=user, unique_id=unique_id)
#         return user   

# serializers.py

from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from deepface import DeepFace
from django.core.files.base import ContentFile
import base64
from .models import Profile  # Import the Profile model


# logger = logging.getLogger(__name__)

# class SignupSerializer(serializers.ModelSerializer):
#     unique_id = serializers.CharField(max_length=12)
#     image = serializers.CharField(write_only=True, required=False)  # Optional for cases without photo
    
#     class Meta:
#         model = User
#         fields = ['username', 'email', 'password', 'unique_id', 'image']
#         extra_kwargs = {'password': {'write_only': True}}  # Make password write-only

#     def create(self, validated_data):
#         # Separate image and unique_id from user data
#         image_data = validated_data.pop('image', None)
#         unique_id = validated_data.pop('unique_id')

#         # Create the user using 'unique_id' as the username
#         user = User.objects.create_user(
#             username=unique_id,  # Use unique_id as the username
#             email=validated_data['email'],
#             first_name=validated_data['username'],
#             password=validated_data['password']
#         )

#         # Create associated profile with unique_id
#         profile = Profile.objects.create(user=user, unique_id=unique_id)

#         if image_data:
#             try:
#                 # Process the face image and generate encoding
#                 format, imgstr = image_data.split(';base64,')
#                 img_data = ContentFile(base64.b64decode(imgstr), name='profile.jpg')

#                 # Generate the face encoding using DeepFace
#                 face_encoding = DeepFace.represent(img_data, model_name="Facenet")[0]["embedding"]

#                 # Save face data to profile
#                 profile.face_image = img_data
#                 profile.face_encoding = face_encoding
#                 profile.save()

#             except Exception as e:
#                 logger.error(f"Error during image processing or face encoding: {str(e)}")
#                 raise Exception("Error during image processing or face encoding")

#         return user


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


# from deepface import DeepFace
# from django.core.files.base import ContentFile
# import base64

# class UserProfileRegistrationSerializer(serializers.ModelSerializer):
#     image = serializers.CharField(write_only=True)  # Base64 image field, write-only

#     class Meta:
#         model = Profile
#         fields = ['image', 'face_image', 'face_encoding']  # Expose face_image and face_encoding

#     def create(self, validated_data):
#         image_data = validated_data.pop('image')
#         format, imgstr = image_data.split(';base64,')
#         img_data = ContentFile(base64.b64decode(imgstr), name='profile.jpg')

#         # Generate the face encoding using DeepFace
#         face_encoding = DeepFace.represent(img_data, model_name="Facenet")[0]["embedding"]

#         # Create a new UserProfile instance with the image and encoding
#         user_profile = Profile.objects.create(
#             user=self.context['request'].user,
#             face_image=img_data,
#             face_encoding=face_encoding
#         )
#         return user_profile

import base64
import logging
from django.core.files.base import ContentFile
from deepface import DeepFace
from PIL import Image
import io
import numpy as np
from rest_framework import serializers
from .models import User, Profile

# Set up logging
logger = logging.getLogger(__name__)

class SignupSerializer(serializers.ModelSerializer):
    unique_id = serializers.CharField(max_length=12)
    image = serializers.CharField(write_only=True, required=False)  # Optional for cases without photo

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'unique_id', 'image']
        extra_kwargs = {'password': {'write_only': True}}  # Make password write-only

    def create(self, validated_data):
        # Separate the image and unique_id from validated data
        image_data = validated_data.pop('image', None)  # Image may not always be provided
        unique_id = validated_data.pop('unique_id')

        # Create the user object
        user = User.objects.create_user(
            username=unique_id,  # Using unique_id as username
            email=validated_data['email'],
            first_name=validated_data['username'],  # Use provided username for first name
            password=validated_data['password']
        )

        # Create the Profile object for the user
        profile = Profile.objects.create(user=user, unique_id=unique_id)

        # Handle image processing (if image data is provided)
        if image_data:
            try:
                # Decode the base64 image string
                format, imgstr = image_data.split(';base64,')  # Split base64 metadata from actual data
                img_data = ContentFile(base64.b64decode(imgstr), name=f'{unique_id}_profile.jpg')  # Create file from image data

                # Convert the ContentFile to a PIL Image to pass to DeepFace
                image = Image.open(io.BytesIO(img_data.read()))  # Convert to a PIL Image object

                # Convert the PIL Image to a numpy array (DeepFace accepts numpy arrays)
                image_np = np.array(image)

                # Now, use DeepFace to extract face embeddings (face encoding)
                face_encoding = DeepFace.represent(image_np, model_name="Facenet")[0]["embedding"]  # Extract embedding

                # Save the image and encoding in the profile
                profile.face_image = img_data
                profile.face_encoding = face_encoding  # Save the face encoding to the profile
                profile.save()  # Save the profile object

            except Exception as e:
                logger.error(f"Error during image processing or face encoding: {str(e)}")
                raise Exception("Error during image processing or face encoding")

        return user  # Return the created user object
    

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

