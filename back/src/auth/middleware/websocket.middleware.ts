import { Socket } from 'socket.io';
import { WsJwtGuard } from '../guards/ws-jwt';


export type SocketIOMiddleware = {
     (socket: Socket, next: (err?: Error) => void)
};

export const SocketAuthMiddleware = (token:string): SocketIOMiddleware => {
        return (socket,next) => {
            try {
                WsJwtGuard.validateToken(token);
                next();
            } catch (error) {
                next(error);
            }
    }

}