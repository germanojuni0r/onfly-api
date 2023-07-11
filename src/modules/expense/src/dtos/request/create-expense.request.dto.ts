/**
 * DTO
 * Dto da requisição de criacao de despesa
 *
 * @author Germano Junior
 */

import { IsNumber } from 'class-validator';
import { IsRequired } from 'src/common/validation/decorators/is-required';
import { IsString } from 'src/common/validation/decorators/is-string';

export class CreateExpenseRequestDTO {
  constructor(description: string, date: string, value: number) {
    this.description = description;
    this.date = date;
    this.value = value;
  }

  @IsRequired()
  @IsString()
  description: string;

  @IsRequired()
  @IsString()
  date: string;

  @IsRequired()
  @IsNumber()
  value: number;
}
