import * as jwt from 'jsonwebtoken';
import { ApiErrorCodeEnum } from 'src/common/system/enums/api-error-code.enum';
import { IError } from 'src/common/system/enums/generics/interfaces/i-error';
import { SystemProperties } from 'src/config/system-properties';
import { IAuthTokenData } from '../interfaces/i-auth-token-dats';

/**
 * UTILS
 * Reune metodos auxiliares relacionados a autenticacao.
 *
 * @author Germano Junior
 */
export class AuthUtils {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  /** Gera & retorna token de autenticacao para login de usuario. */
  static getAuthToken(tokenData: IAuthTokenData): string {
    const authSecretKey = SystemProperties.authSecretKey();

    if (!authSecretKey) {
      throw { code: ApiErrorCodeEnum.INVALID_CREDENTIALS } as IError;
    }

    return jwt.sign(tokenData, authSecretKey);
  }
}
