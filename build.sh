#!/bin/sh

set -xeu

SCRIPT_DIR=$(cd "$(dirname "$0")" && pwd -P)

# M1 Macs need to force building using the Go architecture `arm64` (the default is `amd64`).

# Notice that the env variable **CGO_ENABLED** will silently turn off when building to a platform that is not the
# current platform default. So if the current **GOARCH=amd64** and one tries to build for arm64, it will fail because
# **CGO_ENABLED** is silently set to `0`.

GOOS="$(go env GOOS)"
GOARCH="${1:-$(go env GOARCH)}"
export GOARCH

ARCH_DIR="${GOOS}-${GOARCH}"
OUT_DIR="${SCRIPT_DIR}/out/${ARCH_DIR}"
mkdir -p "${OUT_DIR}"

GO111MODULE="on"
export GO111MODULE

CGO_ENABLED=1 go build -v \
  -trimpath \
  -buildmode=c-archive \
  -ldflags '-w -s -extldflags "-lresolv"' \
  -o "${OUT_DIR}"/keyring.a \
  "${SCRIPT_DIR}"/src/go

cp -f "${OUT_DIR}"/keyring.h "${SCRIPT_DIR}"/src/keyring.h

# To generate a universal binary for macOS, use the following commands:
# mkdir -p out/darwin-universal
# lipo -create -output out/darwin-universal/keyring.a out/darwin-amd64/keyring.a out/darwin-arm64/keyring.a
# lipo -archs out/darwin-universal/keyring.a
