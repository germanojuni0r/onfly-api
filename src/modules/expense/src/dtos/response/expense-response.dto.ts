/**
 * DTO
 * Dto do retorno do login de dados do usuário
 *
 * @author Germano Junior
 */

import { IsDate, IsNumber } from 'class-validator';
import { IResponseDTO } from 'src/common/system/generics/i-response.dto';
import { IsRequired } from 'src/common/validation/decorators/is-required';
import { IsString } from 'src/common/validation/decorators/is-string';
import { ExpenseEntity } from '../../models/expense.entity';

export class ExpenseResponseDTO implements IResponseDTO {
  constructor(expense: ExpenseEntity) {
    this.id = expense.id;
    this.description = expense.description;
    this.date = expense.date;
    this.value = expense.value;
  }

  @IsRequired()
  @IsNumber()
  id: number;

  @IsRequired()
  @IsString()
  description: string;

  @IsRequired()
  @IsDate()
  date: Date;

  @IsRequired()
  @IsNumber()
  value: number;
}
