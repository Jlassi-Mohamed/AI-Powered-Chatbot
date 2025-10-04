import os
from dotenv import load_dotenv
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from openai import OpenAI
from .models import Conversation, Message, Interest

load_dotenv()


def generate_user_interests(user, new_message, max_interests=1000):
    model_name = "llama"
    prompt = f"""
    Extract the main interest tags from the following user message.
    Return ONLY a comma-separated list of keywords, without any explanation.
    The tags should be concise, like: football, politics, cooking, etc.

    User message:
    {new_message}
    """

    messages = [{"role": "user", "content": prompt}]

    tags_str = call_model(model_name, messages)
    tags = [t.strip() for t in tags_str.split(",") if t.strip()]
    current_tags = set(Interest.objects.filter(user=user).values_list("tag", flat=True))

    for tag in tags:
        if tag not in current_tags:
            if Interest.objects.filter(user=user).count() < max_interests:
                Interest.objects.create(user=user, tag=tag)
                current_tags.add(tag)


def call_model(model_name, messages):
    if model_name == "openai":
        client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        model_id = "gpt-4o-mini"
    elif model_name == "llama":
        client = OpenAI(
            base_url="https://router.huggingface.co/v1",
            api_key=os.getenv("HUGGINGFACE_API_KEY"),
        )
        model_id = "meta-llama/Llama-3.1-8B-Instruct:fireworks-ai"
    elif model_name == "deepseek":
        client = OpenAI(
            base_url="https://router.huggingface.co/v1",
            api_key=os.getenv("HUGGINGFACE_API_KEY"),
        )
        model_id = "deepseek-ai/DeepSeek-V3.2-Exp:novita"
    else:
        raise ValueError("Invalid model_name")

    completion = client.chat.completions.create(
        model=model_id,
        messages=messages,
    )
    return completion.choices[0].message.content



@api_view(["POST"])
@permission_classes([IsAuthenticated])
def chat(request):
    model_name = request.data.get("model_name")
    query = request.data.get("query")
    language = request.data.get("language", "en")
    conversation_id = request.data.get("conversation_id")

    if not query:
        return Response({"error": "Query is required"}, status=400)

    if conversation_id:
        conversation = Conversation.objects.get(id=conversation_id, user=request.user)
    else:
        conversation = Conversation.objects.create(
            user=request.user,
            model_name=model_name,
            language=language,
        )

    messages = [{"role": msg.role, "content": msg.content} for msg in conversation.messages.order_by("timestamp")]
    messages.append({"role": "user", "content": query})

    ai_answer = call_model(model_name, messages)

    Message.objects.create(conversation=conversation, role="user", content=query)
    Message.objects.create(conversation=conversation, role="assistant", content=ai_answer)

    conversation.save()

    generate_user_interests(request.user, query)

    return Response({
        "conversation_id": str(conversation.id),
        "query": query,
        "response": ai_answer,
        "model_used": model_name,
        "language": language,
    })

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_user_interests(request):
    interests = Interest.objects.filter(user=request.user).values_list('tag', flat=True)
    return Response({"interests": list(interests)})

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def list_conversations(request):
    convos = Conversation.objects.filter(user=request.user).order_by("-updated_at")
    data = [{"id": str(c.id), "model": c.model_name, "language": c.language, "created_at": c.created_at} for c in convos]
    return Response(data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_messages(request, conversation_id):
    convo = Conversation.objects.get(id=conversation_id, user=request.user)
    messages = convo.messages.order_by("timestamp")
    data = [{"role": m.role, "content": m.content, "timestamp": m.timestamp} for m in messages]
    return Response(data)

@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_conversation(request, conversation_id):
    try:
        conversation = Conversation.objects.get(id=conversation_id, user=request.user)
        conversation.delete()
        return Response({"message": "Conversation deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
    except Conversation.DoesNotExist:
        return Response({"error": "Conversation not found"}, status=status.HTTP_404_NOT_FOUND)