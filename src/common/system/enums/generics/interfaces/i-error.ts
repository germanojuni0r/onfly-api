import { ApiErrorCodeEnum } from '../../api-error-code.enum';
import { HttpStatus } from '@nestjs/common';

/**
 * INTERFACE
 * Padroniza formato de objeto descritor de erros na api do sistema
 *
 * @author Germano Junior
 */
export interface IError {
  code?: ApiErrorCodeEnum | HttpStatus;
  field: string;
  value?: any;
  errors?: Array<string | IError>;
}
