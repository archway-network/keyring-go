go build -trimpath -buildmode=c-shared -o ./c_build/win/keyring.dll ./src/go
cd ./c_build/win && gendef keyring.dll
cd ../..
dlltool --input-def ./c_build/win/keyring.def --output-lib ./c_build/win/keyring.lib
