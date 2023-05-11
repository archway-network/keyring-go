package main

//#include <stdlib.h>
import "C"

import (
	"runtime"

	"errors"

	"unsafe"

	"fmt"

	"github.com/99designs/keyring"
)

const ERROR_PREFIX string = "[-!ERROR-]: "

func formatError(err error) *C.char {
	auxVar := (*C.char)(C.CString(ERROR_PREFIX + string(err.Error())))
	defer C.free(unsafe.Pointer(auxVar))
	return auxVar
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
	fmt.Println("SetOsStore start")
	backendType, err := getBackendType()
	if err != nil {
		return formatError(err)
	}
	fmt.Println("SetOsStore.BackendType", backendType)

	ring, openErr := keyring.Open(keyring.Config{
		AllowedBackends: []keyring.BackendType{backendType},
		ServiceName:     C.GoString(serviceName),
	})
	if openErr != nil {
		return formatError(openErr)
	} else {
		fmt.Println("SetOsStore opened keyring")
	}

	setErr := ring.Set(keyring.Item{
		Key:  C.GoString(keyName),
		Data: []byte(C.GoString(data)),
	})
	if setErr != nil {
		return formatError(setErr)
	} else {
		fmt.Println("SetOsStore set keyring")
	}
	fmt.Println("SetOsStore end")

	return nil
}

//export GetOsStore
func GetOsStore(serviceName *C.char, keyName *C.char) *C.char {
	fmt.Println("GetOsStore start")
	backendType, err := getBackendType()
	if err != nil {
		return formatError(err)
	}
	fmt.Println("GetOsStore.BackendType", backendType)

	ring, openErr := keyring.Open(keyring.Config{
		AllowedBackends: []keyring.BackendType{backendType},
		ServiceName:     C.GoString(serviceName),
	})
	if openErr != nil {
		return formatError(openErr)
	} else {
		fmt.Println("GetOsStore opened keyring")
	}

	i, getErr := ring.Get((C.GoString(keyName)))
	if getErr != nil {
		return formatError(getErr)
	} else {
		fmt.Println("GetOsStore got keyring")
	}

	returnStr := (*C.char)(C.CString(string(i.Data)))
	defer C.free(unsafe.Pointer(returnStr))
	fmt.Println("GetOsStore end")
	return returnStr
}

// note: ~/ is root of user dir
//
//export SetFileStore
func SetFileStore(fileSaveDir *C.char, fileName *C.char, data *C.char, filePassword *C.char) *C.char {
	fmt.Println("SetFileStore start")
	saveDir := C.GoString(fileSaveDir)
	// saveDir, _ := os.Getwd()
	backendType, err := getBackendType()
	if err != nil {
		return formatError(err)
	}
	fmt.Println("SetFileStore.BackendType", backendType)

	ring, openErr := keyring.Open(keyring.Config{
		AllowedBackends:  []keyring.BackendType{keyring.FileBackend},
		FilePasswordFunc: keyring.FixedStringPrompt(C.GoString(filePassword)),
		FileDir:          saveDir,
	})
	if openErr != nil {
		return formatError(openErr)
	} else {
		fmt.Println("SetFileStore opened keyring")
	}

	dataStr := C.GoString(data)
	fileNameStr := C.GoString(fileName)
	setErr := ring.Set(keyring.Item{
		Key:  fileNameStr,
		Data: []byte(dataStr),
	})
	if setErr != nil {
		return formatError(setErr)
	} else {
		fmt.Println("SetFileStore set keyring")
	}

	fileItem, getErr := ring.Get(fileNameStr)
	if getErr != nil {
		return formatError(getErr)
	}
	if string(fileItem.Data) != dataStr {
		returnErrStr := (*C.char)(C.CString("File was not found"))
		defer C.free(unsafe.Pointer(returnErrStr))
		return returnErrStr
	}

	result := (*C.char)(C.CString(""))
	defer C.free(unsafe.Pointer(result))
	fmt.Println("SetFileStore end")
	return result
}

//export GetFileStore
func GetFileStore(fileSaveDir *C.char, fileName *C.char, filePassword *C.char) *C.char {
	fmt.Println("GetFileStore start")
	saveDir := C.GoString(fileSaveDir)
	backendType, err := getBackendType()
	if err != nil {
		return formatError(err)
	}
	fmt.Println("GetFileStore.BackendType", backendType)

	ring, openErr := keyring.Open(keyring.Config{
		AllowedBackends:  []keyring.BackendType{keyring.FileBackend},
		FilePasswordFunc: keyring.FixedStringPrompt(C.GoString(filePassword)),
		FileDir:          saveDir,
	})
	if openErr != nil {
		return formatError(openErr)
	} else {
		fmt.Println("GetFileStore opened keyring")
	}

	fileNameStr := C.GoString(fileName)
	fileItem, getErr := ring.Get(fileNameStr)
	if getErr != nil {
		return formatError(getErr)
	} else {
		fmt.Println("GetFileStore got keyring")
	}

	result := (*C.char)(C.CString(string(fileItem.Data)))
	defer C.free(unsafe.Pointer(result))
	fmt.Println("GetFileStore end")
	return result
}

func main() {}
