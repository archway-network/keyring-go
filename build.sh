#!/bin/sh

go build -trimpath -buildmode=c-shared -ldflags '-w -s -extldflags "-lresolv"' -o keyring.so ./src/go
