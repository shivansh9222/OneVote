from rest_framework import serializers
from .models import Party, Contact  # Import the models
from django.contrib.auth.models import User
<<<<<<< HEAD
from django.contrib.auth import authenticate
=======
>>>>>>> f5be5228eb21aa7a30007ae216c7920964df68e3

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
<<<<<<< HEAD
        

class SignupSerializer(serializers.ModelSerializer):
=======

class SignupSerializer(serializers.ModelsSerializer):
>>>>>>> f5be5228eb21aa7a30007ae216c7920964df68e3
    class Meta:
        model = User
        fields = ['username,email,password']

        def create(self, validated_data):
            user = User.objects.create_user(
                username=validated_data['username'],
                email=validated_data['email'],
                password=validated_data['password']
            )
            return user
<<<<<<< HEAD
        

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True, write_only=True)

    def validate(self, data):
        username = data.get("username", "")
        password = data.get("password", "")

        if username and password:
            user = authenticate(username=username, password=password)
            if user:
                if not user.is_active:
                    raise serializers.ValidationError("User is deactivated.")
                return user
            else:
                raise serializers.ValidationError("Invalid login credentials.")
        else:
            raise serializers.ValidationError("Must include both username and password.")
=======
        
>>>>>>> f5be5228eb21aa7a30007ae216c7920964df68e3
