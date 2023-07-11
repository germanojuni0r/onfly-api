import {registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface} from 'class-validator'
import * as validator from 'class-validator'

/**
 * VALIDATOR
 * Valida se é um boolean
 *
 * @author Germano Junior
 */
@ValidatorConstraint({name: validator.IS_BOOLEAN})
class IsBooleanConstraint implements ValidatorConstraintInterface {

    validate(value: string, args: ValidationArguments): boolean {
        return validator.isBoolean(value)
    }

    defaultMessage(args: ValidationArguments): string {
        return 'Valor deve ser do tipo boleano!'
    }
}


/**
 * DECORATOR
 * @param {ValidationOptions} validationOptions
 * @return {(object: Object, propertyName: string) => void}
 * @constructor
 */
export function IsBoolean(validationOptions?: ValidationOptions) {
    return (object: {}, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsBooleanConstraint,
        })
    }
}
