package main

import (
	"fmt"
	"strconv"

	"github.com/astaxie/beego"
)

// The main function defines a single route, its handler
// and starts listening on port 8080 (default port for Beego)
func main() {
	/* This would match routes like the following:
	   /sum/3/5
	   /product/6/23
	   ...
	*/
	fmt.Println("Starting beego server...")
	beego.Router("/:operation/:num1:int/:num2:int", &mainController{})
	beego.Run()
}

// This is the controller that this application uses
type mainController struct {
	beego.Controller
}

// Get() handles all requests to the route defined above
func (c *mainController) Get() {
	//Obtain the values of the route parameters defined in the route above
	operation := c.Ctx.Input.Param(":operation")
	num1, _ := strconv.Atoi(c.Ctx.Input.Param(":num1"))
	num2, _ := strconv.Atoi(c.Ctx.Input.Param(":num2"))

	//Set the values for use in the template
	c.Data["operation"] = operation
	c.Data["num1"] = num1
	c.Data["num2"] = num2
	c.TplName = "result.html"

	// Perform the calculation depending on the 'operation' route parameter
	switch operation {
	case "add":
		c.Data["result"] = add(num1, num2)
	case "mult":
		c.Data["result"] = multiply(num1, num2)
	default:
		c.TplName = "invalid-route.html"
	}
}

func add(n1, n2 int) int {
	return n1 + n2
}

func multiply(n1, n2 int) int {
	return n1 * n2
}
