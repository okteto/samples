package payroll;

import java.util.Map;
import java.util.HashMap;
import java.util.List;
import java.util.ArrayList;
import java.util.Collection;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.http.HttpStatus;

@RestController
public class PayrollController {

    private Map<Integer, Employee> employees;

    public PayrollController() {
        this.employees = new HashMap<Integer, Employee>();
        this.employees.put(1, new Employee(1, "Pablo Chico de Guzman"));
        this.employees.put(2, new Employee(2, "Ramon Lamana"));
        this.employees.put(3, new Employee(3, "Ramiro Berrelleza"));
        this.employees.put(4, new Employee(4, "Cindy Lopez"));
    }

    @RequestMapping("/")
    public String index() {
        return "Greetings from Spring Boot!";
    }

    @RequestMapping("/employees")
    public Collection<Employee> getAll() {
        return this.employees.values();
    }

    @RequestMapping("/employees/{employeeID}")
    public Employee get(@PathVariable(value="employeeID") final int id) throws EmployeeNotFoundException {
        if (this.employees.containsKey(id)) {
            return this.employees.get(id);
        } else{
            throw new EmployeeNotFoundException(); 
        }
    }
    
    @ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "employee not found")
    public class EmployeeNotFoundException extends RuntimeException {
}
}
