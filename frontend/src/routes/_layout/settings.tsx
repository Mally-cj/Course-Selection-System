import {
  Container,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"
import { useQueryClient } from "react-query"

import type { UserOut } from "../../client"
import Appearance from "../../components/UserSettings/Appearance"
import ChangePassword from "../../components/UserSettings/ChangePassword"
import DeleteAccount from "../../components/UserSettings/DeleteAccount"
import UserInformation from "../../components/UserSettings/UserInformation"

const tabsConfig = [
  { title: "基础信息", component: UserInformation },
  { title: "密码", component: ChangePassword },
  { title: "界面设置", component: Appearance },
  { title: "风险区", component: DeleteAccount },
]

export const Route = createFileRoute("/_layout/settings")({
  component: UserSettings,
})

function UserSettings() {
  const queryClient = useQueryClient()
  const currentUser = queryClient.getQueryData<UserOut>("currentUser")
  const finalTabs = currentUser?.is_superuser
    ? tabsConfig.slice(0, 3)
    : tabsConfig

  return (
    <Container maxW="full">
      <Heading size="lg" textAlign={{ base: "center", md: "left" }} py={12}>
        个人信息设置
      </Heading>
      <Tabs variant="enclosed">
        <TabList>
          {finalTabs.map((tab, index) => (
            <Tab key={index}>{tab.title}</Tab>
          ))}
        </TabList>
        <TabPanels>
          {finalTabs.map((tab, index) => (
            <TabPanel key={index}>
              <tab.component />
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Container>
  )
}

export default UserSettings
