import {
  ArgumentsHost,
  ExceptionFilter,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiErrorCodeEnum } from '../system/enums/api-error-code.enum';
import { ApiLogger } from '../system/logger/api-logger';
import { ApiUnauthorizedException } from '../exceptions/api-unauthorized.exception';
import { GenericReturnMessages } from '../system/generics/generic-return-messages';
import { ApiForbiddenException } from '../exceptions/api-forbidden.exception';
import { DatabaseErrorCodeEnum } from '../system/enums/database-error-code.enum';
import { IApiReturn } from '../system/enums/generics/interfaces/i-api-return';
import { IError } from '../system/enums/generics/interfaces/i-error';

/**
 * FILTRO DE EXCESSOES
 * Classe mae a ser extendida por classes que implementam a funcionalidade de filtros de excessao.
 *
 * @author Germano Junior
 * @see https://docs.nestjs.com/exception-filters
 */
export class GlobalExceptionFilters implements ExceptionFilter {
  /** @var {Response} Objeto resposta do Express (usado para gerar retorno para as falhas). */
  protected res!: Response | null;

  /** @var {string} Path da requisicao na qual ocorreu a falha. */
  protected endpoint!: string;

  /** @var {HttpMethodEnum} Metodo com que foi feita a requsicao na qual ocorreu a falha. */
  protected httpMethod!: string;

  /** @var {any} Excecao atual sendo tratada. */
  protected exception: any;

  /** @var {number} Codigo do erro tratado (caso identificado). */
  protected errorCode!: number;

  /** @var {HttpStatus} Status de retorno de api gerado. */
  protected responseStatus!: HttpStatus;

  /** @var {IApiReturn} Corpo do retorno de api gerado. */
  protected responseBody!: IApiReturn;

  /** @var {string} Mensagem de log a ser emitida antes de gerar o retorno da api. */
  protected infoLogMsg!: string;

  /** Construtor. */
  constructor(@Inject(ApiLogger) protected readonly logger: ApiLogger) {}

  /**
   * Trata e gera retorno adequado em caso de lancamento de excessoes durante execucao da api.
   *
   * @param {HttpException} exception
   * @param {ArgumentsHost} host
   * @return {void}
   */
  catch(exception: any, host: ArgumentsHost): void {
    this.resetParams();

    const ctx = host.switchToHttp();
    const req = ctx.getRequest();
    this.res = ctx.getResponse();

    this.endpoint = req.url;
    this.httpMethod = req.method;
    this.exception = exception;

    this.treatException();
  }

  /**
   * Gera retorno da api, efetivamente, e log de notificacao (se houver mensagem de log a ser emitida).
   * @return {void}
   */
  protected sendResponse(): void {
    if (!!this.infoLogMsg) {
      this.logger.info(null, this.infoLogMsg);
    }

    if (this.res) this.res.status(this.responseStatus).send(this.responseBody);
  }

  /**
   * Estabelece tratamento para falhas genericas ou inesperadas lancadas de qualquer local da api.
   *
   * @return {void}
   */
  protected treatGeneralAndUnexpectedErrors(): void {
    if (this.exception instanceof ApiForbiddenException) {
      return this.returnForbiddenError();
    }

    // Acesso Negado
    if (
      this.exception instanceof ApiUnauthorizedException ||
      (!!this.exception.status &&
        this.exception.status === HttpStatus.UNAUTHORIZED)
    ) {
      return this.returnDeniedAccessError();
    }

    // Falha de Validacao
    if (this.exception.status === HttpStatus.BAD_REQUEST) {
      if (!this.exception.response) {
        return this.returnInvalidJsonError(this.exception.message);
      } else {
        return this.returnValidationError(this.exception.response.message);
      }
    }

    // Falha de Validacao
    if (
      !!this.exception.code &&
      this.exception.code === ApiErrorCodeEnum.INVALID_INPUT
    ) {
      return this.returnValidationError();
    }

    // Acesso Proibido (falha na validacao do schema)
    if (!!this.exception.code && this.exception.code === HttpStatus.FORBIDDEN) {
      return this.returnForbiddenError();
    }

    if (
      this.exception.code === HttpStatus.NOT_FOUND ||
      (!!this.exception.status &&
        this.exception.status === HttpStatus.NOT_FOUND)
    )
      return this.returnNotFoundError();

    // Violacao de indice unique (postgre)
    if (
      +this.exception.code === DatabaseErrorCodeEnum.ER_DUP_ENTRY ||
      +this.exception.code === DatabaseErrorCodeEnum.ER_DUP_ENTRY_WITH_KEY_NAME
    )
      return this.returnDBUniqueViolationError();

    // Falha inesperada
    this.logger.critical(
      `>>> FALHA\n- Endpoint: ${this.endpoint}\n- Method: ${
        this.httpMethod
      }\n- Type: ' + (${typeof this.exception})'\n' ${JSON.stringify(
        this.exception,
      )} '\n'`,
    );

    console.log(this.exception);

    const returnBody: IApiReturn = {
      message: this.exception.message
        ? this.exception.message
        : GenericReturnMessages.ERR_500,
    };

    if (this.res)
      this.res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(returnBody);
  }

  /** Executa tratamento customizado para falhas capturadas. */
  protected treatException(): void {
    this.treatGeneralAndUnexpectedErrors();
  }

  /** Reseta valores para que nenhuma filtragem nao interfira nas outras. */
  private resetParams(): void {
    this.res = null;
    this.endpoint = '';
    this.httpMethod = '';
    this.exception = null;
    this.errorCode = 0;
    this.responseStatus = HttpStatus.UNAUTHORIZED;
    this.responseBody = {};
    this.infoLogMsg = '';
  }

  /** Trata & gera retorno para ocasiao de erro de BD: Violacao de chave unique. */
  private returnDBUniqueViolationError(): void {
    this.infoLogMsg = `ERRO DE BANCO - Violacao de PK ou indice Unique | Endpoint: ${this.endpoint}`;
    this.responseStatus = HttpStatus.CONFLICT;
    this.responseBody = { message: 'Registro duplicado' };
    this.sendResponse();
  }

  /**
   * Gera retorno padrao para falha do tipo: Acesso negado.
   *
   * @return {void}
   */
  private returnDeniedAccessError(): void {
    this.infoLogMsg = !!this.exception.user
      ? `Denied Access for user: [${this.exception.user.code}] ${this.exception.user.name} | Endpoint: ${this.endpoint}`
      : `Denied Access (user not identified) | Endpoint: ${this.endpoint}`;

    this.responseStatus = HttpStatus.UNAUTHORIZED;
    this.responseBody = { message: GenericReturnMessages.ERR_ACCESS_DENIED };
    this.sendResponse();
  }

  /**
   * Gera retorno padrao para falha do tipo: Erro de validacao.
   * @return {void}
   */
  private returnValidationError(errors?: IError[]): void {
    errors = errors || this.exception.errors;

    this.infoLogMsg = `Invalid input error: Endpoint: "${this.endpoint}" | Method: ${this.httpMethod}`;
    this.responseStatus = HttpStatus.BAD_REQUEST;

    this.responseBody = {
      code: ApiErrorCodeEnum.INVALID_INPUT,
      message: GenericReturnMessages.ERR_INVALID_INPUT,
      errors,
    };

    this.sendResponse();
  }

  /** Gera retorno padrao para falha do tipo: Acesso Proibido. */
  private returnForbiddenError(): void {
    this.infoLogMsg = GenericReturnMessages.ERR_FORBIDDEN;
    this.responseStatus = HttpStatus.FORBIDDEN;
    this.responseBody = { message: GenericReturnMessages.ERR_FORBIDDEN };
    this.sendResponse();
  }

  /** Gera retorno padrao para falha do tipo: Path nao encontrado. */
  private returnNotFoundError(): void {
    this.infoLogMsg = '';
    this.responseStatus = HttpStatus.NOT_FOUND;
    this.responseBody = {};
    this.sendResponse();
  }

  /**
   * Gera retorno padrao para falha do tipo: JSON Invalido.
   * @param {{}} message
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  private returnInvalidJsonError(message: {}): void {
    this.infoLogMsg = '';
    this.responseStatus = HttpStatus.BAD_REQUEST;
    this.responseBody = message;
    this.sendResponse();
  }
}
