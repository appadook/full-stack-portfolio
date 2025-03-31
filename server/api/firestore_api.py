from django.conf import settings
import uuid
from datetime import datetime

# Utility functions for Experience collection
def get_all_experiences():
    """Retrieve all experiences from Firestore"""
    experiences = []
    docs = settings.FIRESTORE_DB.collection('experiences').stream()
    
    for doc in docs:
        experience_data = doc.to_dict()
        experience_data['id'] = doc.id
        experiences.append(experience_data)
    
    return experiences

def get_experience_by_id(experience_id):
    """Retrieve a specific experience by ID"""
    doc_ref = settings.FIRESTORE_DB.collection('experiences').document(experience_id)
    doc = doc_ref.get()
    
    if doc.exists:
        experience_data = doc.to_dict()
        experience_data['id'] = doc.id
        return experience_data
    return None

def create_experience(experience_data):
    """Create a new experience in Firestore"""
    # Generate a unique ID
    doc_id = str(uuid.uuid4())
    
    # Add timestamp
    experience_data['created_at'] = datetime.now()
    
    # Save to Firestore
    doc_ref = settings.FIRESTORE_DB.collection('experiences').document(doc_id)
    doc_ref.set(experience_data)
    
    # Return the created data with ID
    experience_data['id'] = doc_id
    return experience_data

def update_experience(experience_id, experience_data):
    """Update an existing experience in Firestore"""
    # Add updated timestamp
    experience_data['updated_at'] = datetime.now()
    
    # Update in Firestore
    doc_ref = settings.FIRESTORE_DB.collection('experiences').document(experience_id)
    doc_ref.update(experience_data)
    
    # Get the updated document
    return get_experience_by_id(experience_id)

def delete_experience(experience_id):
    """Delete an experience from Firestore"""
    doc_ref = settings.FIRESTORE_DB.collection('experiences').document(experience_id)
    doc_ref.delete()
    return True

# Utility functions for Project collection
def get_all_projects():
    """Retrieve all projects from Firestore"""
    projects = []
    docs = settings.FIRESTORE_DB.collection('projects').stream()
    
    for doc in docs:
        project_data = doc.to_dict()
        project_data['id'] = doc.id
        projects.append(project_data)
    
    return projects

def get_project_by_id(project_id):
    """Retrieve a specific project by ID"""
    doc_ref = settings.FIRESTORE_DB.collection('projects').document(project_id)
    doc = doc_ref.get()
    
    if doc.exists:
        project_data = doc.to_dict()
        project_data['id'] = doc.id
        return project_data
    return None

def create_project(project_data):
    """Create a new project in Firestore"""
    # Generate a unique ID
    doc_id = str(uuid.uuid4())
    
    # Add timestamp
    project_data['created_at'] = datetime.now()
    
    # Save to Firestore
    doc_ref = settings.FIRESTORE_DB.collection('projects').document(doc_id)
    doc_ref.set(project_data)
    
    # Return the created data with ID
    project_data['id'] = doc_id
    return project_data

def update_project(project_id, project_data):
    """Update an existing project in Firestore"""
    # Add updated timestamp
    project_data['updated_at'] = datetime.now()
    
    # Update in Firestore
    doc_ref = settings.FIRESTORE_DB.collection('projects').document(project_id)
    doc_ref.update(project_data)
    
    # Get the updated document
    return get_project_by_id(project_id)

def delete_project(project_id):
    """Delete a project from Firestore"""
    doc_ref = settings.FIRESTORE_DB.collection('projects').document(project_id)
    doc_ref.delete()
    return True