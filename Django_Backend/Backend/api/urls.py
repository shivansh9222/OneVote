from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PartyViewSet, ContactViewSet, contact_us, SignupView, LoginView, LogoutView, update_vote

# Create a router and register the viewsets
router = DefaultRouter()
router.register(r'party', PartyViewSet)     # This will create /party/ API
router.register(r'contact', ContactViewSet) # This will create /contact/ API

# Include the router URLs in your urlpatterns
urlpatterns = [
    path('api/', include(router.urls)),  # This will map URLs under /api/
    path('api/contactus/',contact_us,name='contactUs'),
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('updatevote/', update_vote, name='updateVote')
]
