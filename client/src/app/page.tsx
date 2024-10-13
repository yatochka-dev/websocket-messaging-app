'use client';
import React from 'react';
import useWebSocket from '~/lib/hooks/useWebSocket';
import MessageList from '~/lib/components/MessageList';
import useMessagesStore from "~/lib/stores/messages";
import {MessageForm} from "~/lib/components/MessageForm";

// TypeScript types for the message

const MessagingApp = () => {
    const {messages} = useMessagesStore();

  // Update the unified message state when messages are fetched from API

  // Update the unified message state when a message is received via WebSocket

  useWebSocket('ws://localhost:8000/messages/ws'); // Pass WebSocket messages to update state


  return (
      <div className={"p-5"}>
          <h1 className={"text-3xl font-bold text-center mb-5"}>Messaging App</h1>

          <MessageForm  />
          <div style={{marginTop: '20px'}}>
              <MessageList messages={messages}/>
          </div>
      </div>
  );
};

export default MessagingApp;
