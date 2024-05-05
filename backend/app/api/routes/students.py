from typing import Any

# from app.models.models import StudentCourseLink
from app.models.models import EnrollmentList
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import func, select

from app.api.deps import CurrentUser, SessionDep
from app.models import Student, ListResp, StudentCreate, StudentUpdate
from app.models import Course
from app.crud import crud

router = APIRouter()

@router.get("/", response_model=ListResp[Student])
def list_students(
    session: SessionDep, current_user: CurrentUser, skip: int = 0, limit: int = 100
) -> Any:
    """
    获取学生
    """
    
    items, count = crud.list(Student, session, skip, limit)
    return ListResp(data=items, count=count)

@router.post("/", response_model=Student)
def create_students(
    session: SessionDep, current_user: CurrentUser, req: StudentCreate
) -> Any:
    """
    获取学生
    """
    data = crud.create(Student, session, req)
    return data

@router.get("/{id}", response_model=Student)
def get_student(
    session: SessionDep, current_user: CurrentUser, id: int
) -> Any:
    """
    获取学生
    """
    data = crud.get(Student, session, id)
    return data

@router.put("/{id}", response_model=Student)
def update_student(
    session: SessionDep, current_user: CurrentUser, id: int, req: StudentUpdate
) -> Any:
    """
    获取学生
    """
    data = crud.update(Student, session, id, req)
    return data

@router.delete("/{id}", response_model=Student)
def delete_student(
    session: SessionDep, current_user: CurrentUser, id: int
) -> Any:
    """
    获取学生
    """
    data = crud.delete(Student, session, id)
    return data

@router.get("/{id}/courses", response_model=ListResp[Course])
def list_student_courses(
    session: SessionDep, current_user: CurrentUser, id: int, skip: int = 0, limit: int = 100,
) -> Any:
    """
    获取学生
    """
    statement = select(Course).where(EnrollmentList.student_id == id, Course.id == EnrollmentList.course_id).offset(skip).limit(limit)
    items = session.exec(statement).all()
    count_statement = select(func.count()).select_from(Course).where(Student.id == id)
    count = session.exec(count_statement).one()
    return ListResp(data=items, count=count)