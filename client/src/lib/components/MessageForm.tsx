import useApi from "~/lib/hooks/useApi";
import React, { useState } from "react";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";

export function MessageForm() {
  const { sendMessage } = useApi();
  const [newMessage, setNewMessage] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const handleSendMessage = async () => {
    if (!username || !newMessage) {
      alert("Please enter your name and message!");
      return;
    }

    await sendMessage(username, newMessage);
    setNewMessage("");
  };

  return (
    <form
      className={
        "shadow- inset-0 flex w-full flex-col gap-4 rounded-lg bg-slate-50 p-4 shadow-2xl"
      }
    >
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="username">Email</Label>
        <Input
          type="text"
          id="username"
          placeholder="Arielita"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className={"grid w-full items-center gap-1.5"}>
        <Label htmlFor="message">Username</Label>
        <Textarea
          id="message"
          className={"w-full"}
          placeholder="Skibidi toilet"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
      </div>

      <Button type="button" onClick={handleSendMessage}>
        Send
      </Button>
    </form>
  );
}
