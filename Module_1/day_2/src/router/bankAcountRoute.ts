import  fs  from 'fs';
import express , {Request,Response} from 'express';
import path from 'path';

const bankAccountRoute = express.Router();

const bankAccountFile = path.join(__dirname,"../bankAccount.json");

interface BankAccount {
    accountNumber : number,
    accountHolder : string,
    balance: number 
}
interface TransactionBody {
    accountNumber: number;
    amount: number;
}

const readBankAccountFile =(): BankAccount[]=>{
    const data = fs.readFileSync(bankAccountFile,"utf8")
    return JSON.parse(data)
}

const writeBankAccountFile =( data : BankAccount[]): void =>{
    fs.writeFileSync(bankAccountFile,JSON.stringify(data,null,2))
}

bankAccountRoute.post("/create-account",(req:Request, res:Response)=>{
    const {accountHolder , balance = 0}= req.body;
    const bankAccounts = readBankAccountFile();
    const newAccount : BankAccount = {
        accountNumber : Math.floor(100000000 + Math.random() * 900000000),
        accountHolder ,
        balance : Number(balance)
    }
    bankAccounts.push(newAccount);
    writeBankAccountFile(bankAccounts);
    res.status(201).json(newAccount)
})

bankAccountRoute.delete("/close-account/:accountNumber",(req:Request, res:Response)=>{
    const numberAccount = parseInt(req.params.accountNumber)
    const bankAccounts = readBankAccountFile();
    const filteredAccount = bankAccounts.filter(account => account.accountNumber !== numberAccount);
    if(bankAccounts.length !== filteredAccount.length){
        writeBankAccountFile(filteredAccount);
        res.status(200).json({ message: 'Account deleted successfully' });
    } else {
        res.status(404).json({ message: "Account not found" });
    }

});
bankAccountRoute.get('/get-account-by-number/:accountNumber', (req: Request, res: Response) => {
    const number = parseInt(req.params.accountNumber);
    const bankAccounts = readBankAccountFile();
    const account = bankAccounts.find(acc => acc.accountNumber === number);
    if(account){
        res.json(account)
    }
    else{
        res.status(404).json({message : "Account not found"})
    }
});
bankAccountRoute.get('/list-all-accounts', (req: Request, res: Response) => {
    const bankAccounts = readBankAccountFile();
    res.json(bankAccounts);
});
bankAccountRoute.post('/deposit', (req: Request, res: Response) => {
    const { accountNumber, amount } = req.body;
    const bankAccounts = readBankAccountFile();
    const account = bankAccounts.find(acc => acc.accountNumber === accountNumber);
  
    if (!account) {
        res.status(404).json({ message: 'Account not found' });
        return
    }
    if (amount <= 0) {
        res.status(400).json({ message: 'Deposit amount must be positive' });
    }
  
    account.balance += Number(amount); account.balance += Number(amount);
    writeBankAccountFile(bankAccounts);
    res.json({ message: 'Deposit successful'});
});
bankAccountRoute.post('/withdraw', (req: Request, res: Response) => {
  const { accountNumber, amount } = req.body;
  const bankAccounts = readBankAccountFile();

  writeBankAccountFile(bankAccounts);
  res.json({ message: 'Withdraw successful' });
});
export default bankAccountRoute;