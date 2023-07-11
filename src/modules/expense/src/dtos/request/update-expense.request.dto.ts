/**
 * DTO
 * Dto da requisição de atualização de despesa
 *
 * @author Germano Junior
 */

import { IsNumber, IsOptional } from 'class-validator';
import { IsString } from 'src/common/validation/decorators/is-string';

export class UpdateExpenseRequestDTO {
  constructor(description: string, date: string, value: number) {
    this.description = description;
    this.date = date;
    this.value = value;
  }

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  date?: string;

  @IsOptional()
  @IsNumber()
  value?: number;
}
