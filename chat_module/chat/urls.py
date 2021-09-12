from django.urls import path
from . import views

urlpatterns = [
    path('fetch-messages/t<str:thread_id>u<str:user_id>/', views.fetch_messages, name = 'fetch-messages'),
    path('create-message/', views.create_message, name = 'create-message'),
    path('fetch-threads/<str:user_id>/', views.fetch_threads, name = 'fetch-threads'),
    path('create-thread/', views.create_thread, name = 'create-thread'),
    path('mark-as-read/t<str:thread_id>u<str:user_id>/', views.mark_as_read, name = 'mark_as_read'),
    path('fetch-users/', views.fetch_users, name = 'fetch-users'),
]