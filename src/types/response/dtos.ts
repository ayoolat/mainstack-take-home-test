export class ResponseDto<T> {
  public error: boolean;
  public statusCode: number;
  public message: string;
  public body: T;
}

export class PagedList<T> {
  constructor(page: number, limit: number, data: T) {
    this.page = page;
    this.limit = limit;
    this.data = data;
  }
  public page: number;
  public limit: number;
  public total: number;
  public data: T;
}
