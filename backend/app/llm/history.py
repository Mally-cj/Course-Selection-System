from app.api.deps import CurrentUser
from langchain_core.messages.base import BaseMessage, BaseMessageChunk


ChatHistoryMap = {}

def get_chat_history(chat_id: str, user: CurrentUser):
    if user.id not in ChatHistoryMap:
        ChatHistoryMap[user.id] = {}
    if chat_id not in ChatHistoryMap[user.id]:
        ChatHistoryMap[user.id][chat_id] = []
    return ChatHistoryMap[user.id][chat_id]

def set_chat_history(chat_id: str, user: CurrentUser, messages: list[BaseMessage]):
    ChatHistoryMap[user.id][chat_id] = messages

def clear_chat_history(chat_id: str, user: CurrentUser):
    ChatHistoryMap[user.id][chat_id] = []