export const VALIDATION_CODE_MOCKED = ['0', '0', '0', '0', '0', '0'];
export const VALIDATION_CODE_ALLOWED_CHARACTERS = '0123456789';
export const VALIDATION_RETRY_DELAY_IN_SECONDS = 2;
export const VALIDATION_RETRY_ALLOWED_BEFORE_DELAY = 3;
export const VALIDATION_TOKEN_EXPIRATION_IN_MINUTES = 5;

export const getValidationRetryDelayInSeconds = (attempts: number) =>
  attempts > VALIDATION_RETRY_ALLOWED_BEFORE_DELAY
    ? (attempts - VALIDATION_RETRY_ALLOWED_BEFORE_DELAY) *
      VALIDATION_RETRY_DELAY_IN_SECONDS
    : 0;
