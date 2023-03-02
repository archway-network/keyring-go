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
          'RuntimeLibrary': 2
        },
      },
      "libraries": [
        "<!(pwd)/keyring.so"
      ]
    }
  ]
}