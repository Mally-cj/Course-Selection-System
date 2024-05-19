import { Box, Container, Heading, Text } from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"
import { useQuery, useQueryClient } from "react-query"
import { UserOut } from "../client"
import '@chatui/core/es/styles/index.less';
// 引入组件
import Chat, { Bubble, useMessages } from '@chatui/core';
// 引入样式
import '@chatui/core/dist/index.css';
export const Route = createFileRoute("/chat")({
  component: CourseSelect,
})

function CourseSelect() {
    const queryClient = useQueryClient()
    const { messages, appendMsg, setTyping } = useMessages([]);
    function handleSend(type, val) {
        if (type === 'text' && val.trim()) {
          appendMsg({
            type: 'text',
            content: { text: val },
            position: 'right',
          });

          setTyping(true);

          setTimeout(() => {
            appendMsg({
              type: 'text',
              content: { text: '小x不知道哦' },
            });
          }, 1000);
        }
      }

      function renderMessageContent(msg) {
        const { content } = msg;
        return <Bubble content={content.text} />;
      }
    const currentUser = queryClient.getQueryData<UserOut>("currentUser")

        return (
        <>
            <Container maxW="full" padding="30px"  h="100vh">

                <Chat
                navbar={{ title: '智能助理小x' }}
                messages={messages}
                renderMessageContent={renderMessageContent}
                onSend={handleSend}
            />

            </Container>
        </>
        )
}

export default CourseSelect
