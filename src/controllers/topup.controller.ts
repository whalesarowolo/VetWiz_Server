import { Request, Response, NextFunction } from 'express';
import { ITopUp } from '../models/topup/topup.d';
import topUpModel from './../models/topup/topup';
import { initializePaystack, verifyPaystack } from './../services/paymentServices/paystack';
import walletModel from './../models/wallet/wallet';
import { IWallet } from './../models/wallet/wallet.d';
import { IAuthModel } from './../utils/auth.d';



export const topUpUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { userId, email, phoneNumber, fname, lname }: IAuthModel =  req.userData!
    const { topUpAmount, reason }: {
      topUpAmount: string,
      reason: string
    } = req.body

    let amount = Number(topUpAmount) * 100
    let newAmount = String(amount)

    const fullname = [fname, lname].join(" ")
    initializePaystack(
      {
        email: email,
        amount: newAmount,
        callback_url: "https://www.farmaid.net/complete_topup_transaction.html",
        metadata: {
          custom_fields: [
            {
              display_name: "User Id",
              variable_name: "userId",
              value: userId,
            },
            {
              display_name: "User Phone",
              variable_name: "phoneNumber",
              value: phoneNumber,
            },
            {
              display_name: "Name",
              variable_name: "fname",
              value: fullname,
            },
          ]
        }
      },
      async (authorization_url, reference): Promise<void> => {
        if (authorization_url) {
          try {
            const newTopup = await topUpModel.create({
              topUpAmount: newAmount,
              transferRef: reference,
              user: userId,
              topUpStatus: "pending",
            });
            if (newTopup) {
              res
                .status(200)
                .json({ authorization_url, message: "continue" });
            }
          } catch (error) {
            console.log(error)
            next({
              message: "Error saving payment to Database",
              error,
            });
          }
        } else {
          next({
            message: "Topup processing failed",
          })
        }
      },
      (): void => {
        res.status(500).send({
          message: "There seems to be an error"
        })
      }
    )

  } catch (error) {
    next({
      message: "Topup Failed",
      err: error
    })
  }
}

export const topUpVerify = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { reference } = req.params;
    verifyPaystack(
      reference,
      async (status): Promise<void> => {
        if (status === "success") {
          try {
            const verifiedPayment: ITopUp | null = await topUpModel.findOneAndUpdate(
              {
                transferRef: reference,
                topUpStatus: "pending",
              },
              {
                $set: {
                  topUpStatus: "successful",
                },
              },
              { new: true }
            ).lean();

            if (verifiedPayment) {
              const presentWallet: IWallet | null = await walletModel.findOne({
                user: verifiedPayment.user,
              }).lean();
              if (presentWallet) {
                const updatedWallet: IWallet | null = await walletModel.findOneAndUpdate(
                  {
                    user: verifiedPayment.user,
                  },
                  {
                    $set: {
                      balance:
                        String(Number(presentWallet.balance) + Number(verifiedPayment.topUpAmount)),
                    },
                  },
                  {
                    new: true,
                    upsert: true,
                    rawResult: true,
                  }
                ).lean();
                if (updatedWallet) {
                  res.status(200).json({
                    message: "Payment successfully to user wallet",
                    walletBalance: updatedWallet.balance,
                    topupAmount: verifiedPayment.topUpAmount,
                  });
                }
              } else {
                // Create a wallet and update the balance
                try {
                  const newWallet: IWallet = await walletModel.create({
                    user: verifiedPayment.user,
                    balance: verifiedPayment.topUpAmount!
                  });
                  if (newWallet) {
                    res.status(200).json({
                      message: "Payment successfully added to new wallet",
                      walletBalance: newWallet.balance,
                      topupAmount: verifiedPayment.topUpAmount,
                    });
                  }
                } catch (error) {
                  next({
                    message: "Error saving payment to Wallet",
                    error,
                  });
                }
                // End wallet initialisation here
              }
            } else {
              // Payment not verified
              next({
                message: "There was a problem"
              })
            }
          } catch (error) {
            //There was a problem
            next({
              message: error
            });
          }
        } else {
          res.status(503).json("Error verifying from paystack");
        }
      },
      (): void => {
        res.status(500).send({
          message: "There seems to be an error"
        })
      }
      )
      
  } catch (error) {
    next({
      message: "Error verifying payment"
    })
}
}