#include <napi.h>
#include "../out/keyring.h"

using namespace Napi;

// note: C++ functions cannot have same name as the Go functions!

void checkError(Napi::Env env, char* goResultError) {
  if (goResultError != NULL) {
    char* error = new char[strlen(goResultError)];
    strcpy(error, goResultError);
    free(goResultError);

    throw Napi::Error::New(env, error);
  }

  free(goResultError);
}

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

  char *goResult = SetOsStore(serviceName, keyName, data);
  Napi::String result = Napi::String::New(env, goResult);

  delete [] serviceName;
  delete [] keyName;
  delete [] data;
  free(goResult);

  return result;
}

Napi::String getOsStore(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  std::string serviceNameArg = info[0].As<Napi::String>().ToString();
  char *serviceName = new char[serviceNameArg.length() + 1];
  strcpy(serviceName, serviceNameArg.c_str());

  std::string keyNameArg = info[1].As<Napi::String>().ToString();
  char *keyName = new char[keyNameArg.length() + 1];
  strcpy(keyName, keyNameArg.c_str());

  char *goResult = GetOsStore(serviceName, keyName);
  Napi::String result = Napi::String::New(env, goResult);

  delete [] serviceName;
  delete [] keyName;
  free(goResult);

  return result;
}

Napi::Array listOsStore(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  std::string serviceNameArg = info[0].As<Napi::String>().ToString();
  char *serviceName = new char[serviceNameArg.length() + 1];
  strcpy(serviceName, serviceNameArg.c_str());

  char **goResult = ListOsStore(serviceName);
  size_t i, resultSize;
  for (size_t i = resultSize = 0; goResult[i] != NULL; i++)
    resultSize += 1;

  Napi::Array result = Napi::Array::New(env, resultSize);

  for (i = 0; i < resultSize; i++) {
    Napi::String auxStr = Napi::String::New(env, goResult[i]);
    result[i] = auxStr;
  }

  delete [] serviceName;
  for (i = 0; i < resultSize; i++)
    free(goResult[i]);
  free(goResult);

  return result;
}

Napi::String deleteOsStore(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  std::string serviceNameArg = info[0].As<Napi::String>().ToString();
  char *serviceName = new char[serviceNameArg.length() + 1];
  strcpy(serviceName, serviceNameArg.c_str());

  std::string keyNameArg = info[1].As<Napi::String>().ToString();
  char *keyName = new char[keyNameArg.length() + 1];
  strcpy(keyName, keyNameArg.c_str());

  char *goResult = DeleteOsStore(serviceName, keyName);
  Napi::String result = Napi::String::New(env, goResult);

  delete [] serviceName;
  delete [] keyName;
  free(goResult);

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

  char *goResult = SetFileStore(fileSaveDir, fileName, data, filePassword);
  Napi::String result = Napi::String::New(env, goResult);

  delete [] fileSaveDir;
  delete [] fileName;
  delete [] data;
  free(goResult);

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

  char *goResult = GetFileStore(fileSaveDir, fileName, filePassword);
  Napi::String result = Napi::String::New(env, goResult);

  delete [] fileSaveDir;
  delete [] fileName;
  free(goResult);

  return result;
}

Napi::Uint8Array getFileStoreBytes(const Napi::CallbackInfo& info) {
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

  auto goResult = GetFileStoreBytes(fileSaveDir, fileName, filePassword);

  delete [] fileSaveDir;
  delete [] fileName;

  checkError(env, goResult.r2);

  void* data = malloc(goResult.r1);
  bcopy(goResult.r0, data, goResult.r1);
  free(goResult.r0);

  auto buffer = Napi::ArrayBuffer::New(env, data, goResult.r1);

  return Napi::Uint8Array::New(env, buffer.ByteLength(), buffer, 0);
}

Napi::Array listFileStore(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  std::string fileSaveDirArg = info[0].As<Napi::String>().ToString();
  char *fileSaveDir = new char[fileSaveDirArg.length() + 1];
  strcpy(fileSaveDir, fileSaveDirArg.c_str());

  char **goResult = ListFileStore(fileSaveDir);
  size_t i, resultSize;
  for (size_t i = resultSize = 0; goResult[i] != NULL; i++)
    resultSize += 1;

  Napi::Array result = Napi::Array::New(env, resultSize);

  for (i = 0; i < resultSize; i++) {
    Napi::String auxStr = Napi::String::New(env, goResult[i]);
    result[i] = auxStr;
  }

  delete [] fileSaveDir;
  for (size_t i = 0; i < resultSize; i++)
    free(goResult[i]);
  free (goResult);

  return result;
}

Napi::String deleteFileStore(const Napi::CallbackInfo& info) {
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

  char *goResult = DeleteFileStore(fileSaveDir, fileName, filePassword);
  Napi::String result = Napi::String::New(env, goResult);

  delete [] fileSaveDir;
  delete [] fileName;
  free(goResult);

  return result;
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  exports.Set(Napi::String::New(env, "setOsStore"),
              Napi::Function::New(env, setOsStore));
  exports.Set(Napi::String::New(env, "getOsStore"),
              Napi::Function::New(env, getOsStore));
  exports.Set(Napi::String::New(env, "listOsStore"),
              Napi::Function::New(env, listOsStore));
  exports.Set(Napi::String::New(env, "deleteOsStore"),
              Napi::Function::New(env, deleteOsStore));
  exports.Set(Napi::String::New(env, "setFileStore"),
              Napi::Function::New(env, setFileStore));
  exports.Set(Napi::String::New(env, "getFileStore"),
              Napi::Function::New(env, getFileStore));
  exports.Set(Napi::String::New(env, "getFileStoreBytes"),
              Napi::Function::New(env, getFileStoreBytes));
  exports.Set(Napi::String::New(env, "listFileStore"),
              Napi::Function::New(env, listFileStore));
  exports.Set(Napi::String::New(env, "deleteFileStore"),
              Napi::Function::New(env, deleteFileStore));
  return exports;
}

NODE_API_MODULE(addon, Init)
