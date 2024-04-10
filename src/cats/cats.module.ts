import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsEntity } from './cats.entity';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [CatsController],
  imports: [TypeOrmModule.forFeature([CatsEntity]), UserModule],
  providers: [CatsService]
})
export class CatsModule {}
