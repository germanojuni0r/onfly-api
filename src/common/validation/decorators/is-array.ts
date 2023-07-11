import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import * as validator from 'class-validator';

/**
 * VALIDATOR
 * Valida se é um number
 *
 * @author Germano Junior
 */
@ValidatorConstraint({ name: validator.IS_ARRAY })
class IsArrayConstraint implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments): boolean {
    return validator.isArray(value);
  }

  defaultMessage(args: ValidationArguments): string {
    return 'Valor deve ser um vetor!';
  }
}

/**
 * DECORATOR
 * @param {ValidationOptions} validationOptions
 * @return {(object: Object, propertyName: string) => void}
 * @constructor
 */
export function IsArray(validationOptions?: ValidationOptions) {
  return (object: {}, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsArrayConstraint,
    });
  };
}
