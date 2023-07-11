import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import * as validator from 'class-validator';
import * as _ from 'lodash';

/**
 * VALIDATOR
 * Valida tamanho de string
 *
 * @author Germano Junior
 */
@ValidatorConstraint({ name: validator.MAX_LENGTH })
class MaxLengthConstraint implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments): boolean {
    return validator.maxLength(value, args.constraints[0]);
  }

  defaultMessage(args: ValidationArguments): string {
    return `Texto excede o tamanho máximo permitido de ${args.constraints[0]}`;
  }
}

/**
 * DECORATOR
 * @param max tamanho máximo da string
 * @param {ValidationOptions} validationOptions
 * @return {(object: Object, propertyName: string) => void}
 * @constructor
 */
export function MaxLength(max: number, validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return (object: {}, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [max],
      validator: MaxLengthConstraint,
    });
  };
}
