import {registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface} from 'class-validator'
import * as validator from 'class-validator'

/**
 * VALIDATOR
 * Valida se não está vazio
 *
 * @author Germano Junior
 */
@ValidatorConstraint({name: validator.IS_NUMBER})
class IsNumberConstraint implements ValidatorConstraintInterface {

    validate(value: string, args: ValidationArguments): boolean {
        return validator.isNumber(value)
    }

    defaultMessage(args: ValidationArguments): string {
        return 'Valor deve ser do tipo numérico!'
    }
}


/**
 * DECORATOR
 * @param {ValidationOptions} validationOptions
 * @return {(object: Object, propertyName: string) => void}
 * @constructor
 */
export function IsNumber(validationOptions?: ValidationOptions) {
    return (object: {}, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsNumberConstraint,
        })
    }
}
