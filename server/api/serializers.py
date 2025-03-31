'''
contains a serializer for each model that we have along with users
'''

from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Experience, Project


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        return user


class ExperienceSerializer(serializers.Serializer):
    """Serializer for Experience data from Firestore"""
    id = serializers.CharField(read_only=True)
    title = serializers.CharField(max_length=200)
    company = serializers.CharField(max_length=200)
    duration = serializers.CharField(max_length=100)
    description = serializers.JSONField()
    technologies = serializers.JSONField()
    image = serializers.CharField(max_length=255)
    created_at = serializers.DateTimeField(read_only=True, required=False)
    updated_at = serializers.DateTimeField(read_only=True, required=False)


class ProjectSerializer(serializers.Serializer):
    """Serializer for Project data from Firestore"""
    id = serializers.CharField(read_only=True)
    title = serializers.CharField(max_length=200)
    description = serializers.CharField()
    image = serializers.CharField(max_length=255)
    technologies = serializers.JSONField()
    category = serializers.JSONField()
    created_at = serializers.DateTimeField(read_only=True, required=False)
    updated_at = serializers.DateTimeField(read_only=True, required=False)