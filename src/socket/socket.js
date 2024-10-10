import { createContext, useContext, useEffect, useState } from "react";
import io from 'socket.io-client'

const SocketContext = createContext(null);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({children}) =>{
    const [socket, setSocket] = useState(null);
    useEffect(() => {
        const newSocket = io(process.env.ENV === 'development'? 'http://localhost:9000': process.env.REACT_APP_API_URL);
        setSocket(newSocket);
        return () => {
            newSocket.disconnect();
        }
    }, [])

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}