import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { CoreModule } from './core/core.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/config';

@Module({
  imports: [
    CoreModule, 
    CatsModule, 
    TypeOrmModule.forRoot(
      typeOrmConfig
    )
  ],
})
export class AppModule { }
