from django.urls import path
from .views import ChessView, CreateRoomView, GetRoom, UpdateFenView


urlpatterns = [

    path('', ChessView.as_view()),
    path('/create-room', CreateRoomView.as_view()),
    path('/get-room', GetRoom.as_view()),
    path('/update-fen', UpdateFenView.as_view())
]
