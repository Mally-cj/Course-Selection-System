
from typing import Any, Optional
from app.api.deps import CurrentUser, SessionDep
from app.llm.history import clear_chat_history, set_chat_history, get_chat_history
from app.llm import ChatModel, SearchCourseTool, SelectCourseTool, get_llm
from fastapi import APIRouter
import pydantic
from langchain_core.messages import HumanMessage, SystemMessage, AIMessage
from langgraph.prebuilt import chat_agent_executor

from langchain_core.tools import tool
from langchain.agents import AgentExecutor
from langchain.agents import create_tool_calling_agent
from langchain_core.pydantic_v1 import BaseModel, Field
import functools
router = APIRouter()

@router.get("/history")
def chat_history(
    session: SessionDep, current_user: CurrentUser, chat_id: Optional[str] = None,
) -> Any:
    """
    获取聊天的历史
    """
    chat_history = get_chat_history(chat_id, current_user)

    return [item.dict() for item in chat_history]

@router.get("/history/clear")
def chat_history_clear(
    session: SessionDep, current_user: CurrentUser, chat_id: Optional[str] = None,
) -> Any:
    """
    清除聊天的历史
    """
    clear_chat_history(chat_id, current_user)
    return "OK"

class ChatReq(pydantic.BaseModel):
    message: str
    model: ChatModel = Field(default=ChatModel.GPT4O)
    chat_id: Optional[str]

@router.post("/chat")
def chat(
    session: SessionDep, current_user: CurrentUser, req: ChatReq,
) -> Any:
    """
    进行聊天
    """
    llm = get_llm(req.model)
    tools = [SearchCourseTool(session=session), SelectCourseTool(session=session, student_id=current_user.student_id)]
    agent_executor = chat_agent_executor.create_tool_calling_executor(llm, tools, debug=True)
    messages = get_chat_history(req.chat_id, current_user)
    messages.append(HumanMessage(req.message))
    res = agent_executor.invoke({"messages": messages})
    messages.extend(res["messages"])
    set_chat_history(req.chat_id, current_user, messages)
    return [item.dict() for item in messages]