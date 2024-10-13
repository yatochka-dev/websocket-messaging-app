'use client';
import React, {useState} from 'react';
import useMessagesWebSocket from '~/lib/hooks/useMessagesWebSocket';
import MessageList from '~/lib/components/MessageList';
import useMessagesStore from "~/lib/stores/messages";
import {MessageForm} from "~/lib/components/MessageForm";
import {Button} from "~/components/ui/button";
import useApi from "~/lib/hooks/useApi";

// TypeScript types for the message

function ClearMessages() {
    const {clearMessages} = useApi();


    return <div className={"p-5"}>
        <Button onClick={clearMessages} variant={"ghost"}>
            Clear Messages
        </Button>
    </div>;
}

const MessagingApp = () => {
    const {messages} = useMessagesStore();

  // Update the unified message state when messages are fetched from API

  // Update the unified message state when a message is received via WebSocket

  useMessagesWebSocket(); // Pass WebSocket messages to update state

  return (
      <div>
          <div className={"p-5 flex-1"}>
              <h1 className={"text-3xl font-bold text-center mb-5"}>Messaging App</h1>

              <MessageForm/>
              <div style={{marginTop: '20px'}}>
                  <MessageList messages={messages}/>
              </div>
          </div>

          <ClearMessages/>
      </div>
  );
};

export default MessagingApp;
