import { useEffect, useRef } from 'react';
import useMessagesStore from "~/lib/stores/messages";
import {getApiPath, getApiPathWebSocket} from "~/getApiPath";

type Message = {
    name: string;
    message: string;
};

const useMessagesWebSocket = () => {
    const ws = useRef<WebSocket | null>(null);
    const {addMessage} = useMessagesStore();
    useEffect(() => {
        console.log(`ws: ${getApiPathWebSocket('/messages/ws')}`);
        const socket = new WebSocket(getApiPathWebSocket('/messages/ws'));

        socket.onopen = () => {
            console.log('Connected to WebSocket');
        };

        socket.onmessage = (event) => {
            const message = JSON.parse(event.data as string) as Message;
                addMessage(message);
        };

        socket.onclose = () => {
            console.log('Disconnected from WebSocket');
        };

        ws.current = socket;

        return () => {
            socket.close();
        };
    }, [addMessage]);

    return ws;
};

export default useMessagesWebSocket;
