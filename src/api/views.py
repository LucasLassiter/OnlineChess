from api.models import ChessGame
from django.shortcuts import render
from rest_framework import generics, status
from .serializers import ChessSerializer, CreateRoomSerializer, UpdateFenSerializer
from .models import ChessGame
from rest_framework.views import APIView
from rest_framework.response import Response


# Create your views here.
class ChessView(generics.CreateAPIView):
    queryset = ChessGame.objects.all()
    serializer_class = ChessSerializer   

class GetRoom(APIView):
    serializer_class = ChessSerializer
    lookup_url_kwarg = 'code'

    def get(self, request, format=None):
        code = request.GET.get(self.lookup_url_kwarg)
        if code != None:
            room = ChessGame.objects.filter(code=code)
            if len(room) > 0:
                data = ChessSerializer(room[0]).data
                data['is_host'] = self.request.session.session_key == room[0].host
                return Response(data, status=status.HTTP_200_OK)

            return Response({'Room Not Found': 'Invalid Room Code.'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Code parameter not found in request'}, status=status.HTTP_400_BAD_REQUEST)

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


class UpdateFenView(APIView):
    serializer_class = UpdateFenSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            code = serializer.data['code']
            fen = serializer.data['fen']
            if code != None:
                queryset = ChessGame.objects.filter(code=code)
                room = queryset[0]
                print(room)
                room.fen = fen
                room.save(update_fields=['fen'])
                print(f"!!!!!!!!!!!!{room.fen}")

                return Response(ChessSerializer(room).data, status=status.HTTP_202_ACCEPTED)

            print('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!2')
