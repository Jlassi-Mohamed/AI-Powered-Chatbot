from django.urls import path
from .views import *

urlpatterns = [
    path("query/", chat, name="chat"),
    path("conversations/", list_conversations, name="list_conversations"),
    path("conversations/<uuid:conversation_id>/", get_messages, name="get_messages"),
    path("conversations/<uuid:conversation_id>/delete/", delete_conversation, name="delete_conversation"),
    path("interests/", get_user_interests, name="generate_user_interests"),
]