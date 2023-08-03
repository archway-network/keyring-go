go build -trimpath -buildmode=c-archive -o keyring.dll ./src/go
gendef keyring.dll
dlltool --input-def keyring.def --output-lib keyring.lib
