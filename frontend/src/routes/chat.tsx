import { Box, Container, Heading, Text } from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"
import { useQuery, useQueryClient } from "react-query"
import { ChatService, UserOut } from "../client"
import '@chatui/core/es/styles/index.less';
import { Button } from 'antd';
// 引入组件
import Chat, { Bubble, useMessages } from '@chatui/core';
// 引入样式
import '@chatui/core/dist/index.css';
export const Route = createFileRoute("/chat")({
  component: CourseSelect,
})

import { Radio, RadioGroup } from '@chatui/core';
import { useState } from "react";
import { Model } from "echarts";
import { nice } from "echarts/types/src/util/number.js";
import { color } from "framer-motion";

const options = [
  { label: 'Kimi', value: 'kimi' },
  { label: 'GPT-4o', value: 'gpt-4o' },
];

interface ModelSelectProps {
  handleModelChange: (model: string) => void
}

const ModelSelect: React.FC<ModelSelectProps> = ({handleModelChange}) => {
  const [value, setValue] = useState('a');

  function handleChange(val) {
    setValue(val);
    console.log(val)
    handleModelChange(val)
  }

  return (
    <div>
      <div>模型选择:</div>
      <RadioGroup value={value} options={options} onChange={handleChange} />
    </div>
  );
}

function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
          v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
  });
}

function CourseSelect() {

  const queryClient = useQueryClient()
  const [model, setModel] = useState("kimi");
  let chat_id = sessionStorage.getItem("chat_id")
  if (chat_id == null) {
    chat_id = guid()
    sessionStorage.setItem("chat_id", chat_id);
  }

  const clearHistory = () => {
    ChatService.chatChatHistoryClear({
      chatId: chat_id,
    }).then((value) => {
      console.log(value)
      alert("清除成功")
    })
  }
  const initalMessages = [];
  // const {
  //     data: chatHistory,
  //     isLoading,
  //     isError,
  //     error,
  //   } = useQuery("chatHistory", () => ChatService.chatChatHistory({chatId: chat_id}))
  // // ChatService.chatChatHistory({chatId: chat_id}).then((chatHistory) => {
  // //   console.log(chatHistory)
  //   for (let i = 0; i < chatHistory.length; i++) {
  //     let item = chatHistory[i];
  //     if (item.type == "human") {
  //       initalMessages.push({
  //         type: 'text',
  //         content: { text: chatHistory[i].content },
  //         position: 'left',
  //       })
  //     } else {
  //       initalMessages.push({
  //         type: 'text',
  //         content: { text: chatHistory[i].content },
  //         position: 'right',
  //       })
  //     }
  //   }
  // })

  const { messages, appendMsg, setTyping } = useMessages(initalMessages);


  // const historys =
    function handleSend(type, val) {
        if (type === 'text' && val.trim()) {
          appendMsg({
            type: 'text',
            content: { text: val },
            position: 'right',
          });

          setTyping(true);
          ChatService.chatChat({
            requestBody: {
              "chat_id": chat_id,
              "model": model,
              "message": val,
            }
          }).then((value) => {
            console.log(value)
            appendMsg({
              type: 'text',
              content: { text: value[value.length - 1 ].content },
            });
          })

          // setTimeout(() => {

          // }, 1000);
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
                <ModelSelect
                  handleModelChange={(v) => {
                    setModel(v)
                  }}
                ></ModelSelect>
                <Button type="primary" onClick={() => clearHistory()}>清除聊天记录</Button>
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
