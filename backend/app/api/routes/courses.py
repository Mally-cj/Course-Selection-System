from typing import Any

from fastapi import APIRouter, HTTPException
from sqlmodel import func, select

from app.api.deps import CurrentUser, SessionDep
from app.models import Course, ListResp, CourseCreate, CourseUpdate

from app.crud import crud

router = APIRouter()

@router.get("/", response_model=ListResp[Course])
def list_courses(
    session: SessionDep, current_user: CurrentUser, skip: int = 0, limit: int = 100
) -> Any:
    """
    获取课程
    """
    items, count = crud.list(Course, session, skip, limit)
    return ListResp(data=items, count=count)

@router.post("/", response_model=Course)
def create_courses(
    session: SessionDep, current_user: CurrentUser, req: CourseCreate
) -> Any:
    """
    获取课程
    """
    
    # current_user.id

    data = crud.create(Course, session, req)
    return data
    # return ListResp(data=items, count=count)

@router.get("/{id}", response_model=Course)
def get_course(
    session: SessionDep, current_user: CurrentUser, id: int
) -> Any:
    """
    获取课程
    """
    data = crud.get(Course, session, id)
    return data

@router.put("/{id}", response_model=Course)
def update_course(
    session: SessionDep, current_user: CurrentUser, id: int, req: CourseUpdate
) -> Any:
    """
    获取课程
    """
    data = crud.update(Course, session, id, req)
    return data

@router.delete("/{id}", response_model=Course)
def delete_course(
    session: SessionDep, current_user: CurrentUser, id: int
) -> Any:
    """
    获取课程
    """
    data = crud.delete(Course, session, id)
    return data