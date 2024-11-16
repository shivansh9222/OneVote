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

# Define the lightweight model name
MODEL_NAME = "SFace"  # Lightweight model for resource-constrained environments

# Disable GPU (important for free-tier deployments without GPU support)
os.environ['CUDA_VISIBLE_DEVICES'] = '-1'

# Load or download the DeepFace model
def load_model():
    """
    Ensures the lightweight model is available locally; downloads it if necessary.
    """
    try:
        logger.info(f"Loading model: {MODEL_NAME}")
        DeepFace.build_model(MODEL_NAME)
        logger.info(f"Model {MODEL_NAME} loaded successfully.")
    except Exception as e:
        logger.error(f"Error loading model {MODEL_NAME}: {str(e)}")
        raise Exception(f"Model {MODEL_NAME} could not be loaded: {str(e)}")

# Load the model at module initialization
load_model()

class SignupSerializer(serializers.ModelSerializer):
    unique_id = serializers.CharField(max_length=12)
    imageUrl = serializers.URLField(write_only=True, required=False)  # Use 'imageUrl' from the frontend

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'unique_id', 'imageUrl']
        extra_kwargs = {'password': {'write_only': True}}  # Make password write-only

    def create(self, validated_data):
        """
        Creates a User and Profile, processing the optional image for face encoding.
        """
        image_url = validated_data.pop('imageUrl', None)  # Extract 'imageUrl' if provided
        unique_id = validated_data.pop('unique_id')

        # Create the User object
        logger.info(f"Creating user with unique_id: {unique_id}")
        user = User.objects.create_user(
            username=unique_id,  # Use unique_id as username
            email=validated_data['email'],
            first_name=validated_data['username'],  # Use 'username' for first name
            password=validated_data['password']
        )

        # Create the Profile object
        logger.info(f"Creating profile for user: {user.username}")
        profile = Profile.objects.create(user=user, unique_id=unique_id)

        # Process the image if a URL is provided
        if image_url:
            logger.info(f"Processing image from URL: {image_url}")
            try:
                self.process_image(image_url, profile)
            except Exception as e:
                logger.error(f"Image processing failed for user {user.username}: {str(e)}")
                raise serializers.ValidationError({"imageUrl": str(e)})

        return user

    def process_image(self, image_url, profile):
        """
        Fetches an image from a URL, extracts a face encoding, and updates the profile.
        """
        try:
            # Fetch the image from the URL
            response = requests.get(image_url, timeout=10)  # Set a timeout to avoid long waits
            response.raise_for_status()  # Raise an exception for HTTP errors
            logger.info(f"Image successfully fetched from URL: {image_url}")

            # Convert the image to a numpy array (DeepFace expects numpy arrays)
            image = Image.open(BytesIO(response.content))
            image_np = np.array(image)
            logger.info(f"Image converted to numpy array.")

            # Extract face encoding using the lightweight model
            logger.info(f"Extracting face encoding using {MODEL_NAME}...")
            face_encoding = DeepFace.represent(image_np, model_name=MODEL_NAME)[0]["embedding"]
            logger.info(f"Face encoding successfully extracted.")

            # Update the profile with face encoding and image URL
            profile.face_encoding = face_encoding  # Save face encoding to profile
            profile.face_image_url = image_url  # Save the image URL
            profile.save()
            logger.info(f"Profile updated and saved for user: {profile.user.username}")

        except requests.exceptions.RequestException as e:
            logger.error(f"Error fetching image from URL {image_url}: {str(e)}")
            raise Exception(f"Error fetching image from URL {image_url}: {str(e)}")
        except Exception as e:
            logger.error(f"Error during face encoding process: {str(e)}")
            raise Exception(f"Error during face encoding process: {str(e)}")






# # Face Verification Serializer
# class FaceVerificationSerializer(serializers.Serializer):
#     image = serializers.CharField(write_only=True)  # Base64 image for verification

#     def validate(self, data):
#         image_data = data.get('image')
        
#         # Split base64 string into format and the actual base64 string
#         format, imgstr = image_data.split(';base64,')
        
#         # Decode the base64 string to get the image content
#         live_img = ContentFile(base64.b64decode(imgstr), name='live_temp.jpg')

#         # Save the ContentFile as a temporary file
#         live_img_path = self.save_temp_image(live_img)

#         user = self.context['request'].user
#         profile = Profile.objects.get(user=user)

#         # Verify face using DeepFace
#         result = DeepFace.verify(img1_path=live_img_path, img2_path=profile.face_image.path, model_name="Facenet")

#         if not result["verified"]:
#             raise serializers.ValidationError("Face verification failed.")

#         return data

#     def save_temp_image(self, content_file):
#         # Save the ContentFile as a temporary file
#         temp_file = tempfile.NamedTemporaryFile(delete=False, suffix='.jpg')
#         temp_file.write(content_file.read())
#         temp_file.close()
#         return temp_file.name  # Return the path of the temporary file



import os
import requests
from django.core.files.base import ContentFile
import base64
import tempfile
from deepface import DeepFace
from rest_framework import serializers
from django.core.exceptions import ObjectDoesNotExist

# Disable GPU for DeepFace
os.environ['CUDA_VISIBLE_DEVICES'] = '-1'


class FaceVerificationSerializer(serializers.Serializer):
    image = serializers.CharField(write_only=True)  # Base64 image for verification

    def validate(self, data):
        image_data = data.get('image')

        if not image_data:
            raise serializers.ValidationError("The 'image' field is required.")

        try:
            # Split base64 string into format and the actual base64 string
            format, imgstr = image_data.split(';base64,')
        except ValueError:
            raise serializers.ValidationError("Invalid base64 image format.")

        # Decode the base64 string to get the image content
        try:
            live_img = ContentFile(base64.b64decode(imgstr), name='live_temp.jpg')
        except base64.binascii.Error:
            raise serializers.ValidationError("Invalid base64 encoding.")

        # Save the ContentFile as a temporary file
        live_img_path = self.save_temp_image(live_img)

        # Retrieve the authenticated user
        user = self.context['request'].user
        try:
            profile = Profile.objects.get(user=user)
        except ObjectDoesNotExist:
            raise serializers.ValidationError("No profile associated with the authenticated user.")

        # Validate and download the profile image
        profile_img_path = self.download_temp_image(profile.face_image_url)

        # Perform DeepFace verification
        try:
            result = DeepFace.verify(
                img1_path=live_img_path,
                img2_path=profile_img_path,
                model_name="SFace"  # Specify the SFace model
            )
        except Exception as e:
            raise serializers.ValidationError(f"Face verification error: {str(e)}")

        # Ensure verification succeeded
        if not result.get("verified", False):
            raise serializers.ValidationError("Face verification failed. Please try again.")

        # Cleanup temporary files
        self.cleanup_temp_files([live_img_path, profile_img_path])

        return data

    def save_temp_image(self, content_file):
        """
        Save the ContentFile as a temporary file and return its path.
        """
        temp_file = tempfile.NamedTemporaryFile(delete=False, suffix='.jpg')
        temp_file.write(content_file.read())
        temp_file.close()
        return temp_file.name

    def download_temp_image(self, url):
        """
        Download an image from the URL and save it as a temporary file.
        """
        if not url:
            raise serializers.ValidationError("The 'face_image_url' is empty or invalid.")

        try:
            response = requests.get(url)
            response.raise_for_status()  # Raise error for HTTP issues
        except requests.exceptions.RequestException as e:
            raise serializers.ValidationError(f"Error downloading profile image: {e}")

        # Save the image content to a temporary file
        temp_file = tempfile.NamedTemporaryFile(delete=False, suffix='.jpg')
        temp_file.write(response.content)
        temp_file.close()
        return temp_file.name

    def cleanup_temp_files(self, file_paths):
        """
        Remove temporary files from the system.
        """
        for file_path in file_paths:
            if file_path and os.path.exists(file_path):
                os.remove(file_path)
