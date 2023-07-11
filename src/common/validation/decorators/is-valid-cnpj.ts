import {registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface} from 'class-validator'
import {ValidationTypes} from '../validation-types'

import * as cnpj from "@fnando/cnpj"

/**
 * VALIDATOR
 * Valida Cpf
 *
 * @author Germano Junior
 */
@ValidatorConstraint({name: ValidationTypes.IS_VALID_CNPJ})
class IsValidCnpjConstraint implements ValidatorConstraintInterface {

    validate(value: string, args: ValidationArguments): boolean {
        return cnpj.isValid(value)
    }

    defaultMessage(args: ValidationArguments): string {
        return 'Cnpj Inválido!'
    }
}


/**
 * DECORATOR
 * @param {ValidationOptions} validationOptions
 * @return {(object: Object, propertyName: string) => void}
 * @constructor
 */
export function IsValidCnpj(validationOptions?: ValidationOptions) {
    return (object: {}, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsValidCnpjConstraint,
        })
    }
}
