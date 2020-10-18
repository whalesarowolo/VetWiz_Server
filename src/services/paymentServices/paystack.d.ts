import { IUser } from "./../../models/user/user.d";

export interface IPaystack {
  status: boolean;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

export interface IPaymentData {
  email: IUser["email"];
  amount: string;
  callback_url: string;
  reference: string;
  metadata: {
    custom_fields: [
      {
        display_name: string;
        variable_name: string;
        value?: IUser["_id"];
      },
      {
        display_name: string;
        variable_name: string;
        value?: IUser["phoneNumber"];
      },
      {
        display_name: string;
        variable_name: string;
        value?: string;
      }
    ];
  };
}

export interface IVerifiedPaystack {
  status: boolean;
  message: string;
  data: {
    amount?: number;
    currency?: string;
    transaction_date?: string;
    status: string;
    metadata?: number;
    domain?: string;
    reference: string;
    gateway_response?: string;
    message?: any;
    channel?: string;
    ip_address?: string;
    fees?: any;
    plan?: any;
    requested_amount?: any;
    customer?: any;
    log?: any;
    authorization?: any;
    history?: any;
  };
}
