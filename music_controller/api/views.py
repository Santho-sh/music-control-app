from django.shortcuts import render
from rest_framework import generics
from .serializers import Roomserializer
from .models import Room

class RoomView(generics.ListCreateAPIView):
    queryset = Room.objects.all()
    serializer_class = Roomserializer
