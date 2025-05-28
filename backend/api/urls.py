from django.urls import path
from .views import SupabaseAuthView,AddFoodItemView,ViewFoodItemsView,GetItemsByIdsView

urlpatterns = [
    
    path('api/auth/supabase/', SupabaseAuthView.as_view(), name='supabase-auth'),
    path('food/add/', AddFoodItemView.as_view(), name='add-food'),
    path('food/items/',ViewFoodItemsView.as_view(),name='food-items'),
    path('food/items/by-ids/', GetItemsByIdsView.as_view(), name='get-items-by-ids'),
]
