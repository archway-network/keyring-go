package main

//#include <stdlib.h>
import "C"

import (
	"runtime"

	"errors"

	"github.com/99designs/keyring"
)

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
func SetOsStore(serviceName *C.char, keyName *C.char, data *C.char) {
	backendType, err := getBackendType()
	if err != nil {
		panic("Getting backend type has failed! " + err.Error())
	}

	ring, _ := keyring.Open(keyring.Config{
		AllowedBackends: []keyring.BackendType{backendType},
		ServiceName:     C.GoString(serviceName),
	})

	ring.Set(keyring.Item{
		Key:  C.GoString(keyName),
		Data: []byte(C.GoString(data)),
	})
}

//export GetOsStore
func GetOsStore(serviceName *C.char, keyName *C.char) *C.char {
	backendType, err := getBackendType()
	if err != nil {
		panic("Getting backend type has failed! " + err.Error())
	}

	ring, _ := keyring.Open(keyring.Config{
		AllowedBackends: []keyring.BackendType{backendType},
		ServiceName:     C.GoString(serviceName),
	})

	i, _ := ring.Get((C.GoString(keyName)))
	dataStr := string(i.Data[:])
	returnStr := (*C.char)(C.CString(dataStr))
	// free at caller
	return returnStr
}

// note: ~/ is root of user dir
//
//export SetFileStore
func SetFileStore(fileSaveDir *C.char, fileName *C.char, data *C.char, filePassword *C.char) *C.char {
	saveDir := C.GoString(fileSaveDir)
	// saveDir, _ := os.Getwd()
	_, err := getBackendType()
	if err != nil {
		panic("Getting backend type has failed! " + err.Error())
	}

	ring, openErr := keyring.Open(keyring.Config{
		AllowedBackends:  []keyring.BackendType{keyring.FileBackend},
		FilePasswordFunc: keyring.FixedStringPrompt(C.GoString(filePassword)),
		FileDir:          saveDir,
	})
	if openErr != nil {
		openErrStr := string(openErr.Error())
		returnErrStr := (*C.char)(C.CString(openErrStr))
		// free at caller
		return returnErrStr
	}

	dataStr := C.GoString(data)
	fileNameStr := C.GoString(fileName)
	setErr := ring.Set(keyring.Item{
		Key:  fileNameStr,
		Data: []byte(dataStr),
	})
	if setErr != nil {
		errStr := string(setErr.Error())
		returnErrStr := (*C.char)(C.CString(errStr))
		// free at caller
		return returnErrStr
	}

	fileItem, getErr := ring.Get(fileNameStr)
	if getErr != nil {
		errStr := string(getErr.Error())
		returnErrStr := (*C.char)(C.CString(errStr))
		// free at caller
		return returnErrStr
	}
	if string(fileItem.Data) != dataStr {
		returnErrStr := (*C.char)(C.CString("File was not found"))
		// free at caller
		return returnErrStr
	}

	result := (*C.char)(C.CString(""))
	// free at caller
	return result
}

//export GetFileStore
func GetFileStore(fileSaveDir *C.char, fileName *C.char, filePassword *C.char) *C.char {
	saveDir := C.GoString(fileSaveDir)
	_, err := getBackendType()
	if err != nil {
		panic("Getting backend type has failed! " + err.Error())
	}

	ring, openErr := keyring.Open(keyring.Config{
		AllowedBackends:  []keyring.BackendType{keyring.FileBackend},
		FilePasswordFunc: keyring.FixedStringPrompt(C.GoString(filePassword)),
		FileDir:          saveDir,
	})
	if openErr != nil {
		openErrStr := string(openErr.Error())
		returnErrStr := (*C.char)(C.CString(openErrStr))
		// free at caller
		return returnErrStr
	}

	fileNameStr := C.GoString(fileName)
	fileItem, getErr := ring.Get(fileNameStr)
	if getErr != nil {
		errStr := string(getErr.Error())
		returnErrStr := (*C.char)(C.CString(errStr))
		// free at caller
		return returnErrStr
	}

	result := (*C.char)(C.CString(string(fileItem.Data)))
	// free at caller
	return result
}

func main() {}
