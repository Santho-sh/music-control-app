from .models import SpotifyToken
from django.utils import timezone
from datetime import timedelta
from requests import post, put, get
from .credentials import CLIENT_ID, CLIENT_SECRET

BASE_URL = 'https://api.spotify.com/v1/me/'


def get_user_tokens(session_key):
    query = SpotifyToken.objects.filter(user=session_key)

    if query.exists():
        return query[0]
    else:
        return None


def update_or_create_user_token(session_key, access_token, refresh_token, token_type, expires_in):
    user_tokens = get_user_tokens(session_key)
    expires_in = timezone.now() + timedelta(seconds=expires_in)

    if user_tokens:
        user_tokens.access_token = access_token
        user_tokens.refresh_token = refresh_token
        user_tokens.token_type = token_type
        user_tokens.expires_in = expires_in

        user_tokens.save(update_fields=['access_token',
                                        'refresh_token', 'expires_in', 'token_type'])

    else:
        tokens = SpotifyToken(user=session_key, access_token=access_token,
                              refresh_token=refresh_token, token_type=token_type, expires_in=expires_in)
        tokens.save()


def is_authenticated(session_key):
    user_tokens = get_user_tokens(session_key)

    if user_tokens:
        expiry = user_tokens.expires_in
        if expiry <= timezone.now():
            refresh_tokens(session_key)

        return True

    return False


def refresh_tokens(session_key):

    refresh_token = get_user_tokens(session_key).refresh_token

    response = post('https://accounts.spotify.com/api/token', data={
        'grant_type': 'refresh_token',
        'refresh_token': refresh_token,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET
    }).json()

    new_access_token = response.get('access_token')
    expires_in = response.get('expires_in')
    token_type = response.get('token_type')

    update_or_create_user_token(
        session_key, new_access_token, refresh_token, token_type, expires_in)


def spotify_api_request(session_key, endpoint, post_=False, put_=False):
    tokens = get_user_tokens(session_key)
    print(tokens.access_token)
    headers = {'Content-Type': 'application/json',
               'Authorization': f"Bearer {tokens.access_token}"}

    if post_:
        post(BASE_URL + endpoint, headers=headers)
    if put_:
        put(BASE_URL + endpoint, headers=headers)

    response = get(BASE_URL + endpoint, {}, headers=headers)

    try:
        return response.json()
    except:
        return {'Error': 'Error with request'}
