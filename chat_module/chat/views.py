from .models import Thread, Message
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import *
from django.contrib.auth.models import User
from rest_framework.pagination import PageNumberPagination
import datetime
import json

@api_view(['GET'])
def fetch_messages(request, thread_id, user_id):
    thread = Thread.objects.get(id = thread_id)
    messages = thread.message_set.all()
    paginator = PageNumberPagination()
    paginator.page_size = 20
    result = paginator.paginate_queryset(messages, request)
    serializer = GetMessageSerializer(result, many = True)
    Message.objects.mark_as_read(thread, User.objects.get(id = user_id))
    return paginator.get_paginated_response(serializer.data)

@api_view(['GET'])
def fetch_threads(request, user_id):
    user = User.objects.get(id = user_id)
    threads = Thread.objects.by_user(user).order_by('-updated_at')

    for thread in threads:
        thread.unread_count = thread.message_set.exclude(read_by__in=[user]).count()
        thread.save()

    serializer = GetThreadSerializer(threads, many = True)
    return Response(serializer.data)

@api_view(['POST'])
def create_message(request):
    message_serializer = CreateMessageSerializer(data = request.data)
    thread = Thread.objects.get(id = request.data['thread'])
    thread.updated_at = datetime.datetime.utcnow()
    thread.save()

    if message_serializer.is_valid():
        message_serializer.save()
    return Response(message_serializer.data)

@api_view(['POST'])
def create_thread(request):
    serializer = CreateThreadSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['GET'])
def fetch_users(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many = True)
    return Response(serializer.data)

@api_view(['GET'])
def mark_as_read(request, thread_id, user_id):
    thread = Thread.objects.get(id = thread_id)
    serializer = GetThreadSerializer(thread, many = False)
    Message.objects.mark_as_read(thread, User.objects.get(id = user_id))
    return Response(serializer.data)
