package main

//#include <stdlib.h>
import "C"

import (
	"unsafe"

	"github.com/99designs/keyring"
)

//export SetOsStore
func SetOsStore(serviceName *C.char, keyName *C.char, data *C.char) {
	ring, _ := keyring.Open(keyring.Config{
		ServiceName: C.GoString(serviceName),
	})

	_ = ring.Set(keyring.Item{
		Key:  C.GoString(keyName),
		Data: []byte(C.GoString(data)),
	})
}

//export GetOsStore
func GetOsStore(serviceName *C.char, keyName *C.char) *C.char {
	ring, _ := keyring.Open(keyring.Config{
		ServiceName: C.GoString(serviceName),
	})

	i, _ := ring.Get((C.GoString(keyName)))
	dataStr := string(i.Data[:])
	returnStr := (*C.char)(C.CString(dataStr))
	defer C.free(unsafe.Pointer(returnStr))

	return returnStr
}

// note: ~/ is root of user dir
//
//export SetFileStore
func SetFileStore(fileSaveDir *C.char, fileName *C.char, data *C.char) *C.char {
	saveDir := C.GoString(fileSaveDir)
	// saveDir, _ := os.Getwd()

	ring, openErr := keyring.Open(keyring.Config{
		AllowedBackends:  []keyring.BackendType{"file"},
		FilePasswordFunc: keyring.FixedStringPrompt("Please select a password"),
		FileDir:          saveDir,
	})
	if openErr != nil {
		openErrStr := string(openErr.Error())
		returnErrStr := (*C.char)(C.CString(openErrStr))
		defer C.free(unsafe.Pointer(returnErrStr))
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
		defer C.free(unsafe.Pointer(returnErrStr))
		return returnErrStr
	}

	fileItem, getErr := ring.Get(fileNameStr)
	if getErr != nil {
		errStr := string(getErr.Error())
		returnErrStr := (*C.char)(C.CString(errStr))
		defer C.free(unsafe.Pointer(returnErrStr))
		return returnErrStr
	}
	if string(fileItem.Data) != dataStr {
		returnErrStr := (*C.char)(C.CString("File was not found"))
		defer C.free(unsafe.Pointer(returnErrStr))
		return returnErrStr
	}

	result := (*C.char)(C.CString(""))
	defer C.free(unsafe.Pointer(result))
	return result
}

//export GetFileStore
func GetFileStore(fileSaveDir *C.char, fileName *C.char) *C.char {
	saveDir := C.GoString(fileSaveDir)

	ring, openErr := keyring.Open(keyring.Config{
		AllowedBackends:  []keyring.BackendType{"file"},
		FilePasswordFunc: keyring.FixedStringPrompt("Please select a password"),
		FileDir:          saveDir,
	})
	if openErr != nil {
		openErrStr := string(openErr.Error())
		returnErrStr := (*C.char)(C.CString(openErrStr))
		defer C.free(unsafe.Pointer(returnErrStr))
		return returnErrStr
	}

	fileNameStr := C.GoString(fileName)
	fileItem, getErr := ring.Get(fileNameStr)
	if getErr != nil {
		errStr := string(getErr.Error())
		returnErrStr := (*C.char)(C.CString(errStr))
		defer C.free(unsafe.Pointer(returnErrStr))
		return returnErrStr
	}

	result := (*C.char)(C.CString(string(fileItem.Data)))
	defer C.free(unsafe.Pointer(result))
	return result
}

func main() {}
