from typing import Any

# from app.models.models import CommentCourseLink
from app.models.models import EnrollmentList
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import func, select
from sqlalchemy import and_
from datetime import datetime

from app.api.deps import CurrentUser, SessionDep
from app.models import Comment, ListResp, CommentCreate, CommentUpdate, CommentwithStudent,Announcement,AnnouncementCreate
from app.models import Course
from app.crud import crud

router = APIRouter()


@router.get("/course/{course_id}", response_model=ListResp[Announcement])
def get_courseannouncement(
    session: SessionDep, current_user: CurrentUser, course_id: int,skip: int = 0, limit: int = 100
) -> Any:
    """
    获取课程的全部公告
    """
    cond = and_(Announcement.course_id == course_id)
    items, count = crud.list(Announcement, session, skip, limit,cond)
    return ListResp(data=items, count=count)

@router.get("/", response_model=ListResp[Announcement])
def list_announcement(
    session: SessionDep, current_user: CurrentUser, skip: int = 0, limit: int = 100
) -> Any:
    """
    无条件获取全部公告
    """
    
    items, count = crud.list(Announcement, session, skip, limit)
    return ListResp(data=items, count=count)

@router.post("/add", response_model=Announcement)
def create_announcements(
    session: SessionDep, current_user: CurrentUser, req: AnnouncementCreate
) -> Any:
    """
    新增公告
    """
    # print(datetime.utcnow())
    # req.announcement_time = datetime.utcnow()
    # reqdata = {
    #     "course_id": req.course_id,
    #     "content": req.content,
    #     "announcement_time": datetime.utcnow(),
    # }
    req_data = Announcement(
        course_id=req.course_id,
        content=req.content,
        announcement_time=datetime.utcnow(),
        # course_location=req.course_location,
        # course_time=req.course_time,
        # course_status=req.course_status
    )
    data = crud.create(Announcement, session, req_data)
    return data


@router.put("/{id}", response_model=Announcement)
def update_announcement(
    session: SessionDep, current_user: CurrentUser, id: int, req: CommentUpdate
) -> Any:
    """
    更新评价
    """
    data = crud.update(Announcement, session, id, req)
    return data

@router.delete("/{id}", response_model=Announcement)
def delete_announcement(
    session: SessionDep, current_user: CurrentUser, id: int
) -> Any:
    """
    删除评价
    """
    data = crud.delete(Announcement, session, id)
    return data
