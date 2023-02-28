#!/bin/sh

CGO_ENABLED=1 GOARCH=arm64 GOHOSTARCH=arm64 go build -trimpath -buildmode=c-shared -ldflags '-w -s -extldflags "-lresolv"' -o keyring.so -a ./src/go
