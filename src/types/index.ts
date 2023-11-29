export interface RiotError {
  errorCode: string;
  httpStatus: number;
  implementationDetails: any;
  message: string;
}