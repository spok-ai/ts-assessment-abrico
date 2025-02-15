import { t } from 'i18next';
import { z } from 'zod';

import { zUserWithEmail } from '@/features/users/schemas';

export type FormFieldsLogin = z.infer<ReturnType<typeof zFormFieldsLogin>>;
export const zFormFieldsLogin = () => zUserWithEmail().pick({ email: true });

export type FormFieldsRegister = z.infer<
  ReturnType<typeof zFormFieldsRegister>
>;
export const zFormFieldsRegister = () =>
  zUserWithEmail().pick({ email: true, name: true, language: true }).required();

export type VerificationCodeValidate = z.infer<
  ReturnType<typeof zVerificationCodeValidate>
>;
export const zVerificationCodeValidate = () =>
  z.object({
    token: z.string().uuid(),
    code: z
      .array(
        z
          .string({
            invalid_type_error: t('auth:data.verificationCode.invalid'),
            required_error: t('auth:data.verificationCode.required'),
          })
          .length(1)
      )
      .length(6, t('auth:data.verificationCode.invalid')),
  });

export type FormFieldsVerificationCode = z.infer<
  ReturnType<typeof zFormFieldsVerificationCode>
>;
export const zFormFieldsVerificationCode = () =>
  zVerificationCodeValidate().pick({
    code: true,
  });
