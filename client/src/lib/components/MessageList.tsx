import React from 'react';

type Message = {
    name: string;
    message: string;
};

interface MessageListProps {
    messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
    return (
        <ul className={"flex flex-col gap-4 bg-gray-200 shadow-md p-4 rounded-lg"}>
            {messages.map((msg, index) => (
                <li key={index}>
                    <strong>{msg.name}:</strong> {msg.message}
                </li>
            ))}
        </ul>
    );
};

export default MessageList;
