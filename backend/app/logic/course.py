from app.models.models import Course, Student
from app.crud import crud
from fastapi import HTTPException
import sqlalchemy
from sqlmodel import Session


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