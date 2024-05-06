from typing import Any

# from app.models.models import CommentCourseLink
from app.models.models import EnrollmentList
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import func, select

from app.api.deps import CurrentUser, SessionDep
from app.models import Comment, ListResp, CommentCreate, CommentUpdate
from app.models import Course
from app.crud import crud

router = APIRouter()

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

@router.get("/{id}", response_model=Comment)
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
