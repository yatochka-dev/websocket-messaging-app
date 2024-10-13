import React from "react";

type Message = {
  name: string;
  message: string;
};

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <ul className={"flex flex-col gap-4 rounded-lg bg-slate-50 p-4 shadow-2xl"}>
      {messages.map((msg, index) => (
        <li key={index}>
          <strong>{msg.name}:</strong> {msg.message}
        </li>
      ))}
      {
        messages.length === 0 &&
        <li className={"text-center"}>No messages yet</li>
      }
    </ul>
  );
};

export default MessageList;
