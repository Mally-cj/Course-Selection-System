from sqlmodel import Field, Relationship, SQLModel, ForeignKey
from pydantic import BaseModel
from typing import Optional
from typing import List

import enum
# Shared properties
# TODO replace email str with EmailStr when sqlmodel supports it


class EnrollmentListbase(SQLModel):
    course_id: int = Field(foreign_key="course.id", primary_key=True)
    student_id: int = Field(foreign_key="student.id", primary_key=True)
    

class EnrollmentList(EnrollmentListbase, table=True):
    student: "Student" = Relationship(back_populates="enrollment_list")
    

class EnrollmentOut(EnrollmentListbase):
    student: Optional["Student"] = None

class TeacherCourseLink(SQLModel, table=True):
    course_id: int | None = Field(default=None, foreign_key="course.id", primary_key=True)
    teacher_id: int | None = Field(default=None, foreign_key="teacher.id", primary_key=True)


# 课程公告表
class Announcement(SQLModel, table=True):
    id: int = Field(primary_key=True)
    course_id: int = Field(foreign_key="course.id")
    course: "Course" = Relationship(back_populates="announcements")
    content: str
    announcement_time: str

# 课程评论表
class CommentBase(SQLModel):
    course_id: int = Field(foreign_key="course.id")
    student_id: int = Field(foreign_key="student.id")
    content: str
    
class Comment(CommentBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    course: "Course" = Relationship(back_populates="comments")
    student: "Student" = Relationship(back_populates="comments")

class CommentCreate(CommentBase):
    pass

class CommentUpdate(CommentBase):
    pass

class CourseBase(SQLModel):
    id: int | None = Field(default=None, primary_key=True)
    name: str
    textbook: str
    description: str | None = None
    class_time: str
    class_location: str
    teacher_id: int | None = Field(foreign_key="teacher.id", default=None)
    status: str
    max_capacity: int | None = 0
    current_capacity: int | None = 0

class Course(CourseBase, table=True):
    teacher: "Teacher" = Relationship(back_populates="courses")
    # enrollment_list_id: int = Field(foreign_key="enrollment_list.id")
    # announcement_id: int = Field(foreign_key="announcement.id")
    announcements: list["Announcement"] = Relationship(back_populates="course")
    comments: list["Comment"] = Relationship(back_populates="course")
    # comment_id: int = Field(foreign_key="comment.id")
    students: list["Student"] = Relationship(back_populates="courses", link_model=EnrollmentList)
    
class CourseOut(CourseBase):
    teacher: Optional["Teacher"] = None

class CourseQuery(BaseModel):
    student_id: int
    
    
class CourseCreate(CourseBase):
    name : str | None = None

class CourseSelect(BaseModel):
    course_id: int
    student_id: int

class CourseUpdate(CourseBase):
    pass

class StudentBase(SQLModel):
    name: str | None = None
    student_id: str 
    email: str
    major: str
    classLocation: str
    
    
class Student(StudentBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    comments: list["Comment"] = Relationship(back_populates="student")
    # course_id: int = ForeignKey('course.id')
    courses: list["Course"] = Relationship(back_populates="students", link_model=EnrollmentList)
    user: "User" = Relationship(back_populates="student")
    enrollment_list: list["EnrollmentList"] = Relationship(back_populates="student")



class StudentCreate(StudentBase):
    pass

class StudentUpdate(StudentBase):
    pass
class StudentCreateList(SQLModel):
    students: List[StudentCreate]
class TeacherBase(SQLModel):
    name: str
    email: str | None = None
    title: str| None = None
    college: str| None = None

class Teacher(TeacherBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    # course_id: int = ForeignKey('course.id')
    courses: list["Course"] = Relationship(back_populates="teacher")
    user: "User" = Relationship(back_populates="teacher")

class TeacherCreate(TeacherBase):
    pass

class TeacherUpdate(TeacherBase):
    pass
class UserType(int, enum.Enum):
    admin = 1
    student = 2
    teacher = 3
    
class UserBase(SQLModel):
    email: str = Field(unique=True, index=True)
    is_active: bool = True
    is_superuser: bool = False
    full_name: str | None = None
    student_id: int | None = Field(default=None, foreign_key="student.id")
    teacher_id: int | None = Field(default=None, foreign_key="teacher.id")
    user_type: UserType
    
# Properties to receive via API on creation
class UserCreate(UserBase):
    password: str


# TODO replace email str with EmailStr when sqlmodel supports it
class UserCreateOpen(SQLModel):
    email: str
    password: str
    full_name: str | None = None


# Properties to receive via API on update, all are optional
# TODO replace email str with EmailStr when sqlmodel supports it
class UserUpdate(UserBase):
    email: str | None = None  # type: ignore
    password: str | None = None


# TODO replace email str with EmailStr when sqlmodel supports it
class UserUpdateMe(SQLModel):
    full_name: str | None = None
    email: str | None = None


class UpdatePassword(SQLModel):
    current_password: str
    new_password: str


# Database model, database table inferred from class name
class User(UserBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    hashed_password: str
    items: list["Item"] = Relationship(back_populates="owner")
    student: Student | None = Relationship(back_populates="user")
    teacher: Teacher | None = Relationship(back_populates="user")


# Properties to return via API, id is always required
class UserOut(UserBase):
    id: int
    student: Student | None = Field(default=None)
    teacher: Teacher | None = Field(default=None)
    
# Shared properties
class ItemBase(SQLModel):
    title: str
    description: str | None = None


# Properties to receive on item creation
class ItemCreate(ItemBase):
    title: str


# Properties to receive on item update
class ItemUpdate(ItemBase):
    title: str | None = None  # type: ignore


# Database model, database table inferred from class name
class Item(ItemBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    title: str
    owner_id: int | None = Field(default=None, foreign_key="user.id", nullable=False)
    owner: User | None = Relationship(back_populates="items")


# Properties to return via API, id is always required
class ItemOut(ItemBase):
    id: int
    owner_id: int


class ItemsOut(SQLModel):
    data: list[ItemOut]
    count: int

from typing import TypeVar, Generic, Optional

T = TypeVar('T')

class ListResp(BaseModel, Generic[T]):
    data: Optional[list[T]] = None
    count: int

# Generic message
class Message(SQLModel):
    message: str


# JSON payload containing access token
class Token(SQLModel):
    access_token: str
    token_type: str = "bearer"


# Contents of JWT token
class TokenPayload(SQLModel):
    sub: int | None = None


class NewPassword(SQLModel):
    token: str
    new_password: str
