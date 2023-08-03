#!/bin/sh

CGO_ENABLED=1 GOARCH=arm64 GOHOSTARCH=arm64 go build -trimpath -buildmode=c-archive -ldflags '-w -s -extldflags "-lresolv"' -o keyring.a -a ./src/go
