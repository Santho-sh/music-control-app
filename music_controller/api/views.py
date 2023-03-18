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

class GetRoom(APIView):
    serializer_class = RoomSerializer
    lookup_url_kwarg = 'code'
    
    def get(self, request):
        code = request.GET.get(self.lookup_url_kwarg)
        if code != None:
            room = Room.objects.filter(code=code)
            
            if room.exists():
                data = RoomSerializer(room[0]).data
                data['is_host'] = self.request.session.session_key == room[0].host
                
                return Response(data, status=status.HTTP_200_OK)
            
            return Response({'message': 'Invalid Room Code'}, status=status.HTTP_404_NOT_FOUND)\
                
        return Response({'message': 'Room Code Not Found'}, status=status.HTTP_400_BAD_REQUEST)   
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
            return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED)

        return Response({'message': 'Invalid data'}, status=status.HTTP_400_BAD_REQUEST)
