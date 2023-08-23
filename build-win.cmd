go build -trimpath -buildmode=c-archive -o ./build/keyring.dll ./src/go
gendef ./build/keyring.dll
dlltool --input-def ./build/keyring.def --output-lib ./build/keyring.lib
