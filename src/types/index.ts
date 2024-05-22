export interface RiotError {
  errorCode: string;
  httpStatus: number;
  implementationDetails: any;
  message: string;
}
export interface SelectOption {
  key: string;
  id?: number;
  name: string;
}