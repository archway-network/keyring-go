#!/bin/sh

CGO_ENABLED=1 go build -trimpath -buildmode=c-archive -ldflags '-w -s -extldflags "-lresolv"' -o keyring.a -a ./src/go
