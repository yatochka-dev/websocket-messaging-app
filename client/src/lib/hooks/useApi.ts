import { useEffect } from "react";
import useMessagesStore from "~/lib/stores/messages";
import { getApiPath } from "~/getApiPath";

type Message = {
  name: string;
  message: string;
};

const useApi = () => {
  // Fetch messages via HTTP
  const { addMessages } = useMessagesStore();
  const fetchMessages = async () => {
    const response = await fetch(getApiPath("/messages"));
    const data = (await response.json()) as { messages: Message[] };
    addMessages(data.messages.reverse());
  };

  // Send a message via HTTP POST
  const sendMessage = async (name: string, message: string) => {
    await fetch(getApiPath("/send"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, message }),
    });
  };

  const clearMessages = async () => {
    await fetch(getApiPath("/clear-messages"), {
      method: "POST",
    });
  };

  useEffect(() => {
    void fetchMessages(); // Fetch messages initially when the component mounts
  }, []);

  return { sendMessage, clearMessages };
};

export default useApi;
