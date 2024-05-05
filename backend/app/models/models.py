from sqlmodel import Field, Relationship, SQLModel
from pydantic import BaseModel
import enum
# Shared properties
# TODO replace email str with EmailStr when sqlmodel supports it

# 教师表
class Teacher(SQLModel, table=True):
    id: int = Field(primary_key=True)
    name: str

# 学生表
class Student(SQLModel, table=True):
    id: int = Field(primary_key=True)
    student_id: str
    name: str

# 课程表
class Course(SQLModel, table=True):
    id: int = Field(primary_key=True)
    teacher_id: int = Field(foreign_key="teacher.id")
    teacher_name: str
    name: str
    textbook: str
    description: str
    class_time: str
    class_location: str
    enrollment_list_id: int = Field(foreign_key="enrollment_list.id")
    announcement_id: int = Field(foreign_key="announcement.id")
    comment_id: int = Field(foreign_key="comment.id")
    status: str

# 选课名单表
class EnrollmentList(SQLModel, table=True):
    id: int = Field(primary_key=True)
    course_id: int = Field(foreign_key="course.id")
    course_name: str
    student_id: int = Field(foreign_key="student.id")
    student_student_id: str
    student_name: str
    max_capacity: int
    current_capacity: int

# 课程公告表
class Announcement(SQLModel, table=True):
    id: int = Field(primary_key=True)
    course_id: int = Field(foreign_key="course.id")
    course_name: str
    content: str
    announcement_time: str

# 课程评论表
class Comment(SQLModel, table=True):
    id: int = Field(primary_key=True)
    course_id: int = Field(foreign_key="course.id")
    course_name: str
    student_id: int = Field(foreign_key="student.id")
    student_student_id: str
    student_name: str
    content: str

class CourseCreate(Course):
    textbook: str | None = None  # type: ignore
    description: str | None = None  # type: ignore

class CourseOut(Course):
    pass

class CoursesOut(SQLModel):
    data: list[CourseOut]
    count: int

class CourseUpdate(Course):
    textbook: str | None = None  # type: ignore
    description: str | None = None  # type: ignore

class StudentCreate(Student):
    pass

class StudentUpdate(Student):
    pass

class TeacherCreate(Teacher):
    pass

class TeacherUpdate(Teacher):
    pass
# class StudentCourseLink(SQLModel, table=True):
#     course_id: int = Field(foreign_key="course.id", primary_key=True)
#     student_id: int = Field(foreign_key="student.id", primary_key=True)

# class TeacherCourseLink(SQLModel, table=True):
#     course_id: int | None = Field(default=None, foreign_key="course.id", primary_key=True)
#     teacher_id: int | None = Field(default=None, foreign_key="teacher.id", primary_key=True)


# class CourseBase(SQLModel):
#     name: str
#     description: str | None = None
    
# class Course(CourseBase, table=True):
#     id: int | None = Field(default=None, primary_key=True)
#     students: list["Student"] = Relationship(back_populates="courses", link_model=StudentCourseLink)
#     teachers: list["Teacher"] = Relationship(back_populates="courses", link_model=TeacherCourseLink)

# class CourseQuery(CourseBase):
#     student_id: int
    
    
# class CourseCreate(CourseBase):
#     name : str | None = None

# class CourseSelect(BaseModel):
#     course_id: int
#     student_id: int

# class CourseUpdate(CourseBase):
#     pass

# class StudentBase(SQLModel):
#     name: str
#     email: str
    
# class Student(StudentBase, table=True):
#     id: int | None = Field(default=None, primary_key=True)
#     # course_id: int = ForeignKey('course.id')
#     courses: list["Course"] = Relationship(back_populates="students", link_model=StudentCourseLink)
#     user: "User" = Relationship(back_populates="student")

# class StudentCreate(StudentBase):
#     pass

# class StudentUpdate(StudentBase):
#     pass

# class TeacherBase(SQLModel):
#     name: str
#     email: str

# class Teacher(SQLModel, table=True):
#     id: int | None = Field(default=None, primary_key=True)
#     # course_id: int = ForeignKey('course.id')
#     courses: list["Course"] = Relationship(back_populates="teachers", link_model=TeacherCourseLink)
#     user: "User" = Relationship(back_populates="teacher")

# class TeacherCreate(TeacherBase):
#     pass

# class TeacherUpdate(TeacherBase):
#     pass
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
