import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { StatisticsModule } from './statistics/statistics.module';
import { AppSockets } from './sockets/app.sockets';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { RoomsModule } from './rooms/rooms.module';
import { RoundsModule } from './rounds/rounds.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    UsersModule, 
    AuthModule, 
    StatisticsModule, RoomsModule, RoundsModule],
    providers: [AppSockets],
})
export class AppModule {}
