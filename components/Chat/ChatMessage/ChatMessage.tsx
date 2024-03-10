import { RootState } from '@/helpers/redux/reducers';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { IconButton, Menu, MenuItem } from '@mui/material';

type Props = {
    item: any;
    onDelete: (item: any) => void;
}

const ChatMessage = (props: Props) => {
    const { item, onDelete } = props;
    const { user } = useSelector((state: RootState) => state.user);
    const isReqUserMessage = item?.studentId === user?.student?.id;
    const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null); // State to anchor the menu
    const [isHovered, setIsHovered] = useState<boolean>(false); // State to track hover state

    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setMenuAnchor(event.currentTarget);
    };

    const handleMenuClose = () => {
        setMenuAnchor(null);
    };

    return (
        <div
            className={`flex my-5 ${!isReqUserMessage ? "justify-start" : "justify-end"
                } text-white`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className='flex'>
                {isReqUserMessage && item.status && (
                    <div className='flex items-center'>
                        {isHovered && ( // Render IconButton only when hovered
                            <IconButton onClick={handleMenuOpen}>
                                <MoreHorizIcon />
                            </IconButton>
                        )}
                        <Menu
                            anchorEl={menuAnchor}
                            open={Boolean(menuAnchor)}
                            onClose={handleMenuClose}
                        >
                            <MenuItem onClick={() => { onDelete(item); handleMenuClose(); }}>Delete</MenuItem>
                        </Menu>
                    </div>
                )}

                <div>
                    {
                        !item.status ? (
                            <p className={`text-gray-200 px-5 rounded-full bg-[#6e6b6b] py-1`}>
                                The message has been removed
                            </p>
                        ) : (
                            <>
                                {item?.image && (
                                    <img
                                        src={item?.image}
                                        className="w-[12rem] h-[17rem] object-cover rounded-md"
                                        alt=""
                                    />
                                )}
                                {item?.content && (
                                    <p className={`bg-[#191c29] w-full px-5 rounded-full py-2`}>{item.content}</p>
                                )}
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default ChatMessage;
