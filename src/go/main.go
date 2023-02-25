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

	// i, _ := ring.Get(C.GoString(keyName))
	// fmt.Printf("%s", i.Data)
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

func main() {}
