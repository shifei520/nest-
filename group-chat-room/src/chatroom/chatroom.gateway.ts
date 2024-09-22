import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { ChatroomService } from './chatroom.service';
import { CreateChatroomDto } from './dto/create-chatroom.dto';
import { UpdateChatroomDto } from './dto/update-chatroom.dto';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class ChatroomGateway {
  @WebSocketServer() server: Server;
  constructor(private readonly chatroomService: ChatroomService) {}

  @SubscribeMessage('joinRoom')
  joinRoom(client: Socket, payload: any) {
    console.log(payload.roomName);
    client.join(payload.roomName);
    this.server.to(payload.roomName).emit('message', {
      nickName: payload.nickName,
      message: `${payload.nickName} 加入了 ${payload.roomName} 房间`,
    });
  }
  @SubscribeMessage('sendMessage')
  sendMessage(client: Socket, payload: any) {
    console.log(payload);
    this.server.to(payload.room).emit('message', {
      nickName: payload.nickName,
      message: payload.message,
    });
  }
}
