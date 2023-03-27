from django.urls import path
from . import views

urlpatterns = [
    path('auth-url', views.AuthURL.as_view()),
    path('is-authenticated', views.IsAuthenticated.as_view()),
    path('current-song', views.CurrentSong.as_view()),
    path('pause', views.PauseSong.as_view()),
    path('play', views.PlaySong.as_view()),
    path('skip', views.SkipSong.as_view()),
    path('callback', views.Callback),
]
