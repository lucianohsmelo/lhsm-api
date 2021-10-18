export type HttpResponse<T = any> = {
  statusCode: number;
  data: T;
};

export type HttpRequest = {
  params: Record<string, unknown>;
  query: Record<string, unknown>;
  body: Record<string, unknown>;
};

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  data: error.stack,
});

export const ok = (data: unknown | unknown[]): HttpResponse => ({
  statusCode: 200,
  data,
});
