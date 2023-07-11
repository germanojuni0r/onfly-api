import * as validator from 'class-validator';

import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';

import { ValidationTypes } from '../validation-types';

/**
 * VALIDATOR
 * Valida campo obrigatorio
 *
 * @author Germano Junior
 */
@ValidatorConstraint({ name: ValidationTypes.IS_REQUIRED })
class IsRequiredConstraint implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments): boolean {
    return validator.isDefined(value);
  }

  defaultMessage(args: ValidationArguments): string {
    return 'Campo obrigatório!';
  }
}

/**
 * DECORATOR
 * @param {ValidationOptions} validationOptions
 * @return {(object: Object, propertyName: string) => void}
 * @constructor
 */
export function IsRequired(validationOptions?: ValidationOptions) {
  return (object: {}, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsRequiredConstraint,
    });
  };
}
