from typing import Any

from app.models.models import CourseSelect
from fastapi import APIRouter, HTTPException
import sqlalchemy
from sqlmodel import func, select

from app.api.deps import CurrentUser, SessionDep
from app.models import Course, ListResp, CourseCreate, CourseUpdate, CourseOut, EnrollmentList, EnrollmentOut
from app.models import Student
from app.crud import crud
from app.crud import course

router = APIRouter()


@router.get("/teachercourse", response_model=ListResp[CourseOut])
def list_teachercourses(
    session: SessionDep, current_user: CurrentUser, skip: int = 0, limit: int = 100
) -> Any:
    """
    获取教师的课程
    """
    items, count = course.list_byteacher(Course, session,current_user.teacher_id, skip, limit)
    return ListResp(data=items, count=count)

@router.get("/", response_model=ListResp[CourseOut])
def list_courses(
    session: SessionDep, current_user: CurrentUser, skip: int = 0, limit: int = 100
) -> Any:
    """
    获取所有的课程
    """
    items, count = crud.list(Course, session, skip, limit)
    return ListResp(data=items, count=count)

@router.post("/add", response_model=Course)
def create_courses(
    session: SessionDep, current_user: CurrentUser, req: CourseCreate
) -> Any:
    """
    添加课程课程
    """
    req.teacher_id=current_user.teacher_id
    data = crud.create(Course, session, req)
    return data

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

@router.post("/select")
def select_course(
    session: SessionDep, current_user: CurrentUser, req: CourseSelect
) -> Any:
    """
    获取课程
    """
    course = crud.get(Course, session, req.course_id)
    if course is None:
        raise HTTPException(status_code=200, detail="Course not found")
    student = crud.get(Student, session, req.student_id)
    if student is None:
        raise HTTPException(status_code=200, detail="Student not found")
    course.students.append(student)
    session.add(course)
    try:
        session.commit()
    except sqlalchemy.exc.IntegrityError as e:
        raise HTTPException(status_code=500, detail="Course Already selected")
    session.refresh(course)
    
    return "OK"


@router.get("/getenrollmentlist/{course_id}", response_model=ListResp[EnrollmentOut])
def getenrollmentlist(
    session: SessionDep, current_user: CurrentUser, course_id: int,skip: int = 0, limit: int = 100
) -> Any:
    """
    获取课程报名名单
    """
    items, count = course.getenrollmentlist_bycourseid(EnrollmentOut, session, course_id,skip,limit)
    return ListResp(data=items, count=count)
