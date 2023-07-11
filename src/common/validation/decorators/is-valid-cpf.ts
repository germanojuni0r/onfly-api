import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'
import * as cpf from "@fnando/cpf";
import * as _ from 'lodash'

import { ValidationTypes } from '../validation-types'

/**
 * VALIDATOR
 * Valida Cpf
 *
 * @author Germano Junior
 */
@ValidatorConstraint({name: ValidationTypes.IS_VALID_CPF})
class IsValidCpfConstraint implements ValidatorConstraintInterface {

    validate(value: string, args: ValidationArguments): boolean {
        return !_.isEmpty(value) && cpf.isValid(value)
    }

    defaultMessage(args: ValidationArguments): string {
        return 'Cpf Inválido!'
    }
}


/**
 * DECORATOR
 * @param {ValidationOptions} validationOptions
 * @return {(object: Object, propertyName: string) => void}
 * @constructor
 */
export function IsValidCpf(validationOptions?: ValidationOptions) {
    return (object: {}, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsValidCpfConstraint,
        })
    }
}
