/**
 * ENUM
 * Define codigos identificadores de erro da api do sistema.
 *
 * @author Germano Junior
 */
export enum ApiErrorCodeEnum {
  INVALID_INPUT = 1001, // Falha de validacao de entrada
  INVALID_CREDENTIALS = 1002, // Login ou senha invalidos
  USER_NOT_FOUND = 1003, // Usuário não encontrado
  USER_ALREADY_EXISTS = 1004, // Email ou CPF já utilizado em outra conta

  DESCRIPTION_IS_BIGGER_THAN_MAX = 2001, // Descrição é maior que o permitido
  INVALID_VALUE = 2002, // Valor inválido

  INVALID_DATE = 8001, // Falha genérica de data
}
