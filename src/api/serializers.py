from rest_framework import serializers
from .models import ChessGame

class ChessSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChessGame
        fields = ('id', 'code', 'host', 'guest', 'max_time', 'host_curr_time', 'guest_curr_time', 'created_at', 'chess_annotations', 'fen')


class CreateRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChessGame
        fields = ('max_time', )

class UpdateFenSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChessGame
        fields = ('code', 'fen')