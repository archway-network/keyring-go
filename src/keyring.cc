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

Napi::String setFileStore(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  std::string fileSaveDirArg = info[0].As<Napi::String>().ToString();
  char *fileSaveDir = new char[fileSaveDirArg.length() + 1];
  strcpy(fileSaveDir, fileSaveDirArg.c_str());
  
  std::string fileNameArg = info[1].As<Napi::String>().ToString();
  char *fileName = new char[fileNameArg.length() + 1];
  strcpy(fileName, fileNameArg.c_str());

  std::string dataArg = info[2].As<Napi::String>().ToString();
  char *data = new char[dataArg.length() + 1];
  strcpy(data, dataArg.c_str());

  std::string filePasswordArg = info[3].As<Napi::String>().ToString();
  char *filePassword = new char[filePasswordArg.length() + 1];
  strcpy(filePassword, filePasswordArg.c_str());

  Napi::String result = Napi::String::New(env, SetFileStore(fileSaveDir, fileName, data, filePassword));
  
  delete [] fileSaveDir;
  delete [] fileName;
  delete [] data;

  if (result == Napi::String::New(env, "")) {
    return Napi::String::New(env, "success");
  }
  return result;
}

Napi::String getFileStore(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  std::string fileSaveDirArg = info[0].As<Napi::String>().ToString();
  char *fileSaveDir = new char[fileSaveDirArg.length() + 1];
  strcpy(fileSaveDir, fileSaveDirArg.c_str());
  
  std::string fileNameArg = info[1].As<Napi::String>().ToString();
  char *fileName = new char[fileNameArg.length() + 1];
  strcpy(fileName, fileNameArg.c_str());

  std::string filePasswordArg = info[2].As<Napi::String>().ToString();
  char *filePassword = new char[filePasswordArg.length() + 1];
  strcpy(filePassword, filePasswordArg.c_str());

  Napi::String result = Napi::String::New(env, GetFileStore(fileSaveDir, fileName, filePassword));

  delete [] fileSaveDir;
  delete [] fileName;
  return result;
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  exports.Set(Napi::String::New(env, "setOsStore"),
              Napi::Function::New(env, setOsStore));
  exports.Set(Napi::String::New(env, "getOsStore"),
              Napi::Function::New(env, getOsStore));
  exports.Set(Napi::String::New(env, "setFileStore"),
              Napi::Function::New(env, setFileStore));
  exports.Set(Napi::String::New(env, "getFileStore"),
              Napi::Function::New(env, getFileStore));
  return exports;
}

NODE_API_MODULE(addon, Init)
