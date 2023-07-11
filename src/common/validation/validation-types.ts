/**
 * VALIDATION
 * Lista os tipos de Validacao possiveis. Herda os tipos do Class-Validator
 *
 * @author Germano Junior
 */
export class ValidationTypes {
  /** Custom . */
  static IS_REQUIRED = 'isRequired';
  static IS_PHONE_BR = 'isPhoneBR';
  static IS_VALID_CPF = 'isValidCpf';
  static IS_VALID_CNPJ = 'isValidCnpj';
  static IS_VALID_RANGE_DATE = 'isValidRangeDate';

  static NESTED_VALIDATION_MESSAGE = 'Valor inválido para o campo';
  static UNACCEPTABLE_FIELD_MESSAGE = 'Campo informado não existe';
  /**
   * ERROS
   * Abaixo, estão os erros principais de validação.
   * Existe um ordem neles, dado que so será retornado o mais prioritário
   *
   * Ordem:
   * 1 - Campos não aceitos
   * 2 - Campos Obrigatórios
   * 3 - Tipo errado do campo
   * 4 - Outros erros não listados
   */

  /** Lista de erros de campo obrigatorio. */
  static requiredFieldErrors = [ValidationTypes.IS_REQUIRED];
  /** Lista de erros de tipo errado. */
  static wrongTypeFieldErrors = [
    ValidationTypes.IS_REQUIRED,
    ValidationTypes.IS_PHONE_BR,
    ValidationTypes.IS_VALID_CNPJ,
    ValidationTypes.IS_VALID_CPF,
  ];
}
