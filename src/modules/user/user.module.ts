// Models

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { UserEntity } from './src/models/user.entity';
import { SystemProperties } from 'src/config/system-properties';
import { UserController } from './src/user.controller';
import { UserService } from './src/services/user.service';
import { UserDAO } from './src/services/daos/user.dao';
import { JwtStrategy } from './src/services/strategies/jwt.strategy';
import { AccessTokenEntity } from './src/models/access-token.entity';
import { AccessTokenDAO } from './src/services/daos/access-token.dao';
import { ApiLogger } from 'src/common/system/logger/api-logger';

/**
 * Modulo de usuários. Onde os Controllers/Services, etc são carregados no sistema.
 * @author Germano Junior
 */

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, AccessTokenEntity]),
    JwtModule.register({ secret: SystemProperties.authSecretKey() }),
  ],
  controllers: [UserController],
  providers: [UserService, UserDAO, AccessTokenDAO, ApiLogger, JwtStrategy],
  exports: [JwtStrategy],
})
export class UserModule {}
