import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatService } from './chat/chat.service';
import { ChatController } from './chat/chat.controller';
import { ChatModule } from './chat/chat.module';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [ChatModule, AuthModule, UserModule, JwtModule.register({
    global: true,
    secret: 'dontTellAnyone',
    signOptions: { expiresIn: '30d' },
  })],
  controllers: [AppController, ChatController],
  providers: [AppService, ChatService, UserService, PrismaService, JwtService],
})
export class AppModule {}
