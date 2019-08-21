package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
)

const namespaceFile = "/var/run/secrets/kubernetes.io/serviceaccount/namespace"

func main() {
	fmt.Println("Starting hello-world server...")
	http.HandleFunc("/", helloServer)
	http.ListenAndServe(":8080", nil)
}

func helloServer(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Received request")
	namespace, err := getNamespace()
	if err != nil {
		fmt.Fprint(w, err)
	} else {
		fmt.Fprint(w, fmt.Sprintf("Hello from the cluster namespace '%s'", namespace))
	}
}

func getNamespace() (string, error) {
	bytes, err := ioutil.ReadFile(namespaceFile)
	if err != nil {
		return "", fmt.Errorf("Looks like you are not running inside a Kubernetes Pod")
	}
	return string(bytes), nil
}
