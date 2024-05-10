from typing import Any

# from app.models.models import CommentCourseLink
from app.models.models import EnrollmentList
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import func, select
from sqlalchemy import and_

from app.api.deps import CurrentUser, SessionDep
from app.models import Comment, ListResp, CommentCreate, CommentUpdate, CommentwithStudent
from app.models import Course
from app.crud import crud

router = APIRouter()


@router.get("/course/{course_id}", response_model=ListResp[CommentwithStudent])
def get_coursecomments(
    session: SessionDep, current_user: CurrentUser, course_id: int,skip: int = 0, limit: int = 100
) -> Any:
    """
    获取课程的全部评价
    """
    cond = and_(Comment.course_id == course_id)
    items, count = crud.list(Comment, session, skip, limit,cond)
    return ListResp(data=items, count=count)

@router.get("/", response_model=ListResp[Comment])
def list_comments(
    session: SessionDep, current_user: CurrentUser, skip: int = 0, limit: int = 100
) -> Any:
    """
    获取评价
    """
    
    items, count = crud.list(Comment, session, skip, limit)
    return ListResp(data=items, count=count)

@router.post("/", response_model=Comment)
def create_comments(
    session: SessionDep, current_user: CurrentUser, req: CommentCreate
) -> Any:
    """
    获取评价
    """
    data = crud.create(Comment, session, req)
    return data

@router.get("/one/{id}", response_model=CommentwithStudent)
def get_student(
    session: SessionDep, current_user: CurrentUser, id: int
) -> Any:
    """
    获取评价
    """
    data = crud.get(Comment, session, id)
    return data

@router.put("/{id}", response_model=Comment)
def update_student(
    session: SessionDep, current_user: CurrentUser, id: int, req: CommentUpdate
) -> Any:
    """
    获取评价
    """
    data = crud.update(Comment, session, id, req)
    return data

@router.delete("/{id}", response_model=Comment)
def delete_student(
    session: SessionDep, current_user: CurrentUser, id: int
) -> Any:
    """
    获取评价
    """
    data = crud.delete(Comment, session, id)
    return data
