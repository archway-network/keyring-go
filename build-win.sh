#!/bin/sh

go build -trimpath -buildmode=c-shared -ldflags '-w -s' -o keyring.dll ./src/go
gendef keyring.dll
#dlltool --input-def keyring.def --output-lib keyring.lib
#cl.exe main.c foo.lib