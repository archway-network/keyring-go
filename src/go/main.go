package main

import "C"

import (
	"fmt"

	"github.com/99designs/keyring"
)

//export SetOsStore
func SetOsStore() {
	const keyName string = "keyring"

	ring, _ := keyring.Open(keyring.Config{
		ServiceName: "archwayhq",
	})

	_ = ring.Set(keyring.Item{
		Key:  keyName,
		Data: []byte("123456789"),
	})

	i, _ := ring.Get(keyName)

	fmt.Printf("%s", i.Data)
}

func main() {}
