# Node Keyring

A [Node-API](https://nodejs.org/api/n-api.html) addon for the Cosmos
Keyring Go library to store values using the OS keyring or the filesystem.

## Project Design and Structure

The project uses the recommended tooling for NAPI projects:

- Built with C++ to expose Go API to Javascript using the
  [node-addon-api](https://github.com/nodejs/node-addon-api).
- Uses the [node-gyp](https://github.com/nodejs/node-gyp) build tool.
- Uses [prebuildify](https://github.com/prebuild/prebuildify) to prebuild the
  binaries for your platform.

Folder structure:

- `src/go`: contains all go files
- `src/keyring.cc`: exposes the C-bound native API to Node.js using C++
- `src/node` import the `keyring.cc` exports to Javascript

## Development

### Requirements

You will be building native code, and therefore, a comprehensive number of
requirements are needed:

```bash
node --version
npm --version
make --version
go --version
python --version
```

#### On Mac

Install the `XCode Command Line Tools`:

```bash
xcode-select --install
```

Which will install `clang`:

```bash
cc --version
```

#### On Linux

```bash
gcc --version
```

> [!NOTE]
> Confirm that you have a relatively recent version of each of these dependencies.

### Setup

```bash
npm install --ignore-scripts
```

> You should use the `--ignore-scripts` flag to avoid running the install script.

### Build

```bash
npm run build
```

The build process uses [`cgo`](https://pkg.go.dev/cmd/cgo) to compile the Go
module into a static C library and [node-gyp](https://nodejs.org/api/addons.html)
to make the C++ addon available on Node.js via NAPI.

To avoid compiling the package on the user's machine, the script uses
[prebuildify](https://github.com/prebuild/prebuildify) to prebuild the binaries
for specific platforms. All the prebuilt node binaries are bundled with the
package inside the `prebuilds` folder.

When installing the package, the install script will check if a compatible
prebuild is bundled for the current platform. If it is, it will be used instead
of building from source.

Once the build completes, you should see the `build` folder in the repository
root containing all NAPI-related files.

The `npm run build` script will automatically run the `build.sh` script to build
the Go module to a C library before producing the prebuild binary.

> [!NOTE]
> On macOS, it's possible to build for both architectures (`x64` and `arm64`).
> For that, you will need to run `npm run build:x64` and then `npm run build:arm64`.

#### Build the Go package to C using `cgo`

To build only the Go module for your current platform and architecture, run:

```bash
./build.sh
```

Once the build is complete, you should see the files `keyring.h` and `keyring.a`
in the `out` folder.

### Test

To run the bindings tests:

```bash
npm run test
```
