import {  CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class WsAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client = context.switchToWs().getClient();
    
    const token = client.handshake.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new WsException('Token not found');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: 'YourSecretKeyHere', // غير دي بالسر بتاعك
      });

      client['user'] = payload;
      
      return true;
    } catch (error) {
      throw new WsException('Invalid or expired token');
    }
  }
}