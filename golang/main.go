package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
)

const namespaceFile = "/var/run/secrets/kubernetes.io/serviceaccount/namespace"

func main() {
	fmt.Println("Starting hello-world server...")
	http.HandleFunc("/", helloServer)
	http.ListenAndServe(":8080", nil)
}

func helloServer(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, helloMessage())
}

func helloMessage() string {
	namespace := getNamespace()
	return fmt.Sprintf("Hello from the cluster namespace %s", namespace)
}

func getNamespace() string {
	bytes, err := ioutil.ReadFile(namespaceFile)
	if err != nil {
		fmt.Println("Error reading current namespace")
		os.Exit(1)
	}
	return string(bytes)
}
