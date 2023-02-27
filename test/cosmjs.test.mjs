import { expect, it, describe } from 'vitest';
import { setOsStore, getOsStore, setFileStore, getFileStore } from "../lib/binding.js";
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import { SigningStargateClient, GasPrice } from "@cosmjs/stargate"
import dotenv from 'dotenv';
dotenv.config();

const timeout = 10000;
const serviceName = "archwayhq";
const keyName = "keyring3";

const fileSaveDir = "~/"; // user home dir
const fileName = "file-keyring3";

// note: in real run cosmjs will generate a mnemonic and this will be saved into keystore
// however for this test we need an account with a token balance so we can actually test a tx execution
// therefore this test takes an existing mnemonic and account that has funds, and stores that into keystore
describe("End to end test for keyring", () => {
    it("checks that a mnemonic is saved to OS keystore, retrieves it from keystore, and then sends funds", async () => {
        setOsStore(serviceName, keyName, process.env.DEVX_TEST_ACCOUNT_MNEMONIC);

        const mnemonic = getOsStore(serviceName, keyName);
        console.log("mnemonic:", mnemonic);

        const result = await generateKeyAndSendFunds(mnemonic);
        expect(result).toBe(0);
    }, { timeout });

    it("checks that a mnemonic is saved to encrypted file store, retrieves it from file, and then sends funds", async () => {
        setFileStore(fileSaveDir, fileName, process.env.DEVX_TEST_ACCOUNT_MNEMONIC);

        const mnemonic = getFileStore(fileSaveDir, fileName);
        console.log("mnemonic:", mnemonic);

        const result = await generateKeyAndSendFunds(mnemonic);
        expect(result).toBe(0);
    }, { timeout });
});

async function generateKeyAndSendFunds(mnemonic) {    
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

    console.log("transfer result code", result.code);
    return result.code;
}
