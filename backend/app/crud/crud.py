from typing import Any

from app.api.deps import SessionDep
from pydantic import BaseModel
from sqlmodel import Session, select, func

from app.core.security import get_password_hash, verify_password
from app.models import Item, ItemCreate, User, UserCreate, UserUpdate, Course, CourseCreate
from sqlmodel import SQLModel

def create_course(*, session: Session, course_in: CourseCreate, owner_id: int) -> Course:
    db_course = Course.model_validate(course_in, update={"owner_id": owner_id})
    session.add(db_course)
    session.commit()
    session.refresh(db_course)
    return db_course

from typing import TypeVar, Generic, Optional

T = TypeVar('T', bound=SQLModel)

def list(model: T, session: SessionDep, skip: int, limit: int, cond: dict| BaseModel = None) -> tuple[list[T], int]:
    count_statement = select(func.count()).select_from(model)
    count = session.exec(count_statement).one()
    statement = select(model).where(cond).offset(skip).limit(limit)
    items = session.exec(statement).all()
    return items, count

def create(model: T, session: Session, item_in: SQLModel) -> T:
    # db_item = model.model_validate(item_in, update={"owner_id": owner_id})
    db_item = model.model_validate(item_in)
    session.add(db_item)
    session.commit()
    session.refresh(db_item)
    return db_item

def get(model: T, session: Session, id: int) -> T:
    db_item = session.get(model, id)
    return db_item

def update(model: T, session: Session, id: int, param: SQLModel) -> T:
    db_item: T = session.get(model, id)
    db_item.sqlmodel_update(param.model_dump(exclude_unset=True))
    session.add(db_item)
    session.commit()
    session.refresh(db_item)
    return db_item

def delete(model: T, session: Session, id: int) -> T:
    db_item = session.get(model, id)
    session.delete(db_item)
    session.commit()
    return db_item