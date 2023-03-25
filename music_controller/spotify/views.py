from django.shortcuts import redirect
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from requests import Request, post
from api.models import Room

from .utils import *
from .credentials import CLIENT_ID, CLIENT_SECRET, REDIRECT_URI


class AuthURL(APIView):
    def get(self, request):
        scope = 'user-read-playback-state user-modify-playback-state user-read-currently-playing'

        url = Request('GET', 'http://accounts.spotify.com/authorize', params={
            'client_id': CLIENT_ID,
            'response_type': 'code',
            'redirect_uri': REDIRECT_URI,
            'scope': scope,
        }).prepare().url

        return Response({'auth_url': url}, status=status.HTTP_200_OK)


def Callback(request):
    code = request.GET.get('code')
    error = request.GET.get('error')

    response = post('https://accounts.spotify.com/api/token', data={
        'code': code,
        'redirect_uri': REDIRECT_URI,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET,
        'grant_type': 'authorization_code',
    }).json()

    # Sample Response:
    # {
    #     "access_token": "NgCXRK...MzYjw",
    #     "token_type": "Bearer",
    #     "scope": "user-read-private user-read-email",
    #     "expires_in": 3600,
    #     "refresh_token": "NgAagA...Um_SHo"
    # }

    access_token = response.get('access_token')
    token_type = response.get('token_type')
    refresh_token = response.get('refresh_token')
    expires_in = response.get('expires_in')

    if not request.session.exists(request.session.session_key):
        request.session.create()

    session_key = request.session.session_key

    update_or_create_user_token(
        session_key, access_token, refresh_token, token_type, expires_in)

    return redirect('/')


class IsAuthenticated(APIView):
    def get(self, request):
        if not request.session.exists(self.request.session.session_key):
            request.session.create()

        return Response({'status': is_authenticated(self.request.session.session_key)}, status=status.HTTP_200_OK)


class CurrentSong(APIView):
    def get(self, request):
        room_code = self.request.session.get('room_code')
        room = Room.objects.filter(code=room_code)
        if room.exists():
            room = room[0]
        else:
            return Response({'message': 'room not found'}, status=status.HTTP_404_NOT_FOUND)

        host = room.host
        endpoint = 'player/currently-playing'

        response = spotify_api_request(host, endpoint)
        if 'Error' in response or 'item' not in response:
            return Response({'message': 'request error'}, status=status.HTTP_204_NO_CONTENT)

        item = response.get('item')
        duration = item.get('duration_ms')
        progress = response.get('progress_ms')
        album_cover = item.get('album').get('images')[0].get('url')
        is_playing = response.get('is_playing')
        song_id = item.get('id')

        artists_list = ''

        for i, artist in enumerate(item.get('artists')):
            if i > 0:
                artists_list += ', '

            artists_list += artist.get('name')

        song = {
            'id': song_id,
            'title': item.get('name'),
            'artist': artists_list,
            'duration': duration,
            'time': progress,
            'img_url': album_cover,
            'is_playing': is_playing,
            'votes': 0,

        }

        return Response(song, status=status.HTTP_200_OK)
