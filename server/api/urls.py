from django.urls import path
from . import views

urlpatterns = [
    # Experience endpoints
    path("experiences/", views.ExperienceList.as_view(), name="experience-list"),
    path("experiences/create/", views.ExperienceCreate.as_view(), name="experience-create"),
    path("experiences/update/<str:pk>/", views.ExperienceUpdate.as_view(), name="experience-update"),
    path("experiences/delete/<str:pk>/", views.ExperienceDelete.as_view(), name="experience-delete"),
    path("experiences/<str:pk>/", views.ExperienceDetail.as_view(), name="experience-detail"),
    
    # Project endpoints
    path("projects/", views.ProjectList.as_view(), name="project-list"),
    path("projects/create/", views.ProjectCreate.as_view(), name="project-create"),
    path("projects/update/<str:pk>/", views.ProjectUpdate.as_view(), name="project-update"),
    path("projects/delete/<str:pk>/", views.ProjectDelete.as_view(), name="project-delete"),
    path("projects/<str:pk>/", views.ProjectDetail.as_view(), name="project-detail"),
]