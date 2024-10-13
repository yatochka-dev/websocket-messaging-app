import useApi from "~/lib/hooks/useApi";
import React, {useState} from "react";

export function MessageForm() {

    const {sendMessage} = useApi();
    const [newMessage, setNewMessage] = useState<string>('');
    const [username, setUsername] = useState<string>('');

    const handleSendMessage = async () => {
        if (!username || !newMessage) {
            alert('Please enter your name and message!');
            return;
        }

        await sendMessage(username, newMessage);
        setNewMessage('');
    };

    return <form
            className={"flex flex-col gap-4 bg-gray-200 shadow-md p-4 rounded-lg"}
    >
        <div>
            <input
                type="text"
                placeholder="Your name"
                value={username}
                onChange={
                    (event) => setUsername(event.target.value)
                }
                style={{marginRight: "10px"}}
                className={
                "border-2 border-gray-300 rounded-lg p-2 w-full"
                }
            />
        </div>

        <div style={{marginTop: "10px"}}>
            <input
                type="text"
                value={newMessage}
                onChange={
                    (event) => setNewMessage(event.target.value)
                }
                placeholder="Type your message..."
                className={
                "border-2 border-gray-300 rounded-lg p-2 w-full"
                }


            />
        </div>

            <button type="button" onClick={handleSendMessage} className={"bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out"}>Send</button>
    </form>;
}