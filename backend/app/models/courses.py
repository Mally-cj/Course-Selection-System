from sqlmodel import Field, Relationship, ForeignKey, SQLModel

class CourseBase(SQLModel):
    name: str
    description: str | None = None

class StudentCourseLink(SQLModel, table=True):
    course_id: int | None = Field(default=None, foreign_key="course.id", primary_key=True)
    student_id: int | None = Field(default=None, foreign_key="student.id", primary_key=True)

class TeacherCourseLink(SQLModel, table=True):
    course_id: int | None = Field(default=None, foreign_key="course.id", primary_key=True)
    teacher_id: int | None = Field(default=None, foreign_key="teacher.id", primary_key=True)

class Course(CourseBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    students: list["Student"] = Relationship(back_populates="courses", link_model=StudentCourseLink)
    teachers: list["Teacher"] = Relationship(back_populates="courses", link_model=TeacherCourseLink)

class CourseCreate(CourseBase):
    pass

class CourseUpdate(CourseBase):
    pass
    
class Student(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str
    email: str
    # course_id: int = ForeignKey('course.id')
    courses: list[Course] = Relationship(back_populates="students", link_model=StudentCourseLink)

class Teacher(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str
    email: str
    # course_id: int = ForeignKey('course.id')
    courses: list[Course] = Relationship(back_populates="teachers", link_model=TeacherCourseLink)
