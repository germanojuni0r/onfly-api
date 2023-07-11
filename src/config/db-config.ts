import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ExpenseEntity } from 'src/modules/expense/src/models/expense.entity';
import { AccessTokenEntity } from 'src/modules/user/src/models/access-token.entity';
import { UserEntity } from 'src/modules/user/src/models/user.entity';
import { SystemProperties } from './system-properties';

/**
 * CONFIG
 * Encapsula logica de configuracao para BANCO DE DADOS da api do sistema.
 *
 * @author Germano Junior
 */
export class DBConfig {
  public static readonly connectionOptions: TypeOrmModuleOptions = {
    type: 'mysql',
    host: SystemProperties.dbHost(),
    port: SystemProperties?.dbPort(),
    username: SystemProperties.dbUser(),
    password: SystemProperties.dbPassword(),
    database: SystemProperties.dbName(),
    entities: [UserEntity, AccessTokenEntity, ExpenseEntity],
    logging: false,
    migrations: ['**/config/migrations/**/*.js'],
  };
}
