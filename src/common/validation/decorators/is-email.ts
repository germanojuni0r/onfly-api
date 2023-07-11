import {registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface} from 'class-validator'
import * as validator from 'class-validator'
import * as _ from 'lodash'

/**
 * VALIDATOR
 * Valida Cpf
 *
 * @author Germano Junior
 */
@ValidatorConstraint({name: validator.IS_EMAIL})
class IsEmailConstraint implements ValidatorConstraintInterface {

    validate(value: string, args: ValidationArguments): boolean {
        return !_.isEmpty(value) && validator.isEmail(value)
    }

    defaultMessage(args: ValidationArguments): string {
        return 'E-mail inválido (email@xyz.com(.br))'
    }
}


/**
 * DECORATOR
 * @param {ValidationOptions} validationOptions
 * @return {(object: Object, propertyName: string) => void}
 * @constructor
 */
export function IsEmail(validationOptions?: ValidationOptions) {
    return (object: {}, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsEmailConstraint
        })
    }
}
