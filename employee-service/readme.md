This is an Microservice where Employee service is one. remaining of service are api-gateway,auth-service. api gateway handling api request and auth handling auth..

Employee Services..
👤 Employee Service
Responsibilities:

1.Employee profile (name, email, phone, address)
2.Job info (designation, department, salary basic info)
3.Employee CRUD (create, update, delete)
4.Document info (CV, NID, etc. — optional)
Manager-subordinate relation

schema for Employee:
name
email
phone
department
designation
salary
userId (Auth service এর সাথে link)





POST /employees → employee create
GET /employees → all employees
GET /employees/:id → single employee
PUT /employees/:id → update
DELETE /employees/:id → delete


* Implement endpoint to retrieve a single employee (GET /employees/:id)
* Implement endpoint to retrieve all employees (GET /employees)
Implement employee update endpoint (PUT /employees/:id)
Implement employee deletion endpoint (DELETE /employees/:id)
Define and validate employee data model/schema
Integrate employee service with Auth service for userId linkage

