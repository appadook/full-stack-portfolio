from django.db import models
from django.contrib.auth.models import User


class Experience(models.Model):
    title = models.CharField(max_length=200)
    company = models.CharField(max_length=200)
    duration = models.CharField(max_length=100)
    description = models.JSONField()  # Store list of description points as JSON
    technologies = models.JSONField()  # Store list of technologies as JSON
    image = models.CharField(max_length=255)
    
    def __str__(self):
        return f"{self.title} at {self.company}"


class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.CharField(max_length=255)
    technologies = models.JSONField()  # Store list of technologies as JSON
    category = models.JSONField()  # Store list of categories as JSON
    
    def __str__(self):
        return self.title