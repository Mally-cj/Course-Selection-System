from typing import Any

# from app.models.models import CommentCourseLink
from app.models.models import EnrollmentList
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import func, select
from sqlalchemy import and_
from datetime import datetime

from app.api.deps import CurrentUser, SessionDep
from app.models import Comment, ListResp, CommentCreate, CommentUpdate, CommentwithStudent,Announcement,AnnouncementCreate,CourseUpdate,EnrollmentList
from app.models import Course
from app.crud import crud

router = APIRouter()




@router.post("/add", response_model=Announcement)
def create_announcements(
    session: SessionDep, current_user: CurrentUser, req: AnnouncementCreate
) -> Any:
    """
    新增公告
    """
    req.announcement_time=str(datetime.utcnow())
    coursedata=crud.get(Course, session, req.course_id)
    req.content=coursedata.name+"：\n"+req.content
    data = crud.create(Announcement, session, req)
    return data

@router.post("/addAndedit", response_model=Announcement)
def createAndedit_announcements(
    session: SessionDep, current_user: CurrentUser, req: AnnouncementCreate
) -> Any:
    """
    新增调课公告
    """
    req.announcement_time=str(datetime.utcnow())
    coursedata=crud.get(Course, session, req.course_id)
    req.content=coursedata.name+"：\n"+"上课时间已调整为："+req.course_time+"\n"+"上课地点已调整为："+req.course_location
    data = crud.create(Announcement, session, req)
    reqc = CourseUpdate(
        class_time=req.course_time,
        class_location=req.course_location,
        status=req.course_status
    )
    id=req.course_id
    data1 = crud.update(Course, session, id, reqc)
    return data



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

@router.get("/student/{student_id}", response_model=ListResp[Announcement])
def get_studentcourseannouncement(
    session: SessionDep, current_user: CurrentUser, student_id: int,skip: int = 0, limit: int = 100
) -> Any:
    """
    获取学生已选课程的公告
    """
    enroll_cond = (EnrollmentList.student_id == student_id)
    enrolled_courses, _couts = crud.list(EnrollmentList, session, skip=0, limit=1000, cond=enroll_cond)
    course_ids = [enrollment.course_id for enrollment in enrolled_courses]
    if not course_ids:
        return ListResp(data=[], count=0)
    announcement_cond = Announcement.course_id.in_(course_ids)
    items, count = crud.list(Announcement, session, skip, limit, announcement_cond)
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
