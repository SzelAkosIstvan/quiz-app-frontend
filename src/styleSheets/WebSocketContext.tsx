import React, { createContext, useContext, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from "sockjs-client";

interface WebSocketContextType {
    stompClient: Client | null;
    setStompClient: (client: Client | null) => void;
    connectToWebSocket: (teacherId: string, onConnect?: () => void) => void;
    disconnectWebSocket: () => void;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const WebSocketProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [stompClient, setStompClient] = useState<Client | null>(null);

    const connectToWebSocket = (teacherId: string, onConnect?: () => void) => {
        if (stompClient && stompClient.connected) return;

        const socket = new SockJS(`${process.env.REACT_APP_API_URL}/quiz-websocket`);
        const client = new Client({
            webSocketFactory: () => socket,
            onConnect: () => {
                setStompClient(client);
                console.log('Connected!');
                if (onConnect) onConnect();
            },
            onDisconnect: () => {
                setStompClient(null);
            }
        });

        client.activate();
    };

    const disconnectWebSocket = () => {
        if (stompClient) {
            stompClient.deactivate();
            setStompClient(null);
        }
    };

    return (
        <WebSocketContext.Provider value={{ stompClient, setStompClient, connectToWebSocket, disconnectWebSocket }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => {
    const context = useContext(WebSocketContext);
    if (context === undefined) {
        throw new Error('useWebSocket must be used within a WebSocketProvider');
    }
    return context;
};