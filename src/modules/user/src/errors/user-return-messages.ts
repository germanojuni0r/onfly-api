import { GenericReturnMessages } from 'src/common/system/generics/generic-return-messages';

/**
 * MENSAGENS DE RETORNO
 * Encapsula mensagens de retorno da api para actions relacionadas a AUTENTICACAO de acesso no sistema
 *
 * @author Germano Junior
 */
export class UserReturnMessages extends GenericReturnMessages {
  public static readonly INVALID_INPUT = 'Entrada inválida';
  public static readonly INVALID_CREDENTIALS = 'Credenciais inválidas';
  public static readonly USER_NOT_FOUND = 'Usuário não encontrado';
  public static readonly USER_ALREADY_EXISTS = 'Usuário já existe';

  private constructor() {
    super();
  }
}
