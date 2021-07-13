from django.db import models
import string
import random

def generate_unique_code():
    length = 6

    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))

        if ChessGame.objects.filter(code=code).count() == 0:
            break

    print(f'!!!!!!!!!! {code}')

    return code

# Create your models here.
class ChessGame(models.Model):
    code = models.CharField(max_length=8, default=generate_unique_code, unique=True)
    host = models.CharField(max_length=50, unique=True)
    guest = models.CharField(max_length=50, unique=True, null=True)
    max_time = models.IntegerField(default=600)
    host_curr_time = models.DecimalField(decimal_places=2, max_digits=1000, default=600)
    guest_curr_time = models.DecimalField(decimal_places=2, max_digits=1000, default=600)
    created_at = models.DateTimeField(auto_now_add=True)
    chess_annotations = models.TextField(max_length=1000, default='')

