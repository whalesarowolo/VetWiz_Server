const sendSmsHelper = (
  username: string,
  password: string,
  sender: string,
  recipient: string
) => {};

export const generateTxRef = (passwordLength: number): string => {
  let pass = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const passLength = passwordLength || 8;
  for (let i = 0; i < passLength; i++)
    pass += possible.charAt(Math.floor(Math.random() * possible.length));
  return pass;
};

export const SMS_CHARGE = 5;
