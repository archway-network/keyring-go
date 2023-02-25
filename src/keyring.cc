#include <napi.h>
#include "../keyring.h"

using namespace Napi;

Napi::String setOsStore(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  SetOsStore(); // my function call
  return Napi::String::New(env, "world");
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  exports.Set(Napi::String::New(env, "setOsStore"),
              Napi::Function::New(env, setOsStore));
  return exports;
}

NODE_API_MODULE(addon, Init)
