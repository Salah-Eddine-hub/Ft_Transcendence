import { CanActivate, ExecutionContext, Inject, Injectable, Logger } from "@nestjs/common";
import { Socket } from 'socket.io';
import { verify } from "jsonwebtoken";
import * as cookie from 'cookie';

@Injectable()
export class WsJwtGuard implements CanActivate {
    constructor() { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        if (context.getType() !== 'ws') {
            return true;
        }
        const client: Socket = context.switchToWs().getClient();
        const { authorization } = client.handshake.headers;
        
        return true;
    }
    static validateToken(socket: string) {
        try {
                const payload = verify(socket, process.env.SECRET_KEY);
                return payload;
        } catch (error) {
            throw new Error('Not authorized');
        }



    }
}