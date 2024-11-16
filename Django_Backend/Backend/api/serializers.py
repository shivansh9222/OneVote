import logging
import base64
from django.core.files.base import ContentFile
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from deepface import DeepFace
from PIL import Image
import numpy as np
from io import BytesIO
import tempfile
import requests

from .models import Party, Contact, Profile
from django.contrib.auth.models import User

# Set up logging
logger = logging.getLogger(__name__)

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

# Login Serializer
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

# # Signup Serializer
# class SignupSerializer(serializers.ModelSerializer):
#     unique_id = serializers.CharField(max_length=12)
#     image = serializers.CharField(write_only=True, required=False)  # Optional for cases without photo
 
#     class Meta:
#         model = User
#         fields = ['username', 'email', 'password', 'unique_id', 'image']
#         extra_kwargs = {'password': {'write_only': True}}  # Make password write-only

#     def create(self, validated_data):
#         image_data = validated_data.pop('image', None)  # Image may not always be provided
#         unique_id = validated_data.pop('unique_id')

#         # Create the user object
#         user = User.objects.create_user(
#             username=unique_id,  # Using unique_id as username
#             email=validated_data['email'],
#             first_name=validated_data['username'],  # Use provided username for first name
#             password=validated_data['password']
#         )

#         # Create the Profile object for the user
#         profile = Profile.objects.create(user=user, unique_id=unique_id)

#         # Handle image processing (if image data is provided)
#         if image_data:
#             try:
#                 # Decode the base64 image string
#                 format, imgstr = image_data.split(';base64,')  # Split base64 metadata from actual data
#                 img_data = ContentFile(base64.b64decode(imgstr), name=f'{unique_id}_profile.jpg')  # Create file from image data

#                 # Convert the ContentFile to a PIL Image to pass to DeepFace
#                 image = Image.open(BytesIO(img_data.read()))  # Convert to a PIL Image object

#                 # Convert the PIL Image to a numpy array (DeepFace accepts numpy arrays)
#                 image_np = np.array(image)

#                 # Now, use DeepFace to extract face embeddings (face encoding)
#                 face_encoding = DeepFace.represent(image_np, model_name="Facenet")[0]["embedding"]  # Extract embedding

#                 # Save the image and encoding in the profile
#                 profile.face_image = img_data
#                 profile.face_encoding = face_encoding  # Save the face encoding to the profile
#                 profile.save()  # Save the profile object

#             except Exception as e:
#                 logger.error(f"Error during image processing or face encoding: {str(e)}")
#                 raise Exception("Error during image processing or face encoding")

#         return user  # Return the created user object



# from rest_framework import serializers
# import requests
# from PIL import Image
# import numpy as np
# from io import BytesIO
# from deepface import DeepFace
# from django.core.files.base import ContentFile
# import logging

# logger = logging.getLogger(__name__)

# class SignupSerializer(serializers.ModelSerializer):
#     unique_id = serializers.CharField(max_length=12)
#     imageUrl = serializers.URLField(write_only=True, required=False)  # Use 'imageUrl' as sent by the frontend

#     class Meta:
#         model = User
#         fields = ['username', 'email', 'password', 'unique_id', 'imageUrl']
#         extra_kwargs = {'password': {'write_only': True}}  # Make password write-only

#     def create(self, validated_data):
#         image_url = validated_data.pop('imageUrl', None)  # Get 'imageUrl' from the request data
#         unique_id = validated_data.pop('unique_id')

#         # Create the user object
#         user = User.objects.create_user(
#             username=unique_id,  # Using unique_id as username
#             email=validated_data['email'],
#             first_name=validated_data['username'],  # Use provided username for first name
#             password=validated_data['password']
#         )

#         # Create the Profile object for the user
#         profile = Profile.objects.create(user=user, unique_id=unique_id)

#         # Handle image processing (if image URL is provided)
#         if image_url:
#             try:
#                 # Store the Cloudinary image URL directly in the profile
#                 profile.face_image_url = image_url  # Save the image URL from Cloudinary in the profile

#                 # Optionally, process the image (e.g., face encoding) if needed
#                 # Fetch the image from Cloudinary
#                 response = requests.get(image_url)
#                 response.raise_for_status()  # Ensure the request was successful

#                 # Convert the image to a PIL Image object
#                 image = Image.open(BytesIO(response.content))

#                 # Convert to a numpy array (DeepFace expects numpy arrays)
#                 image_np = np.array(image)

#                 # Use DeepFace to extract face encoding from the image
#                 face_encoding = DeepFace.represent(image_np, model_name="Facenet")[0]["embedding"]

#                 # Save the face encoding to the profile
#                 profile.face_encoding = face_encoding  # Store face encoding in the profile

#                 # Save the profile object
#                 profile.save()

#             except requests.exceptions.RequestException as e:
#                 logger.error(f"Error fetching image from URL: {str(e)}")
#                 raise Exception("Error fetching image from URL")
#             except Exception as e:
#                 logger.error(f"Error during image processing or face encoding: {str(e)}")
#                 raise Exception("Error during image processing or face encoding")

#         return user  # Return the created user object



import logging
import requests
from PIL import Image
from io import BytesIO
import numpy as np
import os
from deepface import DeepFace
from rest_framework import serializers
from .models import User, Profile

# Initialize logger
logger = logging.getLogger(__name__)

# Define model name and path
MODEL_NAME = "Facenet"  # Use Facenet for lightweight deployment
MODEL_PATH = f"./.deepface/{MODEL_NAME}"

# Check if the model exists locally; if not, download it
def load_model():
    if not os.path.exists(MODEL_PATH):
        logger.info(f"Model {MODEL_NAME} not found locally. Downloading...")
        DeepFace.build_model(MODEL_NAME)
        logger.info(f"Model {MODEL_NAME} downloaded and loaded.")
    else:
        logger.info(f"Model {MODEL_NAME} already exists locally. Using existing model.")

# Call the load_model function before any face recognition
load_model()

class SignupSerializer(serializers.ModelSerializer):
    unique_id = serializers.CharField(max_length=12)
    imageUrl = serializers.URLField(write_only=True, required=False)  # Use 'imageUrl' as sent by the frontend

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'unique_id', 'imageUrl']
        extra_kwargs = {'password': {'write_only': True}}  # Make password write-only

    def create(self, validated_data):
        image_url = validated_data.pop('imageUrl', None)  # Get 'imageUrl' from the request data
        unique_id = validated_data.pop('unique_id')

        # Create the user object
        logger.info(f"Creating user with unique_id: {unique_id}")
        user = User.objects.create_user(
            username=unique_id,  # Using unique_id as username
            email=validated_data['email'],
            first_name=validated_data['username'],  # Use provided username for first name
            password=validated_data['password']
        )

        # Create the Profile object for the user
        logger.info(f"Creating profile for user: {user.username}")
        profile = Profile.objects.create(user=user, unique_id=unique_id)

        # Handle image processing (if image URL is provided)
        if image_url:
            logger.info(f"Image URL provided: {image_url}")
            try:
                # Store the Cloudinary image URL directly in the profile
                profile.face_image_url = image_url  # Save the image URL from Cloudinary in the profile

                # Optionally, process the image (e.g., face encoding) if needed
                logger.info(f"Fetching image from URL: {image_url}")
                response = requests.get(image_url)
                response.raise_for_status()  # Ensure the request was successful
                logger.info(f"Image fetched successfully from {image_url}")

                # Convert the image to a PIL Image object
                image = Image.open(BytesIO(response.content))
                logger.info(f"Image successfully loaded from URL: {image_url}")

                # Convert to a numpy array (DeepFace expects numpy arrays)
                image_np = np.array(image)
                logger.info(f"Converted image to numpy array.")

                # Use DeepFace to extract face encoding from the image with Facenet
                logger.info("Extracting face encoding using Facenet...")
                face_encoding = DeepFace.represent(image_np, model_name=MODEL_NAME)[0]["embedding"]
                logger.info("Face encoding extracted successfully.")

                # Save the face encoding to the profile
                profile.face_encoding = face_encoding  # Store face encoding in the profile
                logger.info("Face encoding saved to profile.")

                # Save the profile object
                profile.save()
                logger.info(f"Profile saved for user: {user.username}")

            except requests.exceptions.RequestException as e:
                logger.error(f"Error fetching image from URL {image_url}: {str(e)}")
                raise Exception(f"Error fetching image from URL {image_url}: {str(e)}")
            except Exception as e:
                logger.error(f"Error during image processing or face encoding for user {user.username}: {str(e)}")
                raise Exception(f"Error during image processing or face encoding for user {user.username}: {str(e)}")

        return user  # Return the created user object





# Face Verification Serializer
class FaceVerificationSerializer(serializers.Serializer):
    image = serializers.CharField(write_only=True)  # Base64 image for verification

    def validate(self, data):
        image_data = data.get('image')
        
        # Split base64 string into format and the actual base64 string
        format, imgstr = image_data.split(';base64,')
        
        # Decode the base64 string to get the image content
        live_img = ContentFile(base64.b64decode(imgstr), name='live_temp.jpg')

        # Save the ContentFile as a temporary file
        live_img_path = self.save_temp_image(live_img)

        user = self.context['request'].user
        profile = Profile.objects.get(user=user)

        # Verify face using DeepFace
        result = DeepFace.verify(img1_path=live_img_path, img2_path=profile.face_image.path, model_name="Facenet")

        if not result["verified"]:
            raise serializers.ValidationError("Face verification failed.")

        return data

    def save_temp_image(self, content_file):
        # Save the ContentFile as a temporary file
        temp_file = tempfile.NamedTemporaryFile(delete=False, suffix='.jpg')
        temp_file.write(content_file.read())
        temp_file.close()
        return temp_file.name  # Return the path of the temporary file
