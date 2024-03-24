import { useEffect } from "react";
import Socket from "../Socket";

const useSocket = (event: string, handler: (data: any) => void) => {
    const socket = Socket.socket;

    useEffect(() => {
        const messageReceivedHandler = (newData: any) => {
            if (handler) handler(newData)
        };
        socket.on(event, messageReceivedHandler);
        return () => {
            socket.off(event, messageReceivedHandler);
        };
    });
}

export default useSocket;