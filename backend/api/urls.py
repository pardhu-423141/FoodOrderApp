from django.urls import path
from .views import SupabaseAuthView, hello_world

urlpatterns = [
    path('hello/', hello_world),
    path('api/auth/supabase/', SupabaseAuthView.as_view(), name='supabase-auth'),
]
