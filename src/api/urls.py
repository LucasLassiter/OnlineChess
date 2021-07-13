from django.urls import path
from .views import ChessView, CreateRoomView


urlpatterns = [

    path('', ChessView.as_view()),
    path('/create-room', CreateRoomView.as_view()),
]
