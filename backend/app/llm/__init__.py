import enum
from typing import Optional, Type
from app import logic
from app.models.models import Course
from fastapi import HTTPException
from langchain_core.pydantic_v1 import BaseModel, Field
from langchain_core.tools import BaseTool
from langchain_core.callbacks import (
    AsyncCallbackManagerForToolRun,
    CallbackManagerForToolRun,
)
from app.crud import crud
from langchain_openai import ChatOpenAI, AzureChatOpenAI
from sqlmodel import Session, col
from app.core.config import settings
class ChatModel(str, enum.Enum):   ##枚举类型
    Kimi = "kimi"
    GPT4O = "gpt-4o"

def get_llm(model: ChatModel):
    ##由于gpt4是从微软购买，故而用AzureChatOpenAI，而kimi逆向用的兼容的是openai的接口，故而是用ChatOpenAI
    if model == ChatModel.GPT4O:
        llm = AzureChatOpenAI(model="gpt-4o", azure_endpoint=settings.OPENAI_ENDPOINT, api_key=settings.OPENAI_TOKEN, api_version="2024-03-01-preview")
    else:
        llm = ChatOpenAI(model_name="kimi", base_url=settings.KIMI_BASE_URL, api_key=settings.KIMI_TOKEN)
    return llm

class SearchInput(BaseModel):
    course_name: Optional[str] = Field(description="课程名称，如果没有指定，为空")

class SearchCourseTool(BaseTool):
    name = "search_course"
    description = "查询课程信息, 只需要告知学生课程的名称，授课老师，和授课时间"
    args_schema: Type[BaseModel] = SearchInput
    session: Session
    def _run(
        self, course_name: str=None, run_manager: Optional[CallbackManagerForToolRun] = None
    ) -> str:
        if course_name is None:
            items, count = logic.get_course_list(session=self.session, skip=0, limit=100)
            return items
        else:
            c = col(Course.name).contains(course_name)
            items, count = crud.list(Course, self.session, 0, 100, cond=c)

    async def _arun(
        self, query: str, run_manager: Optional[AsyncCallbackManagerForToolRun] = None
    ) -> str:
        """Use the tool asynchronously."""
        raise NotImplementedError("custom_search does not support async")
class CourseCommentInput(BaseModel):
    course_id: int = Field(description="课程id")
class CourseCommentTool(BaseTool):
    name = "course_comment_query"
    description = "查询课程评价信息"
    args_schema: Type[BaseModel] = SearchInput
    session: Session
    def _run(
        self, course_id: int, run_manager: Optional[CallbackManagerForToolRun] = None
    ) -> str:
        items, count = logic.get_course_comment_list(session=self.session, course_id=course_id, skip=0, limit=100)
        return items


    async def _arun(
        self, query: str, run_manager: Optional[AsyncCallbackManagerForToolRun] = None
    ) -> str:
        """Use the tool asynchronously."""
        raise NotImplementedError("custom_search does not support async")

class CourseOp(str, enum.Enum):
    Select = "select"
    UnSelect = "unselect"

class SelectInput(BaseModel):
    course_id: Optional[int] = Field(description="课程ID")
    op: CourseOp = Field(description="课程操作")

class SelectCourseTool(BaseTool):
    name = "select_course"
    description = "对指定课程进行选课和退课；如果课程已经选过的情况下选课，提醒用户不要重复选课；如果课程没有选过的情况下退课，提醒用户不要重复退课"
    args_schema: Type[BaseModel] = SelectInput
    session: Session
    student_id: int
    def _run(
        self, course_id: str, op: CourseOp, run_manager: Optional[CallbackManagerForToolRun] = None
    ) -> str:
        if op == CourseOp.Select:
            try:
                logic.select_course(session=self.session, course_id=course_id, student_id=self.student_id)
            except HTTPException as err:
                return err.detail
            return "OK"
        else:
            try:
                logic.unselect_course(session=self.session, course_id=course_id, student_id=self.student_id)
            except HTTPException as err:
                return err.detail
            return "OK"

    async def _arun(
        self, query: str, run_manager: Optional[AsyncCallbackManagerForToolRun] = None
    ) -> str:
        """Use the tool asynchronously."""
        raise NotImplementedError("custom_search does not support async")