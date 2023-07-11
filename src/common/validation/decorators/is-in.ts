import {registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface} from 'class-validator'
import * as validator from 'class-validator'
import * as _ from 'lodash'

/**
 * VALIDATOR
 * Valida se valor esta na lista de valores permitidos
 *
 * @author Germano Junior
 */
@ValidatorConstraint({name: validator.IS_IN})
class IsInConstraint implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments): boolean {
        if (value instanceof Array) {
            return _.every(value, val => validator.isIn(val, args.constraints))
        }

        return validator.isIn(value, args.constraints)
    }

    defaultMessage(args: ValidationArguments): string {
        return `Valor não permitido! (Valores permitidos: ${args.constraints.join(',')})`
    }
}


/**
 * DECORATOR
 * @param {any[]} values
 * @param {ValidationOptions} validationOptions
 * @return {(object: Object, propertyName: string) => void}
 * @constructor
 */
export function IsIn(values: any[], validationOptions?: ValidationOptions) {
    return (object: {}, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: values,
            validator: IsInConstraint,
        })
    }
}
