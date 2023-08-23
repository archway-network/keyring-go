#!/bin/bash

set -xeuo pipefail

# M1 Macs need to force building using the Go architecture `arm64` (the default is `amd64`).

# Notice that the env variable **CGO_ENABLED** will silently turn off when building to a platform that is not the
# current platform default. So if the current **GOARCH=amd64** and one tries to build for arm64, it will fail because
# **CGO_ENABLED** is silently set to `0`.

os=$(uname -s | tr '[:upper:]' '[:lower:]')
arch=$(uname -m | tr '[:upper:]' '[:lower:]')
[[ "${arch}" = "x86_64" ]] && arch="amd64"

CGO_ENABLED=1 GOOS="${os}" GOARCH="${arch}" \
  go build -v -trimpath -buildmode=c-archive -ldflags '-w -s -extldflags "-lresolv"' -o ./build/keyring.a ./src/go
