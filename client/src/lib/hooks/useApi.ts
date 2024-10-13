
import { useEffect } from 'react';
import useMessagesStore from "~/lib/stores/messages";
import {getApiPath} from "~/getApiPath";

type Message = {
    name: string;
    message: string;
};

const useApi = () => {
    // Fetch messages via HTTP
    const { addMessages } = useMessagesStore();
    const fetchMessages = async () => {
        const response = await fetch(getApiPath('/messages'));
        const data = await response.json() as { messages: Message[] };
        addMessages(data.messages);
    };

    // Send a message via HTTP POST
    const sendMessage = async (name: string, message: string) => {
        await fetch(getApiPath('/send'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, message }),
        });
    };

    useEffect(() => {
        void fetchMessages(); // Fetch messages initially when the component mounts
    }, []);

    return { sendMessage };
};

export default useApi;
