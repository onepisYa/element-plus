import type { InjectionKey, SetupContext, UnwrapRef } from 'vue'
import type {
  RuleItem,
  ValidateError,
  ValidateFieldsError,
} from 'async-validator'
import type { ComponentSize } from '@element-plus/constants'
import type {
  FormProps,
  FormEmits,
  FormItemProp,
  FormItemProps,
  FormLabelWidthContext,
} from '@element-plus/components/form'
import type { Arrayable } from '@element-plus/utils'

export interface FormItemRule extends RuleItem {
  trigger?: Arrayable<string>
}
export type FormRules = Partial<Record<string, Arrayable<FormItemRule>>>

export type FormValidationResult = Promise<boolean>
export type FormValidateCallback = (
  isValid: boolean,
  invalidFields?: ValidateFieldsError
) => void
export interface FormValidateFailure {
  errors: ValidateError[] | null
  fields: ValidateFieldsError
}

export type FormContext = FormProps &
  UnwrapRef<FormLabelWidthContext> & {
    emit: SetupContext<FormEmits>['emit']

    // expose
    addField: (field: FormItemContext) => void
    removeField: (field: FormItemContext) => void
    resetFields: (props?: Arrayable<FormItemProp>) => void
    clearValidate: (props?: Arrayable<FormItemProp>) => void
    validateField: (
      props?: Arrayable<FormItemProp>,
      callback?: FormValidateCallback
    ) => FormValidationResult
  }

export interface FormItemContext extends FormItemProps {
  $el: HTMLDivElement | undefined
  size: ComponentSize
  validateState: string
  validate: (
    trigger: string,
    callback?: FormValidateCallback
  ) => FormValidationResult
  resetField(): void
  clearValidate(): void
}

export const formContextKey: InjectionKey<FormContext> =
  Symbol('formContextKey')
export const formItemContextKey: InjectionKey<FormItemContext> =
  Symbol('formItemContextKey')
