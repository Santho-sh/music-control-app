from django.urls import path
from . import views

urlpatterns = [
    path('rooms', views.RoomView.as_view()),
    path('create', views.CreateRoomView.as_view()),
    # api/room?code=....
    path('room', views.GetRoom.as_view()),
    path('join', views.JoinRoom.as_view()),
    path('user-room', views.UserInRoom.as_view()),
]
