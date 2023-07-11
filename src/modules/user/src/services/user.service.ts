import { Injectable } from '@nestjs/common';

import { UserEntity } from '../models/user.entity';
import { ApiErrorCodeEnum } from 'src/common/system/enums/api-error-code.enum';
import { IError } from 'src/common/system/enums/generics/interfaces/i-error';
import { UserDAO } from './daos/user.dao';
import { IAuthTokenData } from '../interfaces/i-auth-token-dats';
import { UserSignupRequestDTO } from '../dtos/request/user-signup.request.dto';
import { UserLoginRequestDTO } from '../dtos/request/user-login.request.dto';
import { CryptoUtils } from 'src/common/utils/crypto-utils';
import { AuthUtils } from '../utils/auth.utils';
import { AccessTokenDAO } from './daos/access-token.dao';
import { UserLoginDataResponseDTO } from '../dtos/response/user-login-data.response.dto';
import { AccessTokenEntity } from '../models/access-token.entity';
import { SystemProperties } from 'src/config/system-properties';
import moment from 'moment';

/**
 * Service dos usuários. Onde as requisições são processadas.
 * @author Germano Junior
 */

@Injectable()
export class UserService {
  constructor(
    private readonly _userDAO: UserDAO,
    private readonly _accessTokenDAO: AccessTokenDAO,
  ) {}

  async findOne(userId: number): Promise<UserEntity> {
    const user = await this._userDAO.findById(userId);

    if (!user) throw { code: ApiErrorCodeEnum.USER_NOT_FOUND } as IError;

    return user;
  }

  async signup(dto: UserSignupRequestDTO): Promise<UserEntity> {
    const foundUser = await this._userDAO.findOne({
      where: [{ cpf: dto.cpf }, { email: dto.email }],
    });

    if (foundUser)
      throw { code: ApiErrorCodeEnum.USER_ALREADY_EXISTS } as IError;

    const newPasswordObject = await this._createPassword(
      dto.email,
      dto.password,
    );

    return await this._userDAO.create({
      ...dto,
      salt: newPasswordObject.salt,
      password: newPasswordObject.password,
      isActive: 1,
    });
  }

  async login(dto: UserLoginRequestDTO): Promise<UserLoginDataResponseDTO> {
    const user: UserEntity | undefined = await this._userDAO.findOne({
      where: { cpf: dto.cpf },
    });

    if (!user) {
      throw { code: ApiErrorCodeEnum.USER_NOT_FOUND } as IError;
    }

    const salt = CryptoUtils.decrypt(user.salt);
    if (!CryptoUtils.compareHash(user.password, dto.password, salt)) {
      throw { code: ApiErrorCodeEnum.INVALID_CREDENTIALS } as IError;
    }

    return this._handleLoginResult(user);
  }

  async findUserByToken(token: string): Promise<UserEntity | undefined> {
    const accessToken = await this._accessTokenDAO.findByToken(token);
    if (!!accessToken) {
      return await this._userDAO.findById(accessToken.userId);
    }
  }

  async getAuthorizedAccessData(
    token: string,
    userPayload: IAuthTokenData,
  ): Promise<AccessTokenEntity | null> {
    const foundAccessData = await this._accessTokenDAO.findByToken(token);

    if (
      !!foundAccessData &&
      !!foundAccessData.userId &&
      UserService._isValidToken(foundAccessData, userPayload)
    )
      return foundAccessData;

    return null;
  }

  async removeAccessToken(token: string): Promise<void> {
    await this._accessTokenDAO.deleteByToken(token);
  }

  private async _createPassword(email: string, password: string): Promise<any> {
    const salt = CryptoUtils.getDefaultDecryptedSalt(email);

    return {
      salt: CryptoUtils.reversibleEncrypt(salt),
      password: CryptoUtils.encrypt(password, salt),
    };
  }

  private async _handleLoginResult(
    user: UserEntity | undefined,
  ): Promise<UserLoginDataResponseDTO> {
    if (!user) throw { code: ApiErrorCodeEnum.USER_NOT_FOUND } as IError;

    return new UserLoginDataResponseDTO(
      await this._getRegisteredToken(user.id),
      user,
    );
  }

  private async _getRegisteredToken(userId: number): Promise<string> {
    const token = AuthUtils.getAuthToken({ userId });
    const newAccessToken = await this._accessTokenDAO.create({
      token,
      userId,
    });

    if (newAccessToken)
      await this._accessTokenDAO.deleteLastToken(userId, newAccessToken.id);

    return token;
  }

  private static _isValidToken(
    accessToken: AccessTokenEntity,
    payload: IAuthTokenData,
  ): boolean {
    const expirationHours = SystemProperties.getTokenExpirationHours();

    const isTimeValid = moment(accessToken.createdAt)
      .add(expirationHours, 'hour')
      .isAfter(moment());

    return isTimeValid && accessToken.userId === payload.userId;
  }
}
