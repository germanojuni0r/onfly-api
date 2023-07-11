/**
 * DTO
 * Dto do retorno do login de dados do usuário
 *
 * @author Germano Junior
 */

import { IResponseDTO } from 'src/common/system/generics/i-response.dto';
import { IsRequired } from 'src/common/validation/decorators/is-required';
import { IsString } from 'src/common/validation/decorators/is-string';
import { UserEntity } from '../../../src/models/user.entity';
import { UserResponseDTO } from './user.response.dto';

export class UserLoginDataResponseDTO implements IResponseDTO {
  constructor(token: string, user: UserEntity) {
    this.token = token;
    this.user = new UserResponseDTO(user);
  }

  @IsRequired()
  @IsString()
  token: string;

  @IsRequired()
  user: UserResponseDTO;
}
