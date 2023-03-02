#!/bin/sh

go build -trimpath -buildmode=c-shared -ldflags '-w -s' -o keyring.so ./src/go
