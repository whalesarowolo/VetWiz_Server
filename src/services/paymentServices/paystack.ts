import { IPaymentData, IPaystack, IVerifiedPaystack } from './paystack.d'
import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Response } from 'express';

export const initializePaystack = async (data: IPaymentData, callback: (authorization_url: string, reference: string) => void, error: () => void): Promise<void> => {
  const config: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.PAYSTACK_SK}`
    }
  }
  try {
    const paystackResponse: AxiosResponse = await Axios.post(
      'https://api.paystack.co/transaction/initialize',
      data,
      config
    );
    if (paystackResponse && paystackResponse.data) {
      const { data: { authorization_url, reference } }: IPaystack = paystackResponse.data
      callback(authorization_url, reference)
    } else {
      error()
    }
  } catch (error) {
    // console.log('found error', error)
  }

}

export const verifyPaystack = async (reference: string, callback: (reference: string) => void, error: () => void): Promise<void> => {
  const verifiedConfig: AxiosRequestConfig = {
    headers: {
      "Authorization": `Bearer ${process.env.PAYSTACK_SK}`
    }
  }
  try {
    const verifiedResponse: AxiosResponse = await Axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      verifiedConfig
    );
    if (verifiedResponse && verifiedResponse.data) {
      const { data: { status } }: IVerifiedPaystack = verifiedResponse.data
      callback(status)
    } else {
      error()
    }
  } catch (error) {
    // console.log(error)
  }

}