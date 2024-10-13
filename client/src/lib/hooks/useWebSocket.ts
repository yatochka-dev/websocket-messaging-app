import { useEffect, useRef } from 'react';
import useMessagesStore from "~/lib/stores/messages";

type Message = {
    name: string;
    message: string;
};

const useWebSocket = (url: string) => {
    const ws = useRef<WebSocket | null>(null);
    const {addMessage} = useMessagesStore();
    useEffect(() => {
        const socket = new WebSocket(url);

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
    }, [addMessage, url]);

    return ws;
};

export default useWebSocket;
