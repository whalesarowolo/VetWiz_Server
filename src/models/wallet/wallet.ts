import {model} from 'mongoose';
import { IWallet } from './wallet.d';
import { WalletSchema } from './wallet.model';


const walletModel = model<IWallet>('wallet', WalletSchema)
export default walletModel;