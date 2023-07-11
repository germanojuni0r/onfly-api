import { registerDecorator, ValidationArguments, ValidationOptions, Validator, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'
import * as validator from 'class-validator'

/**
 * VALIDATOR
 * Valida se o valor é maior ou igual ao valor passado
 *
 * @author Germano Junior
 */
@ValidatorConstraint({name: validator.MIN})
class MinConstraint implements ValidatorConstraintInterface {

    validate(value: number, args: ValidationArguments): boolean {
        return validator.min(value, args.constraints[0])
    }

    defaultMessage(args: ValidationArguments): string {
        return `Valor deve ser maior ou igual a ${args.constraints[0]}`
    }
}


/**
 * DECORATOR
 * @param {min} min
 * @param {ValidationOptions} validationOptions
 * @return {(object: Object, propertyName: string) => void}
 * @constructor
 */
export function Min(min: number, validationOptions?: ValidationOptions) {
    return (object: {}, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [min],
            validator: MinConstraint,
        })
    }
}
