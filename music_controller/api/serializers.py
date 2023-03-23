from rest_framework import serializers
from .models import Room


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('id', 'code', 'host', 'can_pause', 'skip_votes', 'created')


class CreateRoomSerializers(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('can_pause', 'skip_votes')

class UpdateRoomSerializers(serializers.ModelSerializer):
    code = serializers.CharField()
    class Meta:
        model = Room
        fields = ('can_pause', 'skip_votes', 'code')