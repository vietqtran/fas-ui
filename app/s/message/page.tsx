"use client"

import { Avatar, Backdrop, CircularProgress, Grid, IconButton } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import WestIcon from "@mui/icons-material/West";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { uploadToCloudinary } from '@/utils/uploadToCloudinary';
import { useSelector } from 'react-redux';
import { RootState } from '@/helpers/redux/reducers';
import UserChatCard from '@/components/Chat/UserChatCard/UserChatCard';
import ChatMessage from '@/components/Chat/ChatMessage/ChatMessage';
import useMessage from '@/hooks/Message';
import SockJS from "sockjs-client";
import Stomp from 'stompjs';
import useChat from '@/hooks/Chat';
import { useRouter } from 'next/navigation';
import SearchUser from '@/components/Chat/SearchUser/SearchUser';

type Props = {}

const page = (props: Props) => {
    const [currentChat, setCurrentChat] = useState(null);
    const [selectedImage, setSelectedImage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useSelector((state: RootState) => state.user);

    const { handleAddMessage, messages, setMessages, setChatId, handleDeleteMessage, fetchMessageByChatId } = useMessage();

    const { chats, textSearch, setTextSearch } = useChat();

    const router = useRouter();

    const [stompClient, setStompClient] = useState(null);

    useEffect(() => {
        const sock = new SockJS("http://localhost:8080/ws");
        const stomp = Stomp.over(sock);
        setStompClient(stomp);

        stomp.connect({}, onConnect, onErr);

        return () => {
            stomp.disconnect();
        };
    }, []);

    const onConnect = () => {
        console.log("WebSocket connected...");
    };

    const onErr = (err) => {
        console.log("WebSocket error: ", err);
    };

    useEffect(() => {
        if (stompClient && user.student && currentChat) {
            const subscription = stompClient.subscribe(
                /user/${currentChat.id}/private,
                onMessageReceive
            );

            return () => {
                subscription.unsubscribe();
            };
        }
    }, [stompClient, user?.student, currentChat, messages]);

    const onMessageReceive = (payload) => {
        const decodedPayload = atob(JSON.parse(payload.body).payload);
        const receivedMessage = JSON.parse(decodedPayload);

        console.log("Message received from WebSocket: ", receivedMessage);


        // Update messages state with the received message
        setMessages([...messages, receivedMessage]);

        fetchMessageByChatId(currentChat?.id);

        console.log("messages: ", messages);

    };
    console.log("messages: ", messages);

    const sendMessageToServer = (newMessage: MessageInformation) => {
        if (stompClient && newMessage) {
            stompClient.send(
                /app/chat/${currentChat?.id.toString()},
                {},
                JSON.stringify(newMessage)
            );
        }
    };

    const handleSelectImage = async (event) => {
        setIsLoading(true);
        const imageUrl = await uploadToCloudinary(event.target.files[0], "image");
        setSelectedImage(imageUrl);
        setIsLoading(false);
    };

    const handleCreateMessage = (event) => {
        if ((event.target.value !== "" || selectedImage) && event.key === "Enter") {
            const newMessage = {
                content: event.target.value,
                image: selectedImage,
            } as MessageInformation;

            handleAddMessage(user?.student?.id, currentChat?.id, newMessage, sendMessageToServer);
            event.target.value = "";
            setSelectedImage("");
        }
    }

    const handleRemoveMessage = (message) => {
        handleDeleteMessage(message.id, sendMessageToServer);
    }

    const chatContainerUserRef = useRef(null);

    useEffect(() => {
        if (chatContainerUserRef.current) {
            chatContainerUserRef.current.scrollTop =
                chatContainerUserRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div>
            <Grid container className="h-screen overflow-y-hidden">
                <Grid className="px-5" item xs={3}>
                    <div className="flex h-full justify-between space-x-2">
                        <div className="w-full">
                            <div
                                onClick={() => router.push("/s/viewClass")}
                                className="flex space-x-4 items-center py-5 cursor-pointer"
                            >
                                <WestIcon />
                                <h1 className="text-xl font-bold">Students Of Class</h1>
                            </div>

                            <div className="h-[82vh]">
                                <div>
                                    <input
                                        value={textSearch}
                                        onChange={(e) => setTextSearch(e.target.value)}
                                        type="text"
                                        className="bg-transparent border border-[#3b4054] rounded-full w-full py-3 px-5 outline-none"
                                        placeholder="Search user..."
                                    />
                                </div>

                                <div className="h-full space-y-4 mt-5 overflow-y-scroll">
                                    {chats.map((item: ChatInformation) => (
                                        <div className='pr-5 cursor-pointer'
                                            key={item.id}
                                            onClick={() => {
                                                setCurrentChat(item);
                                                setChatId(item.id);
                                            }}
                                        >
                                            <UserChatCard chat={item} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </Grid>

                <Grid className="h-full" item xs={9}>
                    {currentChat ? (
                        <div>
                            <div className="flex justify-between items-center border-b border-1 p-5">
                                <div className="flex items-center space-x-3">
                                    <Avatar
                                        className="border border-gray-500"
                                        src={currentChat.students.find(student => student.id !== user.student.id)?.profileImage}
                                    />
                                    <p>
                                        {currentChat.students.find(student => student.id !== user.student.id)?.firstName +
                                            ' ' +
                                            currentChat.students.find(student => student.id !== user.student.id)?.middleName +
                                            ' ' +
                                            currentChat.students.find(student => student.id !== user.student.id)?.lastName}
                                    </p>

                                </div>

                                <div className="flex space-x-3">
                                    <IconButton>
                                        <AddIcCallIcon />
                                    </IconButton>

                                    <IconButton>
                                        <VideoCallIcon />
                                    </IconButton>
                                </div>
                            </div>

                            <div
                                ref={chatContainerUserRef}
                                className="overflow-y-scroll h-[82vh] px-2 space-y-5 py-[4rem]"
                            >
                                {messages?.map((item) => (
                                    <ChatMessage onDelete={handleRemoveMessage} key={item?.id} item={item} />
                                ))}
                            </div>

                            <div className="sticky bottom-0 bg-white">
                                {selectedImage && (
                                    <img
                                        src={selectedImage}
                                        className="w-[5rem] h-[5rem] border-none object-cover px-2"
                                        alt="image"
                                    />
                                )}

                                <div className="py-5 flex items-center justify-center space-x-5">
                                    <input
                                        onKeyPress={(e) => {
                                            handleCreateMessage(e);
                                        }}
                                        type="text"
                                        className="bg-transparent border border-[#3b4054] rounded-full w-[90%] py-3 px-5"
                                        placeholder="Type messasge..."
                                    />

                                    <div>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleSelectImage}
                                            className="hidden"
                                            id="image-input"
                                        />
                                        <label className='cursor-pointer' htmlFor="image-input">
                                            <AddPhotoAlternateIcon />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full space-y-5 flex flex-col justify-center items-center">
                            <ChatBubbleOutlineIcon sx={{ fontSize: "15rem" }} />
                            <p className="text-xl font-semibold">No chat selected</p>
                        </div>
                    )}
                </Grid>
            </Grid>


            <Backdrop
                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
}

export default page