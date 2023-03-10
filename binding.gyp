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
        ['OS=="linux"', {
          "libraries": [
            "<!(pwd)/keyring.so"
          ],
        }],
        ['OS=="win"', {
          'defines': [
            '_MSC_VER=1935',
          ],
          "libraries": [
            "<!(cd)/keyring.lib"
          ],
        }],
        ['OS=="mac"', {
          "libraries": [
            "<!(pwd)/keyring.so"
          ],
        }]
      ]
    }
  ]
}