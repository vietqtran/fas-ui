interface ChatInformation {
    id: string;
    chatName: string;
    chatImage: string;
    students: [
        { id: string, firstName: string, middleName: string, lastName: string, profileImage: string, username: string },
        { id: string, firstName: string, middleName: string, lastName: string, profileImage: string, username: string }
    ];
    messages: []
}