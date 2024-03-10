import { addMessage, deleteMessage, getAllMessage } from '@/helpers/api/message'
import React from 'react'

const useMessage = () => {
    const [messages, setMessages] = React.useState<MessageInformation[]>([])
    const [messageId, setMessageId] = React.useState<string>("")
    const [content, setContent] = React.useState<string>("")
    const [image, setImage] = React.useState<string>("")
    const [chatId, setChatId] = React.useState<string>("")
    const [studentId, setStudentId] = React.useState<string>("")

    React.useEffect(() => {
        if (chatId) {
            console.log(chatId);

            fetchMessageByChatId(chatId)
        }
    }, [chatId])

    const fetchMessageByChatId = async (chatId: string) => {
        try {
            let response = (await getAllMessage(chatId).then((res) => res)) as BaseResponse
            if (response && response.code === "SUCCESS") {
                setMessages(response.data)
                console.log(response.data);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleAddMessage = async (studentId: string, chatId: string, message: MessageInformation, sendMessageToServer: (newMessage: any) => void) => {
        try {
            let response = (await addMessage(studentId, chatId, message).then((res) => res)) as BaseResponse;
            if (response && response.code === "SUCCESS") {
                console.log(response.data);
                sendMessageToServer(response.data);
                fetchMessageByChatId(chatId);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleDeleteMessage = async (messageId: string, sendMessageToServer: (newMessage: any) => void) => {
        try {
            let response = (await deleteMessage(messageId).then((res) => res)) as BaseResponse;
            if (response && response.code === "SUCCESS") {
                sendMessageToServer(response.data);
                // fetchMessageByChatId(chatId);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return {
        messages,
        setMessages,
        chatId,
        setChatId,
        content,
        setContent,
        image,
        setImage,
        studentId,
        setStudentId,
        handleAddMessage,
        handleDeleteMessage,
        fetchMessageByChatId
    }
}

export default useMessage;
