const { Employee, Task } = require('../models');

const seedDB = async () => {
	const dummyEmployee = await Employee.create({
		firstname: "Melissa",
		lastname: "Lynch",
		department: "Computer Science"
	});
	const dummyEmployee2 = await Employee.create({
		firstname: "Kim",
		lastname: "Kardashian",
		department: "model"

	});
	const dummyEmployee3 = await Employee.create({
		firstname: "Jason",
		lastname: "Comisi",
		department: "Student"
	});

	const dummyEmployee4 = await Employee.create({
		firstname: "Dan",
		lastname: "Elkik",
		department: "TA"
	});

	const dummyTask = await Task.create({
		description: "CSCI 39548",
		priority: "High",
		completion_status: "not complete"
	});
	const dummyTask1 = await Task.create({
		description: "Chores",
		priority: "Medium",
		completion_status: "not complete"
	});
	const dummyTask2 = await Task.create({
		description: "Homework",
		priority: "Low",
		completion_status: "not complete"
	});


	await dummyTask.setEmployee(dummyEmployee);

}

module.exports = seedDB;