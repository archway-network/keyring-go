import dotenv from "dotenv";
import { describe, expect, it } from "vitest";
import { generateKeyAndSendFunds } from "../fixtures.js";
import { FileStore } from "../src/node";

dotenv.config();

const timeout = 10000;

const fileSaveDir = "~/"; // user home dir
const fileName = "file-keyring3";
const filePassword = "password123";

// note: in real run cosmjs will generate a mnemonic and this will be saved into keystore
// however for this test we need an account with a token balance so we can actually test a tx execution
// therefore this test takes an existing mnemonic and account that has funds, and stores that into keystore
describe("End to end test for keyring", () => {
  it(
    "checks that a mnemonic is saved to encrypted file store, retrieves it from file, and then sends funds",
    async () => {
      console.log("start set encrypted file and generate cosmjs tx");
      FileStore.set(
        fileSaveDir,
        fileName,
        process.env.DEVX_TEST_ACCOUNT_MNEMONIC,
        filePassword
      );
      console.log("FileStore.set complete");
      const mnemonic = FileStore.get(fileSaveDir, fileName, filePassword);
      console.log("FileStore.get complete");

      const result = await generateKeyAndSendFunds(mnemonic);
      expect(result).toBe(0);
    },
    { timeout }
  );
});
