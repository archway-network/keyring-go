{
  'targets': [
    {
      'target_name': 'keyring-go',
      'sources': [ 'src/keyring.cc' ],
      'include_dirs': ["<!@(node -p \"require('node-addon-api').include\")"],
      'dependencies': ["<!(node -p \"require('node-addon-api').gyp\")"],
      'cflags!': [ '-fno-exceptions' ],
      'cflags_cc!': [ '-fno-exceptions' ],
      'xcode_settings': {
        'GCC_ENABLE_CPP_EXCEPTIONS': 'YES',
        'CLANG_CXX_LIBRARY': 'libc++',
        'MACOSX_DEPLOYMENT_TARGET': '12'
      },
      'msvs_settings': {
        'VCCLCompilerTool': {
          'ExceptionHandling': 1,
          'RuntimeLibrary': 2,
          'AdditionalOptions': [ '-std:c++14' ]
        },
      },
      'conditions': [
        ['OS=="linux" and target_arch=="x64"', {
          "libraries": [
            "<!(pwd)/out/linux-amd64/keyring.a"
          ],
        }],
        ['OS=="linux" and target_arch=="arm64"', {
          "libraries": [
            "<!(pwd)/out/linux-arm64/keyring.a"
          ],
        }],
        ['OS=="mac" and target_arch=="x64"', {
          "libraries": [
            "<!(pwd)/out/darwin-amd64/keyring.a"
          ],
        }],
        ['OS=="mac" and target_arch=="arm64"', {
          "libraries": [
            "<!(pwd)/out/darwin-arm64/keyring.a"
          ],
        }],
      ]
    }
  ]
}
