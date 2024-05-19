import { Box, Container, Heading, Text } from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"
import { Button, Table, Typography, Space } from "antd"
import { useQuery, useQueryClient } from "react-query"
import { ApiError, CourseOut, CoursesService, StudentsService, UserOut } from "../../client"
import CourseTable from '../../components/Courses/CourseTable';

import "../layout.css"
export const Route = createFileRoute("/_layout/courses-selection-table")({
  component: CourseSelectTable,
})

function CourseSelectTable() {
    const queryClient = useQueryClient()

    const currentUser = queryClient.getQueryData<UserOut>("currentUser")

    const {
        data: courses,
        isLoading,
        isError,
        error,
      } = useQuery("courses", () => StudentsService.studentsListStudentCourses({
        id: currentUser?.student_id || 0
      }))

    const columns = [
        {
            title: '课程编号',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '课程名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '课程时间',
            dataIndex: 'class_time',
            key: 'class_time',
        },
        {
            title: '授课老师',
            dataIndex: ["teacher", "name"],
            key: 'teacher.name',
        },
        {
            title: '课程人数',
            dataIndex: '',
            key: 'max_capacity',
            render: (text, record, index) => {
                return `${record.current_capacity}/${record.max_capacity}`
            }
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (item: CourseOut) =>
                <Space size="middle">
                    <Typography.Link onClick={
                    async () => {
                        let resp = null;
                        try {
                            resp = await CoursesService.coursesSelectCourse({requestBody: {
                                course_id: item.id || 0,
                                student_id: currentUser?.student_id || 0
                            }})
                            alert("选课成功")
                        }
                        catch (e: any){
                            // 将e转换为ApiError
                            const apierror = e as ApiError;
                            alert(apierror.body.detail);
                            console.log(apierror.body);
                        }

                    }
                     }>选课
                    </Typography.Link>
                    <Typography.Link onClick={
                    async () => {
                        let resp = null;
                        try {
                            resp = await CoursesService.coursesSelectCourse({requestBody: {
                                course_id: item.id || 0,
                                student_id: currentUser?.student_id || 0
                            }})
                            alert("退课成功")
                        }
                        catch (e: any){
                            // 将e转换为ApiError
                            const apierror = e as ApiError;
                            alert(apierror.body.detail);
                            console.log(apierror.body);
                        }

                    }
                     }>退课
                    </Typography.Link>
                </Space>
            },

        ];
        const handlerKefuClick = function(e) {
            window.open('/chat', '_blank');
        }


//       const getCourseTables = () => {
//         let courseTables = {
//             1: [
//               {
//                 weeks: [1,2],
//                 course_indexs: [7,8],
//                 stuNameList: [],
//                 courseName: "张三",
//                 teaName: '312'
//               }
//             ],
//             2: [
//               {
//                 weeks: [1,2],
//                 course_indexs: [17,18],
//                 stuNameList: [],
//                 courseName: "张三",
//                 teaName: '312'
//             }
//         ]
//     };
//     return courseTables;
// }

    let courseTables = {};
    for (let index = 0; index < courses?.data?.length; index++) {
        let item = courses?.data[index]
        let spdata = item?.class_time.split(";")
        if (spdata?.length != 2) {
            continue
        }
        let weeks = [];
        let spweek = spdata[0].split(",");
        for (let i = 0; i < spweek.length; i++) {
            let week_range = spweek[i].split("-");
            if (week_range.length == 2) {
                for (let j = parseInt(week_range[0], 10); j <= parseInt(week_range[1], 10);j++) {
                    weeks.push(j);
                }

            } else {
                weeks.push(parseInt(week_range, 10));
            }
        }

        let course_indexs = [];
        let spindex = spdata[1].split(",");
        for (let i = 0; i < spindex.length; i++) {
            let index_range = spindex[i].split("-");
            if (index_range.length == 2) {
                for (let j = parseInt(index_range[0], 10); j <= parseInt(index_range[1], 10);j++) {
                    course_indexs.push(j);
                }

            } else {
                course_indexs.push(parseInt(index_range, 10));
            }
        }
        courseTables[index] = [
            {
                weeks: weeks,
                course_indexs: course_indexs,
                stuNameList: [],
                courseName: item?.name,
                teaName: item?.teacher?.name,
            }
        ]
      }
      console.log("courseTables", courseTables);

      const handleConfirm = () => {
        //   handleOK()
      };
        return (
        <>
            <Container maxW="full">
                <Heading size="lg" textAlign={{ base: "center", md: "left" }} py={12}>
                    课程选择
                </Heading>
                <Box pt={12} m={4}>
                    <CourseTable
                    courseTables={courseTables}
                    handleConfirm={handleConfirm}
                    />,
                </Box>
                <Button className="customer-service-button" onClick={handlerKefuClick}>询问AI助手</Button>
            </Container>
        </>
        )
}

export default CourseSelectTable
