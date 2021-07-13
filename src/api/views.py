from api.models import ChessGame
from django.shortcuts import render
from rest_framework import generics, status
from .serializers import ChessSerializer, CreateRoomSerializer
from .models import ChessGame
from rest_framework.views import APIView
from rest_framework.response import Response


# Create your views here.
class ChessView(generics.CreateAPIView):
    queryset = ChessGame.objects.all()
    serializer_class = ChessSerializer   

class CreateRoomView(APIView):
    serializer_class = CreateRoomSerializer

    def post(self, request, format=None):
        # Creates a session key if host doesn't already have one
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        # Retrieves the data from the serializer class
        serializer = self.serializer_class(data=request.data)
        
        # Determines if the data sent is valid and if so saves it in a variable
        if serializer.is_valid():
            max_time = serializer.data['max_time']

            # gives the host a session key
            host = self.request.session.session_key

            # Determines if the host already has a game active
            queryset = ChessGame.objects.filter(host=host)
            if queryset.exists():
                print('!!!!!!! Already exists !!!!!!!!')
            else:
                chess_game = ChessGame(host=host, max_time=max_time)
                chess_game.save()

                print('!!!!!!!!!!!!!!! here')
            # Serializes it and sends it over and creates a view
                return Response(ChessSerializer(chess_game).data, status=status.HTTP_201_CREATED)
