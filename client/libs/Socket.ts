import io, { Socket as SocketClient } from 'socket.io-client';
const ENDPOINT = 'http://localhost:4000/';


class Socket {
    socket: SocketClient
    constructor() {
        this.socket = io(ENDPOINT, {
            withCredentials: true
        });
    }
}

export default new Socket();