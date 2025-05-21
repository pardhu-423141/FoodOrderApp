from django.shortcuts import render

# Create your views here.
from rest_framework.response import Response
from rest_framework.decorators import api_view
from supabase import create_client

@api_view(['GET'])
def hello_world(request):
    return Response({"message": "Hello from Django backend!"})


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from supabase import create_client
from django.contrib.auth import get_user_model
import logging

logger = logging.getLogger(__name__)
User = get_user_model()  # Get the active User model

SUPABASE_URL = 'https://ugqnqwtxlqerodtjduup.supabase.co'
SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVncW5xd3R4bHFlcm9kdGpkdXVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0ODQwODYsImV4cCI6MjA2MzA2MDA4Nn0.6MdhCq1v_jeIzJXheGA43unuGbF392go1H55hg3HbTU'

class SupabaseAuthView(APIView):
    def post(self, request):
        # Extract token from Authorization header
        auth_header = request.headers.get('Authorization', '')
        if not auth_header.startswith('Bearer '):
            return Response(
                {'error': 'Invalid authorization header'},
                status=status.HTTP_401_UNAUTHORIZED
            )
            
        token = auth_header.split(' ')[1]
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
        
        try:
            # Verify token with Supabase
            auth_response = supabase.auth.get_user(token)
            if auth_response.user is None:
                raise ValueError("Invalid user")
                
            # Get or create Django user
            user, created = User.objects.get_or_create(
                email=auth_response.user.email,
                defaults={
                    'username': auth_response.user.email,
                    'password': None  # No password for OAuth users
                }
            )
            
            return Response({
                'status': 'success',
                'user_id': user.id,
                'email': user.email,
                'is_new_user': created
            })
            
        except Exception as e:
            logger.error(f"Supabase auth failed: {str(e)}")
            return Response(
                {'error': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )