import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { GlobalExceptionFilters } from 'src/common/filters/global-exception.filters';
import { ApiErrorCodeEnum } from 'src/common/system/enums/api-error-code.enum';
import { UserReturnMessages } from './user-return-messages';

/**
 * FILTRO DE EXCESSOES
 * Filtro para tratar erros & falhas de execucao relacionadas a AUTENTICACAO de acesso no sistema
 *
 * @author Germano Junior
 * @see https://docs.nestjs.com/exception-filters
 */
@Catch()
export class UserExceptionFilter extends GlobalExceptionFilters {
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
      case ApiErrorCodeEnum.INVALID_INPUT:
        message = UserReturnMessages.INVALID_INPUT;

        this.responseStatus = HttpStatus.BAD_REQUEST;
        this.infoLogMsg = message;
        this.responseBody = { message };
        break;

      case ApiErrorCodeEnum.INVALID_CREDENTIALS:
        message = UserReturnMessages.INVALID_CREDENTIALS;

        this.responseStatus = HttpStatus.BAD_REQUEST;
        this.infoLogMsg = message;
        this.responseBody = { message };
        break;

      case ApiErrorCodeEnum.USER_NOT_FOUND:
        message = UserReturnMessages.USER_NOT_FOUND;

        this.responseStatus = HttpStatus.NOT_FOUND;
        this.infoLogMsg = message;
        this.responseBody = { message };
        break;

      case ApiErrorCodeEnum.USER_ALREADY_EXISTS:
        message = UserReturnMessages.USER_ALREADY_EXISTS;

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
