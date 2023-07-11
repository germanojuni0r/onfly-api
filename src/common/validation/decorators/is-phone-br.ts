import {registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface} from 'class-validator'
import * as validator from 'class-validator'
import {ValidationTypes} from '../validation-types'

/**
 * VALIDATOR
 * Valida numero de telefone (celular e fixo)
 *
 * @author Germano Junior
 */
@ValidatorConstraint({name: ValidationTypes.IS_PHONE_BR})
class IsPhoneBRConstraint implements ValidatorConstraintInterface {

    validate(value: string, args: ValidationArguments): boolean {
        return validator.matches(value, /\(\d{2}\)(\s*:?)(9\d{4}-\d{4}|[1-6]\d{3}-\d{4})/)
    }

    defaultMessage(args: ValidationArguments): string {
        return 'Telefone inválido! ((XX) XXXX-XXXX ou (XX) 9XXXX-XXXX)'
    }
}


/**
 * DECORATOR
 * @param {ValidationOptions} validationOptions
 * @return {(object: Object, propertyName: string) => void}
 * @constructor
 */
export function IsPhoneBR(validationOptions?: ValidationOptions) {
    return (object: {}, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsPhoneBRConstraint
        })
    }
}
