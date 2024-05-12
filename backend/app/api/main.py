from fastapi import APIRouter

from app.api.routes import items, login, users, utils, courses, students, teachers, comments,announcements

api_router = APIRouter()
api_router.include_router(login.router, tags=["login"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(utils.router, prefix="/utils", tags=["utils"])
api_router.include_router(items.router, prefix="/items", tags=["items"])
api_router.include_router(courses.router, prefix="/courses", tags=["courses"])
api_router.include_router(teachers.router, prefix="/teachers", tags=["teachers"])
api_router.include_router(students.router, prefix="/students", tags=["students"])
api_router.include_router(comments.router, prefix="/comments", tags=["comments"])
api_router.include_router(announcements.router, prefix="/announcements", tags=["announcements"])
