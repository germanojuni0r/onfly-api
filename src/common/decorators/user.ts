import { ExecutionContext, createParamDecorator } from '@nestjs/common';

/**
 * DECORATOR
 * Fornece usuario atual, logado.
 *
 * @author Germano Junior
 */

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
