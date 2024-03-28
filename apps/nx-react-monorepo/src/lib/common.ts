import { ZodError } from 'zod';

export const getZodError = (error: ZodError) => {
  return error.errors.map((current) => current.message).join('. ');
};

const getUnknownError = (error: unknown, defaultMessage: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const message = (error as any).toString() as string;
  if (!message) {
    return defaultMessage;
  }
  if (message.includes('[object Object]')) {
    return defaultMessage;
  }

  return message;
};

export const getErrorMessage = (
  error: unknown,
  defaultMesssage?: string
): string => {
  if (error instanceof ZodError) {
    return `Validation error: ${getZodError(error)}`;
  }

  const messsage =
    error instanceof Error
      ? error.message
      : defaultMesssage ||
        getUnknownError(error, defaultMesssage || 'Error occurred');

  return messsage;
};

export const isPrivatePage = (pathname: string) =>
  pathname.includes('/private') ||
  pathname.includes('/edit') ||
  pathname.includes('/create');
