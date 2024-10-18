from rest_framework import serializers
from .models import Party, Contact  # Import the models

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
        