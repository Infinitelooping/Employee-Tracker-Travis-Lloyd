INSERT INTO departments (title)
VALUES 
("Customer Support"),
("Finance"),
("Engineering"),
("Marketing"),
("Sales");


INSERT INTO roles (title, salary, department_id)
VALUES
("Senior Engineer", 120000.00 , 3),
("Developer", 60000.00, 3),
("Account Executive", 50000.00, 5),
("SDR", 40000.00, 5),
("SEO Lead", 65000.00, 4),
("Customer Success Rep", 35000.00, 1),
("CFO", 300000.00, 2);



INSERT INTO employees (first_name, last_name, role_id, manager_name)
VALUES
("Chad", "Burner", 7, "James Call"),
("Travis", "Lloyd", 2, "Audrey Lloyd"),
("Zach", "Olson", 6, "Lily Olson"),
("Ian", "Olson", 5, "Jill Olson");