import json
from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import sync_to_async
from django.contrib.auth.models import User
from channels.db import database_sync_to_async
from .models import Thread, Message

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        thread_id = self.scope['url_route']['kwargs']['thread_id']
        self.thread = await sync_to_async(Thread.objects.get)(id = thread_id)

        self.room_name = f'thread_{self.thread.id}'

        # Join room group
        await self.channel_layer.group_add(
            self.room_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_name,
            self.channel_name
        )

    # Receive message from WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        msg = text_data_json['message']

        message = json.dumps({
            'msg': msg,
            'user_id': self.scope['user'].id,
            'username':self.scope['user'].username,
            'thread_type':self.thread.thread_type,
            'thread_id':self.thread.id,
        })

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )

    # Receive message from room group
    async def chat_message(self, event):
        message = event['message']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message
        }))

