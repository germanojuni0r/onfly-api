import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';

import { ExtractJwt, Strategy } from 'passport-jwt';
import { ApiUnauthorizedException } from 'src/common/exceptions/api-unauthorized.exception';
import { IGetUserAuthInfoRequest } from 'src/common/system/interfaces/i-get-user-auth-info.request';
import { ApiLogger } from 'src/common/system/logger/api-logger';
import { SystemProperties } from 'src/config/system-properties';
import { PassportStrategy } from '@nestjs/passport';
import { IAuthTokenData } from '../../interfaces/i-auth-token-dats';
import { UserEntity } from '../../models/user.entity';
import { UserService } from '../user.service';

/**
 * SERVICO: Strategy
 * Implementa logica para autenticar tokens de acesso de usuario na api do sistema
 *
 * @see https://docs.nestjs.com/techniques/authentication
 * @author Germano Junior
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly _logger: ApiLogger,
    private readonly _userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: SystemProperties.authSecretKey(),
      passReqToCallback: true,
    });
  }

  /**
   * Executa autenticacao para acesso a uma rota:
   * Atualiza codigo do usuario a ser utilizado como autor das acoes gravadas nos logs de evento;
   */
  async validate(
    req: IGetUserAuthInfoRequest,
    payload: IAuthTokenData,
    done: Function,
  ): Promise<void> {
    const token: string = _.get(req, 'headers.authorization', '').replace(
      'Bearer ',
      '',
    );
    const user: UserEntity | null | undefined =
      await this._userService.findUserByToken(token);

    if (!user) {
      const authData = await this._userService.getAuthorizedAccessData(
        token,
        payload,
      );
      const mustRemoveToken = !authData;

      if (mustRemoveToken) await this._userService.removeAccessToken(token);

      //   user = authData && authData.user;
    }

    if (!!user) {
      this._logger.info(
        null,
        `Usuário autenticado com sucesso: [${user.id}] ${user.name}`,
      );
      done(null, user);
    } else return done(new ApiUnauthorizedException(), false);
  }
}
