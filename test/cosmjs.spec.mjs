import { expect, it, describe } from 'vitest';
import { setOsStore, getOsStore, setFileStore, getFileStore } from "../lib/binding.js";
import { generateKeyAndSendFunds } from './fixtures';
import dotenv from 'dotenv';
dotenv.config();

const timeout = 10000;
const serviceName = "archwayhq";
const keyName = "keyring3";

const fileSaveDir = "~/"; // user home dir
const fileName = "file-keyring3";
const filePassword = "password123";

// note: in real run cosmjs will generate a mnemonic and this will be saved into keystore
// however for this test we need an account with a token balance so we can actually test a tx execution
// therefore this test takes an existing mnemonic and account that has funds, and stores that into keystore
describe("End to end test for keyring", () => {
    it("checks that a mnemonic is saved to OS keystore, retrieves it from keystore, and then sends funds", async () => {
        setOsStore(serviceName, keyName, process.env.DEVX_TEST_ACCOUNT_MNEMONIC);

        const mnemonic = getOsStore(serviceName, keyName);

        const result = await generateKeyAndSendFunds(mnemonic);
        expect(result).toBe(0);
    }, { timeout });

    it("checks that a mnemonic is saved to encrypted file store, retrieves it from file, and then sends funds", async () => {
        setFileStore(fileSaveDir, fileName, process.env.DEVX_TEST_ACCOUNT_MNEMONIC, filePassword);

        const mnemonic = getFileStore(fileSaveDir, fileName, filePassword);

        const result = await generateKeyAndSendFunds(mnemonic);
        expect(result).toBe(0);
    }, { timeout });
});
