// Models

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { SystemProperties } from 'src/config/system-properties';
import { ExpenseEntity } from './src/models/expense.entity';
import { ExpenseController } from './src/expense.controller';
import { ExpenseService } from './src/services/expense.service';
import { ExpenseDAO } from './src/services/daos/expense.dao';
import { ApiLogger } from 'src/common/system/logger/api-logger';

/**
 * Modulo de despesas. Onde os Controllers/Services, etc são carregados no sistema.
 * @author Germano Junior
 */

@Module({
  imports: [
    TypeOrmModule.forFeature([ExpenseEntity]),
    JwtModule.register({ secret: SystemProperties.authSecretKey() }),
  ],
  controllers: [ExpenseController],
  providers: [ExpenseService, ExpenseDAO, ApiLogger],
})
export class ExpenseModule {}
