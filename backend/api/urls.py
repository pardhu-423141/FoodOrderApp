from django.urls import path
from .views import SupabaseAuthView,AddFoodItemView,ViewFoodItemsView

urlpatterns = [
    
    path('api/auth/supabase/', SupabaseAuthView.as_view(), name='supabase-auth'),
    path('food/add/', AddFoodItemView.as_view(), name='add-food'),
    path('food/items/',ViewFoodItemsView.as_view(),name='food-items'),
]
