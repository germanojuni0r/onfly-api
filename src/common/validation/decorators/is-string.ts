import {registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface} from 'class-validator'
import * as validator from 'class-validator'

/**
 * VALIDATOR
 * Valida se é uma string
 *
 * @author Germano Junior
 */
@ValidatorConstraint({name: validator.IS_STRING})
class IsStringConstraint implements ValidatorConstraintInterface {

    validate(value: string, args: ValidationArguments): boolean {
        return validator.isString(value)
    }

    defaultMessage(args: ValidationArguments): string {
        return 'Valor deve ser do tipo texto!'
    }
}


/**
 * DECORATOR
 * @param {ValidationOptions} validationOptions
 * @return {(object: Object, propertyName: string) => void}
 * @constructor
 */
export function IsString(validationOptions?: ValidationOptions) {
    return (object: {}, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsStringConstraint,
        })
    }
}
