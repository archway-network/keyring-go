package main

//#include <stdio.h>
//#include <stdlib.h>
import "C"

import (
	"runtime"

	"errors"

	"unsafe"

	"github.com/99designs/keyring"
)

const ERROR_PREFIX string = "[-!ERROR-]: "

func formatError(err error) *C.char {
	// Don't forget to free the memory of this pointer in the c++ part of the code
	return (*C.char)(C.CString(ERROR_PREFIX + string(err.Error())))
}

func formatArrayWithError(err error) **C.char {
	result := C.malloc(C.size_t(2) * C.size_t(unsafe.Sizeof(uintptr(0))))
	indexableResult := (*[1 << 30]*C.char)(result)
	indexableResult[0] = formatError(err)

	// Don't forget to free the memory of this pointer in the c++ part of the code
	return (**C.char)(result)
}

func buildStringArray(list []string) **C.char {
	result := C.malloc(C.size_t(len(list)+1) * C.size_t(unsafe.Sizeof(uintptr(0))))
	indexableResult := (*[1 << 30]*C.char)(result)
	for i, auxValue := range list {
		indexableResult[i] = (*C.char)(C.CString(string(auxValue)))
	}

	// Don't forget to free the memory of this pointer in the c++ part of the code
	return (**C.char)(result)
}

func getBackendType() (keyring.BackendType, error) {
	os := runtime.GOOS
	switch os {
	case "windows":
		return keyring.WinCredBackend, nil
	case "darwin":
		return keyring.KeychainBackend, nil
	case "linux":
		return keyring.SecretServiceBackend, nil
	default:
		return keyring.InvalidBackend, errors.New("Error")
	}
}

//export SetOsStore
func SetOsStore(serviceName *C.char, keyName *C.char, data *C.char) *C.char {
	backendType, err := getBackendType()
	if err != nil {
		return formatError(err)
	}

	ring, openErr := keyring.Open(keyring.Config{
		AllowedBackends: []keyring.BackendType{backendType},
		ServiceName:     C.GoString(serviceName),
	})
	if openErr != nil {
		return formatError(openErr)
	}

	setErr := ring.Set(keyring.Item{
		Key:  C.GoString(keyName),
		Data: []byte(C.GoString(data)),
	})
	if setErr != nil {
		return formatError(setErr)
	}

	// Don't forget to free the memory of this pointer in the c++ part of the code
	return (*C.char)(C.CString("success"))
}

//export GetOsStore
func GetOsStore(serviceName *C.char, keyName *C.char) *C.char {
	backendType, err := getBackendType()
	if err != nil {
		return formatError(err)
	}

	ring, openErr := keyring.Open(keyring.Config{
		AllowedBackends: []keyring.BackendType{backendType},
		ServiceName:     C.GoString(serviceName),
	})
	if openErr != nil {
		return formatError(openErr)
	}

	i, getErr := ring.Get((C.GoString(keyName)))
	if getErr != nil {
		return formatError(getErr)
	}

	returnStr := (*C.char)(C.CString(string(i.Data)))

	// Don't forget to free the memory of this pointer in the c++ part of the code
	return returnStr
}

//export ListOsStore
func ListOsStore(serviceName *C.char) **C.char {
	backendType, err := getBackendType()
	if err != nil {
		return formatArrayWithError(err)
	}

	ring, openErr := keyring.Open(keyring.Config{
		AllowedBackends: []keyring.BackendType{backendType},
		ServiceName:     C.GoString(serviceName),
	})
	if openErr != nil {
		return formatArrayWithError(openErr)
	}

	list, getErr := ring.Keys()
	if getErr != nil {
		return formatArrayWithError(getErr)
	}

	// Don't forget to free the memory of this pointer in the c++ part of the code
	return buildStringArray(list)
}

//export DeleteOsStore
func DeleteOsStore(serviceName *C.char, keyName *C.char) *C.char {
	backendType, err := getBackendType()
	if err != nil {
		return formatError(err)
	}

	ring, openErr := keyring.Open(keyring.Config{
		AllowedBackends: []keyring.BackendType{backendType},
		ServiceName:     C.GoString(serviceName),
	})
	if openErr != nil {
		return formatError(openErr)
	}

	removeErr := ring.Remove((C.GoString(keyName)))
	if removeErr != nil {
		return formatError(removeErr)
	}

	// Don't forget to free the memory of this pointer in the c++ part of the code
	return (*C.char)(C.CString("success"))
}

// note: ~/ is root of user dir
//
//export SetFileStore
func SetFileStore(fileSaveDir *C.char, fileName *C.char, data *C.char, filePassword *C.char) *C.char {
	saveDir := C.GoString(fileSaveDir)
	// saveDir, _ := os.Getwd()

	ring, openErr := keyring.Open(keyring.Config{
		AllowedBackends:  []keyring.BackendType{keyring.FileBackend},
		FilePasswordFunc: keyring.FixedStringPrompt(C.GoString(filePassword)),
		FileDir:          saveDir,
	})
	if openErr != nil {
		return formatError(openErr)
	}

	setErr := ring.Set(keyring.Item{
		Key:  C.GoString(fileName),
		Data: []byte(C.GoString(data)),
	})
	if setErr != nil {
		return formatError(setErr)
	}

	// Don't forget to free the memory of this pointer in the c++ part of the code
	return (*C.char)(C.CString("success"))
}

//export GetFileStore
func GetFileStore(fileSaveDir *C.char, fileName *C.char, filePassword *C.char) *C.char {
	saveDir := C.GoString(fileSaveDir)

	ring, openErr := keyring.Open(keyring.Config{
		AllowedBackends:  []keyring.BackendType{keyring.FileBackend},
		FilePasswordFunc: keyring.FixedStringPrompt(C.GoString(filePassword)),
		FileDir:          saveDir,
	})
	if openErr != nil {
		return formatError(openErr)
	}

	fileItem, getErr := ring.Get(C.GoString(fileName))
	if getErr != nil {
		return formatError(getErr)
	}

	result := (*C.char)(C.CString(string(fileItem.Data)))

	// Don't forget to free the memory of this pointer in the c++ part of the code
	return result
}

//export ListFileStore
func ListFileStore(fileSaveDir *C.char) **C.char {
	saveDir := C.GoString(fileSaveDir)

	ring, openErr := keyring.Open(keyring.Config{
		AllowedBackends:  []keyring.BackendType{keyring.FileBackend},
		FilePasswordFunc: keyring.FixedStringPrompt(""),
		FileDir:          saveDir,
	})
	if openErr != nil {
		return formatArrayWithError(openErr)
	}

	list, getErr := ring.Keys()
	if getErr != nil {
		return formatArrayWithError(getErr)
	}

	// Don't forget to free the memory of this pointer in the c++ part of the code
	return buildStringArray(list)
}

//export DeleteFileStore
func DeleteFileStore(fileSaveDir *C.char, fileName *C.char, filePassword *C.char) *C.char {
	saveDir := C.GoString(fileSaveDir)
	// saveDir, _ := os.Getwd()

	ring, openErr := keyring.Open(keyring.Config{
		AllowedBackends:  []keyring.BackendType{keyring.FileBackend},
		FilePasswordFunc: keyring.FixedStringPrompt(""),
		FileDir:          saveDir,
	})
	if openErr != nil {
		return formatError(openErr)
	}

	removeErr := ring.Remove(C.GoString(fileName))
	if removeErr != nil {
		return formatError(removeErr)
	}

	// Don't forget to free the memory of this pointer in the c++ part of the code
	return (*C.char)(C.CString("success"))
}

func main() {}
