import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { CoreModule } from './core/core.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    CoreModule, 
    CatsModule, 
    TypeOrmModule.forRoot(
      typeOrmConfig
    ), AuthModule, UserModule
  ],
})
export class AppModule { }
