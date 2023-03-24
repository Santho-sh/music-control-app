from django.urls import path
from . import views

urlpatterns = [
    path('auth-url', views.AuthURL.as_view()),
    path('is-authenticated', views.IsAuthenticated.as_view()),
    path('callback', views.Callback),
]
