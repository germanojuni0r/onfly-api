/**
 * DTO
 * Dto do retorno do usuario
 *
 * @author Germano Junior
 */

import { IsNumber } from 'class-validator';
import { IResponseDTO } from 'src/common/system/generics/i-response.dto';
import { IsRequired } from 'src/common/validation/decorators/is-required';
import { IsString } from 'src/common/validation/decorators/is-string';
import { UserEntity } from '../../../src/models/user.entity';

export class UserResponseDTO implements IResponseDTO {
  constructor(expense: UserEntity) {
    this.id = expense.id;
    this.name = expense.name;
    this.cpf = expense.cpf;
    this.email = expense.email;
    this.isActive = expense.isActive;
  }

  @IsRequired()
  @IsNumber()
  id: number;

  @IsRequired()
  @IsString()
  name: string;

  @IsRequired()
  @IsString()
  cpf: string;

  @IsRequired()
  @IsString()
  email: string;

  @IsRequired()
  @IsNumber()
  isActive: number;
}
