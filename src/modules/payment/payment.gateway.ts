import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { AuthService } from '../auth/auth.service';

import { Socket, Server } from 'socket.io';
import { JwtPayload } from '../auth/interfaces/token.interface';
import { PaymentService } from './payment.service';
import { TopicService } from '../topic/topic.service';

@WebSocketGateway({ namespace: 'payment' })
export class PaymentGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly authService: AuthService,
    private readonly paymentService: PaymentService,
    private readonly topicService: TopicService,
  ) {}

  @WebSocketServer() wss: Server;

  handleConnection(socket: Socket) {
    const tokenData = this.getTokenData(socket);
    console.log('connected socket', tokenData.clientId);

    socket.join(tokenData.roomId);
    console.log('join', tokenData.roomId);
  }

  handleDisconnect(socket: Socket) {
    const tokenData = this.getTokenData(socket);
    console.log('disconnect socket', tokenData.clientId);

    socket.leave(tokenData.roomId);
    console.log('leave', tokenData.roomId);
  }

  getTokenData(socket: Socket): JwtPayload {
    try {
      const token = this.authService.getTokenFromSocket(socket);
      return this.authService.decode(token);
    } catch (e) {
      throw new Error(e);
    }
  }

  @SubscribeMessage('showPayments')
  async showPayments(socket: Socket) {
    console.log('showPayments');
    const tokenData = this.getTokenData(socket);
    const payments = await this.topicService.payments(tokenData.roomId);

    this.wss.to(tokenData.roomId).emit('payments', payments);
  }

  @SubscribeMessage('createPayment')
  async createPayment(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: any,
  ) {
    // const tokenData = this.getTokenData(socket);

    await this.paymentService.payment({
      payment: data.payment,
      name: data.username,
      topic: data.topic,
      clientId: data.clientId,
    });

    this.showPayments(socket);
  }

  @SubscribeMessage('showResult')
  async showResult(socket: Socket) {
    console.log('showResult');
    const tokenData = this.getTokenData(socket);
    const topic = await this.topicService.latestTopic(tokenData.roomId);
    const mostPaymentd = await this.topicService.mostPaymentdOfTopic(topic.id);

    const result = [];
    let max = 0;

    mostPaymentd.forEach((cur: any) => {
      if (cur.total >= max) {
        max = cur.total;
        result.push(cur.payment);
      }
    });

    this.wss.to(tokenData.roomId).emit('result', result);
  }
}
