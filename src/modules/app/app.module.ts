import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../user/user.module';
import { DBConfig } from 'src/config/db-config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenseModule } from '../expense/expense.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(DBConfig.connectionOptions),
    UserModule,
    ExpenseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
