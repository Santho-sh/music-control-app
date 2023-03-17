from django.shortcuts import render
from rest_framework import generics, status
from .serializers import RoomSerializer, CreateRoomSerializers
from .models import Room
from rest_framework.views import APIView
from rest_framework.response import Response
from django.utils import timezone


class RoomView(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer


class CreateRoomView(APIView):

    serializer_class = CreateRoomSerializers

    def post(self, request):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            can_pause = serializer.data.get('can_pause')
            skip_votes = serializer.data.get('skip_votes')
            host = self.request.session.session_key

            query = Room.objects.filter(host=host)

            if query.exists():
                room = query[0]
                room.can_pause = can_pause
                room.skip_votes = skip_votes
                room.created = timezone.now()
                room.save(update_fields=['can_pause', 'skip_votes', 'created'])
            else:
                room = Room(host=host, can_pause=can_pause,
                            skip_votes=skip_votes)
                room.save()
            return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)
        
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)
