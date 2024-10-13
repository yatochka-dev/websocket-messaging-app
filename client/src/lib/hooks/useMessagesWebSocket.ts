import { useEffect, useRef } from "react";
import useMessagesStore from "~/lib/stores/messages";
import { getApiPath, getApiPathWebSocket } from "~/getApiPath";

type Message = {
  name: string;
  message: string;
};

type SocketResponse =
  | {
      type: "new_message";
      new_message: Message;
    }
  | {
      type: "clear_messages";
    };

const useMessagesWebSocket = () => {
  const ws = useRef<WebSocket | null>(null);
  const { addMessage, clearMessages } = useMessagesStore();
  useEffect(() => {
    console.log(`ws: ${getApiPathWebSocket("/messages/ws")}`);
    const socket = new WebSocket(getApiPathWebSocket("/messages/ws"));

    socket.onopen = () => {
      console.log("Connected to WebSocket");
    };

    socket.onmessage = (event: MessageEvent<string>) => {
      const message = JSON.parse(event.data) as SocketResponse;
      console.log(message);
      console.log(message.type == "new_message");
      if (message.type === "new_message") {
        addMessage(message.new_message);
      } else if (message.type === "clear_messages") {
        clearMessages();
      }
    };

    socket.onclose = () => {
      console.log("Disconnected from WebSocket");
    };

    ws.current = socket;

    return () => {
      socket.close();
    };
  }, [addMessage]);

  return ws;
};

export default useMessagesWebSocket;
