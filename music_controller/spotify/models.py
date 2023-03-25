from django.db import models


class SpotifyToken(models.Model):
    user = models.CharField(max_length=100, unique=True)
    access_token = models.CharField(max_length=300)
    refresh_token = models.CharField(max_length=300)
    token_type = models.CharField(max_length=50)
    expires_in = models.DateTimeField()
    created = models.DateTimeField(auto_now_add=True)
