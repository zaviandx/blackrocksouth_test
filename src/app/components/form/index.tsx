import {ReactElement, ReactNode, FormEvent, useMemo, useCallback, useState} from 'react'
import './index.scss'
import capitalize from "../../utils/capitalize";

type FieldType = 'string' | 'number'

type FieldValue = string | number

type FieldEntry = [string, FieldType]

type FormInitialValues = Record<string, FieldValue>

type FormSchema = Record<string, FieldType>

interface IFormProps {
    initialValues?: FormInitialValues,
    schema: FormSchema,
    onSubmit?: (formData: FormInitialValues) => void,
    onError?: () => void,
}

const validate = (formData: FormInitialValues) => {
    let isFormValid = true
    const errors: string[] = []

    Object.entries(formData).forEach(([key, value]) => {
        if(!value) {
            isFormValid = false
            errors.push(key)
        }
    })

    return {
        isFormValid,
        errors
    }
}

const Form = ({ initialValues = {}, schema, onSubmit, onError }: IFormProps): ReactElement => {
    const [errors, setErrors] = useState<string[]>([])


    const onFormSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const fields = Array.from((event.target as HTMLElement).querySelectorAll('input'))
        const formData = fields.reduce((fd: FormInitialValues, currentField: HTMLInputElement) => {
            fd[currentField.name] = currentField.value
            return fd
        }, {})

        const {isFormValid, errors} = validate(formData)

        if(isFormValid) {
            setErrors([])
            if(onSubmit) {
                onSubmit(formData)
            }
        } else {
            onFormError(errors)
        }

    }

    const onFormError = (errors: string[]): void => {
        setErrors(errors)
    }

    const getStringField = useCallback((name: string, initialValue: FieldValue) => (
        <div className='form-field' key={name}>
            <label htmlFor={name}>{capitalize(name)}:</label>
            <input type='text' name={name} defaultValue={initialValue}/>
            {
                errors.includes(name) && <div className='form-error'>Field should not be empty</div>
            }
        </div>
    ), [errors])

    const getNumberField = useCallback((name: string, initialValue: FieldValue) => (
        <div className='form-field' key={name}>
            <label htmlFor={name}>{capitalize(name)}:</label>
            <input type='number' name={name} defaultValue={initialValue}/>
            {
                errors.includes(name) && <div className='form-error'>Field should not be empty</div>
            }
        </div>
    ), [errors])

    const schemaFieldRenderers = useMemo(() => ({
        'string': getStringField,
        'number': getNumberField,
    }), [getStringField, getNumberField])

    const getSchemaField = useCallback(([fieldName, fieldType]: FieldEntry, initialValue: FieldValue) => (
        schemaFieldRenderers[fieldType](fieldName, initialValue)
    ), [schemaFieldRenderers])

    const getFields = useCallback((): ReactNode => (
        Object.entries(schema).map((fieldEntry) => getSchemaField(fieldEntry, initialValues[fieldEntry[0]]))
    ), [getSchemaField, schema, initialValues])

    const getForm = (): ReactElement => {
        return (
            <form className='form' onSubmit={onFormSubmit}>
                {getFields()}
                <button type="submit" style={{marginTop: 8}}>Submit</button>
            </form>
        )
    }

    return getForm();
}

export default Form;
