import { UnauthorizedException } from '@nestjs/common';
import { GenericReturnMessages } from '../system/generics/generic-return-messages';

/**
 * EXCEPTION
 * Excessao customizada para tratamento de falhas de permissao de acesso aos endpoints da api do sistema
 *
 * @author Germano Junior
 */
export class ApiForbiddenException extends UnauthorizedException {
  public constructor(public user?: any) {
    super(GenericReturnMessages.ERR_ACCESS_DENIED);
  }
}
