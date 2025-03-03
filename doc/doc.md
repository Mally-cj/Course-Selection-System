## 运行
```shell
cd backend
make dev
```

```shell
cd frontend
npm run dev
```

## 代码结构
### 后端代码
```shell
.
├── Dockerfile #构建docker镜像用
├── Makefile   # makefile，用于执行一些快捷命令
├── README.md
├── __init__.py
├── alembic.ini # 数据库版本控制工具配置
├── app # 应用主目录
│   ├── __init__.py
│   ├── __pycache__
│   │   ├── __init__.cpython-310.pyc
│   │   ├── crud.cpython-310.pyc
│   │   ├── main.cpython-310.pyc
│   │   ├── models.cpython-310.pyc
│   │   └── utils.cpython-310.pyc
│   ├── alembic   # alembic 版本文件，每次进行make migrate就会生成一个version文件，并将其应用到数据库
│   │   ├── README
│   │   ├── env.py
│   │   ├── script.py.mako
│   │   └── versions
│   │       ├── 15643a9a9382_update.py
│   │       ├── 1bcf787bbaac_update.py
│   │       ├── 29500158e0aa_update.py
│   │       ├── 58b4e9d0d1e5_update.py
│   │       ├── 5c9b813705ff_init.py
│   │       ├── 6995af1ccc5a_update.py
│   │       ├── 6a9a00ac26a9_update.py
│   │       ├── 70647fac3f53_update.py
│   │       ├── 9ccbc29d4e0f_update.py
│   │       ├── aba0365ee16e_update.py
│   │       ├── ac737ce6b0b2_update.py
│   │       ├── b33884197731_update.py
│   │       ├── c86ae941c3c1_update.py
│   │       ├── e0b127e18040_update.py
│   │       ├── e2412789c190_initialize_models.py
│   │       ├── ed8dfc30bee5_update.py
│   │       ├── edb180a7ac5d_update.py
│   │       ├── f230b2016474_update.py
│   │       ├── f89ead0acdf6_update.py
│   │       └── f904aba27e17_update.py
│   ├── api # 业务逻辑的主要实现在此
│   │   ├── __init__.py
│   │   ├── __pycache__
│   │   │   ├── __init__.cpython-310.pyc
│   │   │   ├── deps.cpython-310.pyc
│   │   │   └── main.cpython-310.pyc
│   │   ├── deps.py
│   │   ├── main.py
│   │   └── routes
│   │       ├── __init__.py
│   │       ├── __pycache__
│   │       │   ├── __init__.cpython-310.pyc
│   │       │   ├── items.cpython-310.pyc
│   │       │   ├── login.cpython-310.pyc
│   │       │   ├── users.cpython-310.pyc
│   │       │   └── utils.cpython-310.pyc
│   │       ├── courses.py
│   │       ├── items.py
│   │       ├── login.py
│   │       ├── students.py
│   │       ├── teachers.py
│   │       ├── users.py
│   │       └── utils.py
│   ├── backend_pre_start.py
│   ├── core # 一些核心函数
│   │   ├── __init__.py
│   │   ├── __pycache__
│   │   │   ├── __init__.cpython-310.pyc
│   │   │   ├── config.cpython-310.pyc
│   │   │   ├── db.cpython-310.pyc
│   │   │   └── security.cpython-310.pyc
│   │   ├── config.py # 配置文件
│   │   ├── db.py # 数据库配置
│   │   └── security.py
│   ├── crud # 数据库操作，增删改查
│   │   ├── course.py  # 课程相关额外的增删改查函数，当通用不能满足需求时使用
│   │   ├── crud.py # 通用增删改查函数
│   │   ├── item.py
│   │   └── user.py
│   ├── email-templates
│   │   ├── build
│   │   │   ├── new_account.html
│   │   │   ├── reset_password.html
│   │   │   └── test_email.html
│   │   └── src
│   │       ├── new_account.mjml
│   │       ├── reset_password.mjml
│   │       └── test_email.mjml
│   ├── initial_data.py
│   ├── main.py # 主函数
│   ├── models # 模型文件，用于定义数据库模型，以及请求响应的结构体
│   │   ├── __init__.py
│   │   └── models.py
│   ├── tests # 测试目录，暂未用到
│   │   ├── __init__.py
│   │   ├── api
│   │   │   ├── __init__.py
│   │   │   └── routes
│   │   │       ├── __init__.py
│   │   │       ├── test_items.py
│   │   │       ├── test_login.py
│   │   │       └── test_users.py
│   │   ├── conftest.py
│   │   ├── crud
│   │   │   ├── __init__.py
│   │   │   └── test_user.py
│   │   ├── scripts
│   │   │   ├── __init__.py
│   │   │   ├── test_backend_pre_start.py
│   │   │   └── test_test_pre_start.py
│   │   └── utils
│   │       ├── __init__.py
│   │       ├── item.py
│   │       ├── user.py
│   │       └── utils.py
│   ├── tests_pre_start.py
│   └── utils.py
├── poetry.lock
├── prestart.sh
├── pyproject.toml # poetry项目配置文件
├── scripts
│   ├── format-imports.sh
│   ├── format.sh
│   ├── lint.sh
│   └── test.sh
└── tests-start.sh
```
### 前端代码
```shell
.
├── assets # 一些静态文件
│   └── images
│       ├── fastapi-logo.svg
│       └── favicon.png
├── client # 后端接口调用代码，由bash update-client.sh生成
│   ├── core
│   │   ├── ApiError.ts
│   │   ├── ApiRequestOptions.ts
│   │   ├── ApiResult.ts
│   │   ├── CancelablePromise.ts
│   │   ├── OpenAPI.ts
│   │   └── request.ts
│   ├── index.ts
│   ├── models
│   │   ├── Body_login_login_access_token.ts
│   │   ├── Course.ts
│   │   ├── CourseCreate.ts
│   │   ├── .......
│   │   └── enrollmentlist.ts
│   ├── schemas
│   │   ├── $Body_login_login_access_token.ts
│   │   ├── $UserOut.ts
│   │   ├── $UserType.ts
│   │   ├── $UserUpdate.ts
│   │   ├── ........
│   │   └── $ValidationError.ts
│   └── services
│       ├── CoursesService.ts
│       ├── ItemsService.ts
│       ├── ........
│       └── UtilsService.ts
├── components # 页面组件，按页面进行分类存放
│   ├── Admin # admin页面相关页面
│   │   ├── AddUser.tsx
│   │   └── EditUser.tsx
│   ├── Common # 公共组件
│   │   ├── ActionsMenu.tsx # 页面上方的动作按钮
│   │   ├── DeleteAlert.tsx # 删除警告框
│   │   ├── Navbar.tsx
│   │   ├── NotFound.tsx # 404 页面
│   │   ├── Rebackbar.tsx
│   │   ├── Sidebar.tsx # 侧边栏
│   │   ├── SidebarItems.tsx # 侧边栏，里面定义菜单
│   │   └── UserMenu.tsx
│   ├── Courses # 课程相关的页面
│   │   ├── AddItem.tsx
│   │   ├── Addcourse.tsx
│   │   ├── EditCourse.tsx
│   │   ├── EditItem.tsx
│   │   └── Returncourse.tsx
│   ├── Items
│   │   ├── AddItem.tsx
│   │   └── EditItem.tsx
│   └── UserSettings # 用户设置相关页面
│       ├── Appearance.tsx
│       ├── ChangePassword.tsx
│       ├── DeleteAccount.tsx
│       ├── DeleteConfirmation.tsx
│       └── UserInformation.tsx
├── hooks # 一些钩子
│   ├── useAuth.ts
│   └── useCustomToast.ts
├── main.tsx # 程序入口
├── routeTree.gen.ts # 自动生成的路由配置，会根据routes/_layout下的文件自动生成
├── routes # 路由配置
│   ├── __root.tsx
│   ├── _layout # 下边的每个文件名会作为一个页面，其路径path为文件名
│   │   ├── admin.tsx
│   │   ├── course-student.tsx
│   │   ├── courses-selection.tsx
│   │   ├── courses.tsx
│   │   ├── index.tsx
│   │   ├── items.tsx
│   │   ├── my-courses.tsx
│   │   ├── settings.tsx
│   │   ├── student-management.tsx
│   │   └── teacher-management.tsx
│   ├── _layout.tsx
│   ├── login.tsx # 登录页
│   ├── recover-password.tsx # 恢复密码页
│   └── reset-password.tsx # 重设密码页
├── theme.tsx
└── vite-env.d.ts
```
## 如何新加一个数据库
后端使用sqlmodel作为orm框架

在backend/app/models中添加模型即可，以Course为例
```python
class CourseBase(SQLModel):
    id: int | None = Field(default=None, primary_key=True) # 定义主键
    name: str # 一个字符串类型的数据表字段，名字为name，默认是必选字段
    textbook: str
    description: str | None = None # 一个字符串类型的数据表字段description，是可选的
    class_time: str
    class_location: str
    teacher_id: int | None = Field(foreign_key="teacher.id", default=None) # 一个int类型的字段，并通过外键关联到teacher.id, 是可选的
    status: str
    max_capacity: int | None = 0
    current_capacity: int | None = 0

# 定义一个Course表，table=True表示这是一个表；继承了CourseBase的字段
class Course(CourseBase, table=True):
    teacher: "Teacher" = Relationship(back_populates="courses")
    # enrollment_list_id: int = Field(foreign_key="enrollment_list.id")
    # announcement_id: int = Field(foreign_key="announcement.id")
    announcements: list["Announcement"] = Relationship(back_populates="course")
    comments: list["Comment"] = Relationship(back_populates="course")
    # comment_id: int = Field(foreign_key="comment.id")
    students: list["Student"] = Relationship(back_populates="courses", link_model=EnrollmentList)

# 用于响应体中的Course结构
class CourseOut(CourseBase):
    teacher: Optional["Teacher"] = None

# 查询课程请求体
class CourseQuery(BaseModel):
    student_id: int


# 创建课程请求体
class CourseCreate(CourseBase):
    name : str | None = None

# 选课请求体
class CourseSelect(BaseModel):
    course_id: int
    student_id: int

# 更新课程请求体
class CourseUpdate(CourseBase):
    pass

```

> Course不能直接被继承，因为会将table=True传递，创建多个表，因此将公共字段提取到Base中，后续请求体，响应体，表定义都继承自Base

## 如何新加一个接口
以Course为例子

以上添加了Course的数据库模型

在backend/app/api/routes/courses.py中有如下代码，可以实现课程的增删改查
```
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
    更新课程
    """
    data = crud.update(Course, session, id, req)
    return data

@router.delete("/{id}", response_model=Course)
def delete_course(
    session: SessionDep, current_user: CurrentUser, id: int
) -> Any:
    """
    删除课程
    """
    data = crud.delete(Course, session, id)
    return data
```

> crud.list/delete/update/get/create 为通用的增删改查函数，没有特殊逻辑的情况下可以调用这些方法使用增删改查功能

然后在backend/app/api/main.py中添加路由
```python
from fastapi import APIRouter

from app.api.routes import courses

api_router = APIRouter()

...

api_router.include_router(items.router, prefix="/course", tags=["course"])

```


比如要实现获取教师id为1的课程,也可以直接用上边的list_course接口
```
GET /api/v1/course?teacher_id=1
```