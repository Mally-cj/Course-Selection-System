from typing import Any

from fastapi import APIRouter, HTTPException
from sqlmodel import func, select

from app.api.deps import CurrentUser, SessionDep
from app.models import Teacher, ListResp, TeacherCreate, TeacherUpdate
from app.crud import crud

router = APIRouter()

@router.get("/", response_model=ListResp[Teacher])
def list_teacher(
    session: SessionDep, current_user: CurrentUser, skip: int = 0, limit: int = 100
) -> Any:
    """
    获取教师
    """
    items, count = crud.list(Teacher, session, skip, limit)
    return ListResp(data=items, count=count)

@router.post("/", response_model=Teacher)
def create_teacher(
    session: SessionDep, current_user: CurrentUser, req: TeacherCreate
) -> Any:
    """
    获取教师
    """
    data = crud.create(Teacher, session, req)
    return data

@router.get("/{id}", response_model=Teacher)
def get_teacher(
    session: SessionDep, current_user: CurrentUser, id: int
) -> Any:
    """
    获取教师
    """
    data = crud.get(Teacher, session, id)
    return data

@router.put("/{id}", response_model=Teacher)
def update_teacher(
    session: SessionDep, current_user: CurrentUser, id: int, req: TeacherUpdate
) -> Any:
    """
    获取教师
    """
    data = crud.update(Teacher, session, id, req)
    return data

@router.delete("/{id}", response_model=Teacher)
def delete_teacher(
    session: SessionDep, current_user: CurrentUser, id: int
) -> Any:
    """
    获取教师
    """
    data = crud.delete(Teacher, session, id)
    return data