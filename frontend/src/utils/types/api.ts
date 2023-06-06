export interface Iresponse<T> {
  data: T;
}

export interface Ierror {
  response: {
    data: {
      message: string;
    };
  };
}
