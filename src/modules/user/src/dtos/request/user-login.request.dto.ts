/**
 * DTO
 * Dto da requisição de login do usuário
 *
 * @author Germano Junior
 */

import { IsRequired } from 'src/common/validation/decorators/is-required';
import { IsString } from 'src/common/validation/decorators/is-string';

export class UserLoginRequestDTO {
  constructor(cpf: string, password: string) {
    this.cpf = cpf;
    this.password = password;
  }

  @IsRequired()
  @IsString()
  cpf: string;

  @IsRequired()
  @IsString()
  password: string;
}
