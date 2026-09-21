class Employee {
    constructor(id, name, baseSalary) {
        this.id = id;
        this.name = name;
        this.baseSalary = baseSalary;
    }

    calculateSalary() {
        return this.baseSalary;
    }
}

// const employee = new Employee(1, "Nguyễn Văn A", 10000000);
// console.log(employee.calculateSalary());

class Developer extends Employee {
    constructor(id, name, baseSalary, overtimeHours) {
        super(id, name, baseSalary);
        this.overtimeHours = overtimeHours;
    }

    calculateSalary() {
        return this.baseSalary + this.overtimeHours * 200000;
    }
}

// const developer = new Developer(2, "Trần Thị B", 12000000, 10);
// console.log(developer.calculateSalary());

class Manager extends Employee {
    constructor(id, name, baseSalary, bonus) {
        super(id, name, baseSalary);
        this.bonus = bonus;
    }

    calculateSalary() {
        return this.baseSalary + this.bonus;
    }
}

const manager = new Manager(3, "Lê Văn C", 20000000, 5000000);
console.log(manager.calculateSalary());

function calculateTotalSalary(employeeList) {
    return employeeList.reduce((total,employee) => total + employee.calculateSalary(),0);
}

const employees = [
  new Developer(1, "Nguyễn Văn A", 12000000, 10),
  new Developer(2, "Trần Thị B", 15000000, 5),
  new Manager(3, "Lê Văn C", 20000000, 5000000),
  new Manager(4, "Phạm Thị D", 18000000, 3000000),
];

const totalSalary = calculateTotalSalary(employees);
console.log(totalSalary);
