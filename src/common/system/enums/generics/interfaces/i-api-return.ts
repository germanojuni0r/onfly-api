import { ApiErrorCodeEnum } from '../../api-error-code.enum';
import { IError } from './i-error';
import { IResponseDTO } from '../../../generics/i-response.dto';

/**
 * INTERFACE
 * Padroniza corpo do retorno json gerado pela api do sistema.
 *
 * @author Germano Junior
 */
export interface IApiReturn<DataType = IResponseDTO> {
  code?: ApiErrorCodeEnum;
  message?: string;
  errors?: IError[];
  data?: DataType;
}
