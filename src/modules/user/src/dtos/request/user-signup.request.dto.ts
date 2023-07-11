/**
 * DTO
 * Dto da requisição de criar um usuário
 *
 * @author Germano Junior
 */

import { IsNotEmpty } from 'class-validator';
import { IsEmail } from 'src/common/validation/decorators/is-email';
import { IsRequired } from 'src/common/validation/decorators/is-required';
import { IsString } from 'src/common/validation/decorators/is-string';
import { IsValidCpf } from 'src/common/validation/decorators/is-valid-cpf';
import { MaxLength } from 'src/common/validation/decorators/max-length';

export class UserSignupRequestDTO {
  @IsRequired()
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name!: string;

  @IsRequired()
  @IsValidCpf()
  cpf!: string;

  @IsRequired()
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(255)
  email!: string;

  @IsRequired()
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  password!: string;
}
