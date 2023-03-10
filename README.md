# Node NAPI wrapped module for cosmos/keyring Go package which handles key pair storage into OS secrets or file system

# Requirements
- You will be building native code and therefore a large number of requirements are needed. Please test you have these already setup before beginning.
- You can run these commands to check
- Please try and have a relatively new version of each of these dependencies

node --version
npm --version
python --version
git --version
cc --version (on mac, it's really clang internally)
gcc --version (on linux)
make --version
go --version

# Project Design and Structure
- Project uses the recommended tooling for Node-Api projects
    - Project creation: Yeoman and generator-napi-module
    - Built with C++ module for simpler object syntax: node-addon-api
- src/go contains all go files
- src/keyring.cc exposes the C bound native files to Node-Api using simpler C++ OOP syntax
- lib/binding.js exports the keyring.cc exports to Javascript

# Warning
M1 Macs need a unique build script to force building as arm64 (defaults to amd64). Notice, the env variable CGO_ENABLED will silently turn off when building to a platform that is not the current platform default. So if current GOARCH=amd64 and one tries to build for arm64, then it will fail because CGO_ENABLED is silently set to 0 (false). Very frustrating!
You must use build-m1-mac.sh to build the go module on m1 macs for m1 macs.

# Required Steps to Run Tests
0. Setup:
    1. Run npm install --ignore-scripts
    2. Create .env file with your test account DEVX_TEST_ACCOUNT_MNEMONIC (account must have some coins in Constantine)
1. Run this command to build C binary (i.e. Go based C dll. Note after changes to go code, before building again delete files output files to start again): 
    - Non M1 Mac: npm run build:go:amd64
    - M1 Mac: npm run build:go:m1
    - Linux: npm run build:go
    - Once build is complete you should see keyring.h and keyring.so on root (keyring.so is C binary)
2. Run this command to build Node module (i.e. the npm module): 
    - npm run build:node
    - Once build completes you should see a folder called build on root (folder contains all Node-Api related files)
3. Tests:
    1. Testing bindings (i.e. core functionality): npm run test
        - If successful you should see something like "Tests passed- everything looks OK!"
    2. Testing end to end (i.e. include cosmjs account creation in tests): npm run vitest
        - If successful you should see the standard jest style message with list of passed files and tests
            Test Files  1 passed (1)
                 Tests  2 passed (2)
            Start at  09:13:07
            Duration  13.55s