from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer, ExperienceSerializer, ProjectSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Experience, Project
from . import firestore_api


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


# Experience views with Firestore API
class ExperienceList(APIView):
    permission_classes = [AllowAny]  # Anyone can view experiences

    def get(self, request):
        experiences = firestore_api.get_all_experiences()
        return Response(experiences)


class ExperienceDetail(APIView):
    permission_classes = [AllowAny]  # Anyone can view an experience

    def get(self, request, pk):
        experience = firestore_api.get_experience_by_id(pk)
        if experience:
            return Response(experience)
        return Response({"error": "Experience not found"}, status=status.HTTP_404_NOT_FOUND)


class ExperienceCreate(APIView):
    permission_classes = [IsAuthenticated]  # Only authenticated users can create

    def post(self, request):
        serializer = ExperienceSerializer(data=request.data)
        if serializer.is_valid():
            experience = firestore_api.create_experience(serializer.validated_data)
            return Response(experience, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ExperienceUpdate(APIView):
    permission_classes = [IsAuthenticated]  # Only authenticated users can update

    def put(self, request, pk):
        # First check if the experience exists
        experience = firestore_api.get_experience_by_id(pk)
        if not experience:
            return Response({"error": "Experience not found"}, status=status.HTTP_404_NOT_FOUND)
            
        serializer = ExperienceSerializer(data=request.data)
        if serializer.is_valid():
            updated_experience = firestore_api.update_experience(pk, serializer.validated_data)
            return Response(updated_experience)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ExperienceDelete(APIView):
    permission_classes = [IsAuthenticated]  # Only authenticated users can delete

    def delete(self, request, pk):
        # First check if the experience exists
        experience = firestore_api.get_experience_by_id(pk)
        if not experience:
            return Response({"error": "Experience not found"}, status=status.HTTP_404_NOT_FOUND)
            
        firestore_api.delete_experience(pk)
        return Response(status=status.HTTP_204_NO_CONTENT)


# Project views with Firestore API
class ProjectList(APIView):
    permission_classes = [AllowAny]  # Anyone can view projects

    def get(self, request):
        projects = firestore_api.get_all_projects()
        return Response(projects)


class ProjectDetail(APIView):
    permission_classes = [AllowAny]  # Anyone can view a project

    def get(self, request, pk):
        project = firestore_api.get_project_by_id(pk)
        if project:
            return Response(project)
        return Response({"error": "Project not found"}, status=status.HTTP_404_NOT_FOUND)


class ProjectCreate(APIView):
    permission_classes = [IsAuthenticated]  # Only authenticated users can create

    def post(self, request):
        serializer = ProjectSerializer(data=request.data)
        if serializer.is_valid():
            project = firestore_api.create_project(serializer.validated_data)
            return Response(project, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProjectUpdate(APIView):
    permission_classes = [IsAuthenticated]  # Only authenticated users can update

    def put(self, request, pk):
        # First check if the project exists
        project = firestore_api.get_project_by_id(pk)
        if not project:
            return Response({"error": "Project not found"}, status=status.HTTP_404_NOT_FOUND)
            
        serializer = ProjectSerializer(data=request.data)
        if serializer.is_valid():
            updated_project = firestore_api.update_project(pk, serializer.validated_data)
            return Response(updated_project)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProjectDelete(APIView):
    permission_classes = [IsAuthenticated]  # Only authenticated users can delete

    def delete(self, request, pk):
        # First check if the project exists
        project = firestore_api.get_project_by_id(pk)
        if not project:
            return Response({"error": "Project not found"}, status=status.HTTP_404_NOT_FOUND)
            
        firestore_api.delete_project(pk)
        return Response(status=status.HTTP_204_NO_CONTENT)