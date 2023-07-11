import {registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface} from 'class-validator'
import * as validator from 'class-validator'

/**
 * VALIDATOR
 * Valida se é uma data
 *
 * @author Germano Junior
 */
@ValidatorConstraint({name: validator.IS_DATE})
class IsDateConstraint implements ValidatorConstraintInterface {

    validate(value: any, args: ValidationArguments): boolean {
        return validator.isDate(value)
    }

    defaultMessage(args: ValidationArguments): string {
        return 'Data inválida! (dd/mm/aaaa)'
    }
}


/**
 * DECORATOR
 * @param {ValidationOptions} validationOptions
 * @return {(object: Object, propertyName: string) => void}
 * @constructor
 */
export function IsDate(validationOptions?: ValidationOptions) {
    return (object: {}, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsDateConstraint,
        })
    }
}
