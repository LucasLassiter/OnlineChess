import asyncio
import json
from django.contrib.auth import get_user_model
from channels.consumer import AsyncConsumer
from channels.db import database_sync_to_async

from .models import ChessGame

class ChatConsumer(AsyncConsumer):
    async def websocket_connect(self, event):
        print('connected', event)

    async def websocket_recieve(self, event):
        # when a message is recieved from the websocket
        print('recieve', event)

    async def websocket_disconnect(self, event):
        # when the socket disconnects
        print('disconnect', event)