from django.urls import path
from .views import SupabaseAuthView,AddFoodItemView

urlpatterns = [
    
    path('api/auth/supabase/', SupabaseAuthView.as_view(), name='supabase-auth'),
    path('food/add/', AddFoodItemView.as_view(), name='add-food'),
]
