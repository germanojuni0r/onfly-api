/**
 * MENSAGENS DE RETORNO
 * Define modelo de classes que encapsulam definicao de constantes com mensangens de retorno para actions da api do sistema
 *
 * @author Germano Junior
 */
export abstract class GenericReturnMessages {
  static readonly ERR_500 =
    'Falha inesperada. Tente novamente em instantes. Se persistir, favor contactar o administrador do sistema';
  static readonly ERR_FORBIDDEN =
    'Você não tem permissão para realizar esta operação';
  static readonly ERR_INVALID_INPUT = 'Entrada inválida ou incompleta';
  static readonly ERR_ACCESS_DENIED =
    'Você não possui permissão pode realizar esta operação';
}
