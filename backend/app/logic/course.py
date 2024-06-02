from typing import Tuple
from app.models.models import Course, CourseOut, ListResp, Student
from app.crud import crud
from fastapi import HTTPException
import sqlalchemy
from sqlmodel import Session
from app.models.models import Comment, CommentQuery

def select_course(session: Session, course_id: int, student_id: int):
    course = crud.get(Course, session, course_id)
    if course is None:
        raise HTTPException(status_code=500, detail="Course not found")
    if course.current_capacity>=course.max_capacity:
        raise HTTPException(status_code=500, detail="课程已经选满了!")
    course.current_capacity+=1
    student = crud.get(Student, session, student_id)
    if student is None:
        raise HTTPException(status_code=500, detail="Student not found")
    course.students.append(student)
    session.add(course)
    try:
        session.commit()
    except sqlalchemy.exc.IntegrityError as e:
        session.rollback()
        raise HTTPException(status_code=500, detail="报错!课程已选过")
    session.refresh(course)
    return "OK"

def unselect_course(session: Session, course_id: int, student_id: int):
    course = crud.get(Course, session, course_id)
    if course is None:
        raise HTTPException(status_code=500, detail="Course not found")
    course.current_capacity-=1
    student = crud.get(Student, session, student_id)
    if student is None:
        raise HTTPException(status_code=500, detail="Student not found")
    try:
        course.students.remove(student)
    except ValueError as e:
        raise HTTPException(status_code=500, detail="报错!课程未选过!")
    session.add(course)
    try:
        session.commit()
    except sqlalchemy.exc.IntegrityError as e:
        session.rollback()
        raise HTTPException(status_code=500, detail="报错!课程未选过!")
    session.refresh(course)
    return "OK"

def get_course_list(session:Session, skip: int, limit: int) -> Tuple[list[CourseOut], int]:
    items, count = crud.list(Course, session, skip, limit)
    return [CourseOut(**item.dict()) for item in items], count

def get_course_comment_list(session:Session, course_id: int, skip: int, limit: int):
    items, count = crud.list(Comment, session, skip, limit, Comment.course_id==course_id)
    return items, count