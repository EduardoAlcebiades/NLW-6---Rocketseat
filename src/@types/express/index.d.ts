declare namespace Express {
  interface IAuthPayload {
    user_id: string;
    email: string;
  }

  export interface Request {
    auth: IAuthPayload;
  }
}
