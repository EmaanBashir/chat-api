from django.urls import path
from .views import ThreadView

urlpatterns = [
    path('t<str:thread_id>/', ThreadView.as_view(), name="chat")
]