#!/bin/sh

go build -trimpath -buildmode=c-archive -ldflags '-w -s -extldflags "-lresolv"' -o keyring.a -a ./src/go
