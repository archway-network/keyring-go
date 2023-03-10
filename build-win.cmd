go build -trimpath -buildmode=c-shared -o keyring.dll ./src/go
gendef keyring.dll
dlltool --input-def keyring.def --output-lib keyring.lib
