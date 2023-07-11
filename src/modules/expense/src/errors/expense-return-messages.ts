import { GenericReturnMessages } from 'src/common/system/generics/generic-return-messages';

/**
 * MENSAGENS DE RETORNO
 * Encapsula mensagens de retorno da api para actions relacionadas a AUTENTICACAO de acesso no sistema
 *
 * @author Germano Junior
 */
export class ExpenseReturnMessages extends GenericReturnMessages {
  public static readonly DESCRIPTION_IS_BIGGER_THAN_MAX =
    'Descrição é maior que o permitido';
  public static readonly INVALID_VALUE = 'Valor inválido';
  public static readonly INVALID_DATE = 'Data inválida';

  private constructor() {
    super();
  }
}
