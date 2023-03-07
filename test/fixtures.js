import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import { SigningStargateClient, GasPrice } from "@cosmjs/stargate"

export async function generateKeyAndSendFunds(mnemonic) {    
    const offlineDirectSigner = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, { prefix: 'archway'});
    const accounts = await offlineDirectSigner.getAccounts();
    const sourceAddress = accounts[0].address;
    console.log("source address", sourceAddress);

    const gasPrice = GasPrice.fromString('1uconst');
    const signingClient = await SigningStargateClient.connectWithSigner("https://rpc.constantine-1.archway.tech", offlineDirectSigner, {
        gasPrice,
    });
    console.log("chainId", await signingClient.getChainId());
    
    const destAddr = "archway12ypnach24z0ckqcwmslkscf9arm903n200runp";    
    const result = await signingClient.sendTokens(sourceAddress, destAddr, [
        { denom: 'uconst', amount: '1000' }
    ], "auto");

    console.log("tx complete, result code:", result.code);
    return result.code;
}