from django.shortcuts import redirect
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from requests import Request, post

from .utils import update_or_create_user_token, is_authenticated
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
