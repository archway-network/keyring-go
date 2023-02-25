package main

import "C"

import (
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

func main() {}
