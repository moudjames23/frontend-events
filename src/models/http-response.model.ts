export type HttpResponse<T> = {
    code: number;
    message: string;
    data: T[];
    errors: T[];
  }