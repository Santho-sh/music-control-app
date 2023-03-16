from django.db import models
import random
import string


def generate_code():
    length = 6

    while True:
        new_code = ''.join(random.choices(string.ascii_uppercase +
                                          string.digits, k=length))
        if Room.objects.filter(code=new_code).count() == 0:
            return new_code


class Room(models.Model):
    host = models.CharField(max_length=50, unique=True)
    code = models.CharField(max_length=8, unique=True)
    can_pause = models.BooleanField(default=False)
    skip_votes = models.IntegerField(default=1)
    created = models.DateTimeField(auto_now_add=True)
