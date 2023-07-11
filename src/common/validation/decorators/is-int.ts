import {registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface} from 'class-validator'
import * as validator from 'class-validator'

/**
 * VALIDATOR
 * Valida se é um Inteiro
 *
 * @author Germano Junior
 */
@ValidatorConstraint({name: validator.IS_INT})
class IsIntConstraint implements ValidatorConstraintInterface {

    validate(value: number, args: ValidationArguments): boolean {
        return validator.isInt(value)
    }

    defaultMessage(args: ValidationArguments): string {
        return 'Valor deve ser do tipo inteiro!'
    }
}


/**
 * DECORATOR
 * @param {ValidationOptions} validationOptions
 * @return {(object: Object, propertyName: string) => void}
 * @constructor
 */
export function IsInt(validationOptions?: ValidationOptions) {
    return (object: {}, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsIntConstraint,
        })
    }
}
