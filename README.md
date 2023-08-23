# Node Keyring

A [Node-API](https://nodejs.org/api/n-api.html) addon for the Cosmos
Keyring Go library to store values using the OS keyring or the filesystem.

## Project Design and Structure

The project uses the recommended tooling for NAPI projects:

- Project creation: **Yeoman** and **generator-napi-module**.
- Built with C++ to expose Go API to Javascript using **node-addon-api**.

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

On Mac:

```bash
cc --version
```

On Linux:

```bash
gcc --version
```

> [!NOTE]
> Confirm that you have a relatively recent version of each of these dependencies.

### Setup

```bash
npm install --ignore-scripts
```

### Build

The build process uses `cgo` to compile the Go module into a static C library
and [node-gyp](https://nodejs.org/api/addons.html) to make the C++ addon
available on Node.js via NAPI.

To build all modules, run:

```bash
npm run build
```

#### Build the Go package to C using `cgo`

```bash
npm run build:cgo
```

This job runs the script `build.sh` to automatically handle all environment
variables for your computer architecture.

Once the build is complete, you should see the files `keyring.h` and `keyring.a`
in the repository root.

> [!NOTE]
> After modifying the C++ or Go code, delete the output files before building again.

#### Pre-build the Node.js module

```bash
npm run build:pre
```

This command uses [prebuildify](https://github.com/prebuild/prebuildify) to
prebuild the binaries for your platform. All the prebuilt node binaries are
bundled with the package inside the `prebuilds` folder.

When installing the package, the install script will check if a compatible
prebuild is bundled for the current platform. If it is, it will be used instead
of building from source.

Once the build completes, you should see the folder `build` in the repository
root containing all NAPI-related files.

### Test

To run the bindings tests:

```bash
npm run test
```
