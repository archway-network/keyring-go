#include <napi.h>
#include "../keyring.h"

using namespace Napi;

// note: C++ functions cannot have same name as the Go functions!

// todo: maybe convert to using std::vector<char>, instead of char*
Napi::String setOsStore(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  
  std::string serviceNameArg = info[0].As<Napi::String>().ToString();
  char *serviceName = new char[serviceNameArg.length() + 1];
  strcpy(serviceName, serviceNameArg.c_str());

  std::string keyNameArg = info[1].As<Napi::String>().ToString();
  char *keyName = new char[keyNameArg.length() + 1];
  strcpy(keyName, keyNameArg.c_str());

  std::string dataArg = info[2].As<Napi::String>().ToString();
  char *data = new char[dataArg.length() + 1];
  strcpy(data, dataArg.c_str());

  SetOsStore(serviceName, keyName, data); 

  delete [] serviceName;
  delete [] keyName;
  delete [] data;
  return Napi::String::New(env, "success");
}

Napi::String getOsStore(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  
  std::string serviceNameArg = info[0].As<Napi::String>().ToString();
  char *serviceName = new char[serviceNameArg.length() + 1];
  strcpy(serviceName, serviceNameArg.c_str());

  std::string keyNameArg = info[1].As<Napi::String>().ToString();
  char *keyName = new char[keyNameArg.length() + 1];
  strcpy(keyName, keyNameArg.c_str());

  Napi::String result = Napi::String::New(env, GetOsStore(serviceName, keyName)); 

  delete [] serviceName;
  delete [] keyName;
  return result;
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  exports.Set(Napi::String::New(env, "setOsStore"),
              Napi::Function::New(env, setOsStore));
  exports.Set(Napi::String::New(env, "getOsStore"),
              Napi::Function::New(env, getOsStore));
  return exports;
}

NODE_API_MODULE(addon, Init)
