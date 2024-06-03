import { Box, Flex, Icon, Text, useColorModeValue } from "@chakra-ui/react"
import { Link } from "@tanstack/react-router"
import type React from "react"
import { FiBriefcase, FiHome, FiSettings, FiUsers } from "react-icons/fi"
import { useQueryClient } from "react-query"

import type { UserOut, UserType } from "../../client"
interface SidebarItemsProps {
  onClose?: () => void
}

const SidebarItems: React.FC<SidebarItemsProps> = ({ onClose }) => {
  const queryClient = useQueryClient()
  const textColor = useColorModeValue("ui.main", "ui.white")
  const bgActive = useColorModeValue("#E2E8F0", "#4A5568")
  const currentUser = queryClient.getQueryData<UserOut>("currentUser")

  let items = [
    { icon: FiHome, title: "主页", path: "/" },
    // { icon: FiBriefcase, title: "项目", path: "/items" },
    { icon: FiSettings, title: "设置", path: "/settings" },
  ];

  if (currentUser?.user_type == 2) {
    // 如果当前用户是学生
    items = [...items, ...[
      { icon: FiBriefcase, title: "我的课程", path: "/my-courses"},
      { icon: FiBriefcase, title: "课程选择", path: "/courses-selection"}
      ]
    ]
  } else if (currentUser?.user_type === 3) {
    // 如果当前用户是老师
    items = [...items, ...[
      { icon: FiBriefcase, title: "课程管理", path: "/courses" },
      { icon: FiBriefcase, title: "调课及公告", path: "/course-announcement" },
      ]
    ]
  } else {
    // 如果是管理员
    items = [...items, ...[
      { icon: FiUsers, title: "学生管理", path: "/student-management"},
      { icon: FiUsers, title: "教师管理", path: "/teacher-management"},
      { icon: FiUsers, title: "课程审核", path: "/courses-audit"},
      { icon: FiUsers, title: "统计大厅", path: "/course-Statistic"}
      ]
    ] 
  }
  const finalItems = currentUser?.is_superuser
    ? [...items, { icon: FiUsers, title: "用户管理", path: "/admin" }]
    : items

  const listItems = finalItems.map((item) => (
    <Flex
      as={Link}
      to={item.path}
      w="100%"
      p={2}
      key={item.title}
      activeProps={{
        style: {
          background: bgActive,
          borderRadius: "12px",
        },
      }}
      color={textColor}
      onClick={onClose}
    >
      <Icon as={item.icon} alignSelf="center" />
      <Text ml={2}>{item.title}</Text>
    </Flex>
  ))

  return (
    <>
      <Box>{listItems}</Box>
    </>
  )
}

export default SidebarItems
