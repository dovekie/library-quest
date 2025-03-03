export interface TApiResponse<ResponseShape> {
  data?: ResponseShape;
  error?: { message: string; statusCode: number | undefined };
}
