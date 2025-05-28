from django.shortcuts import render








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
        






from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import uuid
from datetime import datetime, timezone
from django.db import connection

class AddFoodItemView(APIView):
    def post(self, request):
        data = request.data
        name = data.get("name")
        description = data.get("description", "")
        image_url = data.get("image_url", "")
        price = data.get("price","")
        if not name:
            return Response({"error": "Name is required"}, status=status.HTTP_400_BAD_REQUEST)

        id = str(uuid.uuid4())
        created_at = datetime.now(timezone.utc)

        try:
            with connection.cursor() as cursor:
                cursor.execute("""
                    INSERT INTO food_items (id, name, description, image_url, created_at, price)
                    VALUES (%s, %s, %s, %s, %s, %s)
                """, (id, name, description, image_url, created_at,price))

            return Response({"message": "Food item added"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)







from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db import connection

class ViewFoodItemsView(APIView):
    def get(self, request):
        try:
            with connection.cursor() as cursor:
                cursor.execute("SELECT id, name, description, image_url, price, rating FROM food_items")
                rows = cursor.fetchall()

                # Map each row to a dictionary
                food_items = []
                for row in rows:
                    food_items.append({
                        "id": row[0],
                        "name": row[1],
                        "description": row[2],
                        "image_url": row[3],
                        "price": row[4],
                        "rating": row[5],

                    })

            return Response(food_items, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db import connection

class GetItemsByIdsView(APIView):
    def post(self, request):
        try:
            ids = request.data.get('ids', [])
            if not ids:
                return Response([], status=200)

            with connection.cursor() as cursor:
                sql = """
                    SELECT id, name, description, image_url, price, rating
                    FROM food_items
                    WHERE id IN %s
                """
                cursor.execute(sql, (tuple(ids),)) 

                rows = cursor.fetchall()

                food_items = []
                for row in rows:
                    food_items.append({
                        "id": row[0],
                        "name": row[1],
                        "description": row[2],
                        "image_url": row[3],
                        "price": row[4],
                        "rating": row[5],
                    })

            return Response(food_items, status=status.HTTP_200_OK)
        except Exception as e:
                import traceback
                traceback.print_exc()
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
