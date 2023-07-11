import {registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface} from 'class-validator'
import * as validator from 'class-validator'

/**
 * VALIDATOR
 * Valida se é um number
 *
 * @author Germano Junior
 */
@ValidatorConstraint({name: validator.IS_NOT_EMPTY})
class IsNotEmptyConstraint implements ValidatorConstraintInterface {

    validate(value: string, args: ValidationArguments): boolean {
        return validator.isNotEmpty(value)
    }

    defaultMessage(args: ValidationArguments): string {
        return 'Campo em branco'
    }
}


/**
 * DECORATOR
 * @param {ValidationOptions} validationOptions
 * @return {(object: Object, propertyName: string) => void}
 * @constructor
 */
export function IsNotEmpty(validationOptions?: ValidationOptions) {
    return (object: {}, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsNotEmptyConstraint,
        })
    }
}
