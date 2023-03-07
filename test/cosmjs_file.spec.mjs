import { expect, it, describe } from 'vitest';
import { setFileStore, getFileStore } from "../lib/binding.js";
import { generateKeyAndSendFunds } from './fixtures';
import dotenv from 'dotenv';
dotenv.config();

const timeout = 10000;

const fileSaveDir = "~/"; // user home dir
const fileName = "file-keyring3";

// note: in real run cosmjs will generate a mnemonic and this will be saved into keystore
// however for this test we need an account with a token balance so we can actually test a tx execution
// therefore this test takes an existing mnemonic and account that has funds, and stores that into keystore
describe("End to end test for keyring", () => {   
    it("checks that a mnemonic is saved to encrypted file store, retrieves it from file, and then sends funds", async () => {
        console.log("start set encrypted file and generate cosmjs tx");
        setFileStore(fileSaveDir, fileName, process.env.DEVX_TEST_ACCOUNT_MNEMONIC);
        console.log("setFileStore complete")
        const mnemonic = getFileStore(fileSaveDir, fileName);
        console.log("getFileStore complete")

        const result = await generateKeyAndSendFunds(mnemonic);
        expect(result).toBe(0);
    }, { timeout });
});
