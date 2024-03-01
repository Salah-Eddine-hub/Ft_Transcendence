import { SubscribeMessage, WebSocketGateway, MessageBody, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { ChatService } from './chat.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@WebSocketGateway(
  {
    cors: {
      origin: true,
      methods: ["GET", "POST"],
    },
  }
)

export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private chatService: ChatService) { }
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('sendMessage')
  async handleSendMessage(client: Socket, payload: any) {
    await this.chatService.addMessagesToRoom(payload);
    const message = await this.chatService.getGroupMessages(payload.roomId);
    this.server.to(payload.roomId).emit('getAllMessages', message, payload.roomId);
  }

  @SubscribeMessage('joinGroupChat')
  async handleJoiningGroupChat(client: Socket, payload: any) {
    if (await this.chatService.checkIfBanned(payload.userId, payload.groupId) === 1) {
      client.emit("banned", `You are banned on that channel`);
      return;
    }
    if (await this.chatService.checkIfMember(payload.userId, payload.groupId) === 1) {
      client.emit("alreadyJoined", `You are already on that channel`);
      return;
    }
    const groupData = await this.chatService.getRoom(payload.groupId);
    if (payload.password && payload.password !== groupData.password) {
      client.emit("joinFailed", "Wrong Password");
      return;
    }
    await this.chatService.addRoomToUser(payload.userId, payload.groupId)
    await this.chatService.addUserToRoom(payload.userId, payload.groupId)

    client.join(payload.groupId);
    client.emit("joinSuccessfull", `You Joined ${payload.roomName}`);
    this.server.emit("refresh");
  }

  @SubscribeMessage('kick')
  async kick(client: Socket, payload: any) {
    payload.message = `announcement ${payload.username} has kicked ${payload.target_username} from this room`
    await this.chatService.kickUserFromRoom(payload.target, payload.roomId)
    await this.handleSendMessage(client, payload)
    this.server.to(payload.roomId).emit("refresh");
    const roomData = await this.chatService.getRoom(payload.roomId);
    client.to(payload.roomId).emit("redirectToChatPage", payload.target, roomData.name, payload.roomId, "kicked");
  }

  @SubscribeMessage('mute')
  async Mute(client: Socket, payload: any) {
    payload.message = `announcement ${payload.username} has muted ${payload.target_username}`
    await this.chatService.MuteUserFromRoom(payload.target, payload.roomId)
    await this.handleSendMessage(client, payload)
    this.server.to(payload.roomId).emit("refresh");
  }

  @SubscribeMessage('ban')
  async Ban(client: Socket, payload: any) {
    payload.message = `announcement ${payload.username} has banned ${payload.target_username}`
    await this.chatService.banUserFromRoom(payload.target, payload.roomId)
    await this.handleSendMessage(client, payload)
    this.server.to(payload.roomId).emit("refresh");
    const roomData = await this.chatService.getRoom(payload.roomId);
    client.to(payload.roomId).emit("redirectToChatPage", payload.target, roomData.name, payload.roomId, "banned");
  }

  @SubscribeMessage('unmute')
  async Unmute(client: Socket, payload: any) {
    payload.message = `announcement ${payload.username} has unmuted ${payload.target_username}`
    await this.chatService.UnmuteUserFromRoom(payload.target, payload.roomId)
    await this.handleSendMessage(client, payload)
    this.server.to(payload.roomId).emit("refresh");
  }

  @SubscribeMessage('makeAdmin')
  async makeAdmin(client: Socket, payload: any) {
    payload.message = `announcement ${payload.target_username} in now an admin on this room`
    await this.chatService.makeAdminOnRoom(payload.target, payload.roomId)
    await this.handleSendMessage(client, payload)
    this.server.to(payload.roomId).emit("refresh");
  }

  @SubscribeMessage('removeAdmin')
  async removeAdmin(client: Socket, payload: any) {
    payload.message = `announcement ${payload.target_username} in no longer an admin on this room`
    await this.chatService.removeAdminOnRoom(payload.target, payload.roomId)
    await this.handleSendMessage(client, payload)
    this.server.to(payload.roomId).emit("refresh");
  }


  @SubscribeMessage('setRoomToPublic')
  async setRoomToPublic(client: Socket, payload: any) {
    
    const roomData = await this.chatService.getRoom(payload.roomId);
    if (!roomData) return;
    
    await this.chatService.setRoomToPublic(payload.roomId);
    await this.handleSendMessage(client, payload)
    this.server.to(payload.roomId).emit('refresh', "Public");
  }

  @OnEvent('setRoomToProtected')
  async setRoomToProtected(client: Socket, payload: any) {
    await this.handleSendMessage(client, payload)
    this.server.to(payload.roomId).emit('refresh', "Protected");
  }


  @SubscribeMessage('changeRoomPassword')
  async changePassword(client: Socket, payload: any) {
      this.server.to(payload.roomId).emit('refresh');
  }

  @SubscribeMessage('leave')
  async leave(client: Socket, payload: any) {
    payload.message = `announcement ${payload.username} has left the room`
    await this.chatService.kickUserFromRoom(payload.userId, payload.roomId)
    await this.handleSendMessage(client, payload)
    this.server.emit('refresh');
  }

  @SubscribeMessage('addSocketToThisUserRoom')
  async addSocketToThisUserRoom(client: Socket, userId: any) {
    const rooms = await this.chatService.getGroupsByUserId(userId);
    if (rooms) {
      rooms.map((room) => {
        client.join(room.id);
      })
    }
  }























































  handleConnection(client: any) {
    console.log("chat connected")
  }

  handleDisconnect(client: any) {
    console.log("chat disconnected")
  }

}