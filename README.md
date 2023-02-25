# Node NAPI wrapped module for cosmos/keyring go package which handles key pair storage into OS secrets or file system

# Requirements
- You will be building native code and therefore a large number of requirements are needed. Please test you have these already setup before beginning.
- You can run these commands to check

node --version
npm --version
python --version
git --version
cc --version
make --version

# Warning
M1 Macs need a unique build script to force building as arm64 (defaults to amd64). Notice the env variable CGO_ENABLED it silently turns off only when building to a platform that is not current platform default. So if current GOARCH=amd64 and one tries to build for arm64, then it will fail because CGO_ENABLED is silently set to 0 (false). Very frustrating!
So you must use build-m1-mac.sh to build the go module on m1 macs for m1 macs.

# Required steps
1. Run this command to build C bindary (i.e. dll). sh build.sh (or build-m1-mac.sh)
2. Run this command to build Node module. npm run build
3. Test as needed