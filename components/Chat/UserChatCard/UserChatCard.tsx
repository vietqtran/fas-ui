import React from 'react'
import { Avatar, Card, CardHeader, IconButton } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useSelector } from "react-redux";
import { Chat } from '@mui/icons-material';
import { RootState } from '@/helpers/redux/reducers';

type Props = {
    chat: ChatInformation
}

const UserChatCard = (props: Props) => {
    const { chat } = props;
    const { user } = useSelector((state: RootState) => state.user)

    console.log("chat: ", chat);


    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar
                        sx={{
                            width: "3.5rem",
                            height: "3.5rem",
                            fontSize: "1.5rem",
                            bgcolor: "#191c29",
                            color: "rgb(88, 199, 250)",
                        }}
                        src={
                            user?.student?.id === chat?.students[0]?.id
                                ? chat.students[1].profileImage
                                : chat.students[0].profileImage
                        }
                    />
                }
                action={
                    <IconButton>
                        <MoreHorizIcon />
                    </IconButton>
                }
                title={
                    user?.student?.id === chat?.students[0]?.id
                        ? chat.students[1].firstName + " " + chat.students[1].middleName + " " + chat.students[1].lastName
                        : chat.students[0].firstName + " " + chat.students[0].middleName + " " + chat.students[0].lastName
                }
                subheader={
                    user?.student?.id === chat?.students[0]?.id
                        ? chat.students[1].username
                        : chat.students[0].username
                }
            ></CardHeader>
        </Card>
    )
}

export default UserChatCard