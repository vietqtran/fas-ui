import { Avatar, Card, CardHeader, Divider } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";

type Props = {}

const SearchUser = (props: Props) => {
    const [usernamme, setUsername] = useState("");

    // const auth = useSelector((state) => state.auth);

    // const messsage = useSelector((state) => state.message);

    const handleSearchUser = (e) => {
        setUsername(e.target.value);
        // console.log(auth.searchUsers);
        // dispatch(searchUserAction(usernamme));
    };
    return (
        <div>
            <div className="py-5 relative">
                <input
                    type="text"
                    className="bg-transparent border border-[#3b4054] rounded-full w-full py-3 px-5 outline-none"
                    placeholder="Search user..."
                    onChange={handleSearchUser}
                />

                {usernamme && (
                    <Card className="absolute top-[4.5rem] w-full z-10 cursor-pointer">
                        {[1, 1, 1].map((item) => (
                            <>
                                <CardHeader
                                    className="hover:bg-gray-100"
                                    onClick={() => {
                                        // handleClick(item.id);
                                        setUsername("");
                                    }}
                                    avatar={
                                        <Avatar
                                            className="border border-gray-500"
                                            src="https://marmelab.com/images/blog/ascii-art-converter/homer.png"
                                        />
                                    }
                                    title={`${"manh"} ${"minh"}`}
                                    subheader={`${"manh"?.toLowerCase()} ${"minh"?.toLowerCase()}`}
                                />

                                <Divider />
                            </>
                        ))}
                    </Card>
                )}
            </div>
        </div>
    )
}

export default SearchUser