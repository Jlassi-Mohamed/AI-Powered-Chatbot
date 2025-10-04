from rest_framework import serializers
from .models import Conversation, ChatMessage


class ChatMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatMessage
        fields = ["id", "conversation", "role", "content", "timestamp"]
        read_only_fields = ["id", "timestamp"]


class ConversationSerializer(serializers.ModelSerializer):
    messages = ChatMessageSerializer(many=True, read_only=True)

    class Meta:
        model = Conversation
        fields = ["id", "user", "model_name", "language", "created_at", "messages"]
        read_only_fields = ["id", "user", "created_at", "messages"]
