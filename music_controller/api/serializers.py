from rest_framework import serializers
from .models import Room


class Roomserializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('id', 'code', 'host', 'can_pause', 'skip_votes', 'created')
