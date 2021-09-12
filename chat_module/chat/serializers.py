from rest_framework import serializers
from .models import Message, Thread
from django.contrib.auth.models import User

class GetMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'
        depth = 1

class CreateMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'
        read_only_fields = ['id', 'created_at']

class GetThreadSerializer(serializers.ModelSerializer):
    last_msg = GetMessageSerializer(many=False, read_only=True, source = "last_message")

    class Meta:
        model = Thread
        fields = '__all__'
        depth = 1

class CreateThreadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Thread
        fields = ['name', 'thread_type', 'users']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'