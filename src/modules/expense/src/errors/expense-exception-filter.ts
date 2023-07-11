import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { GlobalExceptionFilters } from 'src/common/filters/global-exception.filters';
import { ApiErrorCodeEnum } from 'src/common/system/enums/api-error-code.enum';
import { ExpenseReturnMessages } from './expense-return-messages';

/**
 * FILTRO DE EXCESSOES
 * Filtro para tratar erros & falhas de execucao relacionadas a AUTENTICACAO de acesso no sistema
 *
 * @author Germano Junior
 * @see https://docs.nestjs.com/exception-filters
 */
@Catch()
export class ExpenseExceptionFilter extends GlobalExceptionFilters {
  catch(exception: any, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest();
    this.res = ctx.getResponse();

    this.endpoint = req.url;
    this.httpMethod = req.method;
    this.exception = exception;

    if (!this.caughtModuleErrors()) return this.treatException();

    return;
  }

  /**
   * @inheritDoc
   */
  protected caughtModuleErrors(): boolean {
    if (!this.isModuleError()) return false;

    super.sendResponse();
    return true;
  }

  /**
   * Avalia excessao ocorrida neste modulo
   * Se for, gera parametrizacao necessaria para montar o retorno de api apropriado.
   */
  private isModuleError(): boolean {
    let message: string;

    switch (this.exception.code) {
      case ApiErrorCodeEnum.DESCRIPTION_IS_BIGGER_THAN_MAX:
        message = ExpenseReturnMessages.DESCRIPTION_IS_BIGGER_THAN_MAX;

        this.responseStatus = HttpStatus.BAD_REQUEST;
        this.infoLogMsg = message;
        this.responseBody = { message };
        break;

      case ApiErrorCodeEnum.INVALID_VALUE:
        message = ExpenseReturnMessages.INVALID_VALUE;

        this.responseStatus = HttpStatus.BAD_REQUEST;
        this.infoLogMsg = message;
        this.responseBody = { message };
        break;

      case ApiErrorCodeEnum.INVALID_DATE:
        message = ExpenseReturnMessages.INVALID_DATE;

        this.responseStatus = HttpStatus.BAD_REQUEST;
        this.infoLogMsg = message;
        this.responseBody = { message };
        break;

      default:
        return false;
    }

    return true;
  }
}
