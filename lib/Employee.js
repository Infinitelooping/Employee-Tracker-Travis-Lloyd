class Employee {
    constructor(first_name, last_name, role_id, manager_name) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.role_id = role_id;
        if(manager_name) {
            this.manager_name = manager_name;
        } else {
            this.manager_name = "No Manager";
        }
    }
}

module.exports = Employee;