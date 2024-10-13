import { create } from "zustand";

interface IMessage {
    name: string;
    message: string;
}

interface IMessagesStore {
   messages: IMessage[];
   addMessage: (message: IMessage) => void;
   addMessages: (messages: IMessage[]) => void;
}

const useMessagesStore = create<IMessagesStore>()((set) => ({
    addMessage: (message: IMessage) => set((state) => ({ messages: [message, ...state.messages] })),
        addMessages: (messages: IMessage[]) => set((state) => ({ messages: [...messages, ...state.messages] })),
    messages: [],

}));

export default useMessagesStore;
export type { IMessagesStore, IMessage };