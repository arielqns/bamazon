Name
# bamazon

# Link
Deployment Link: https://arielqns.github.io/bamazon/
GitHub Resipository Link: https://github.com/arielqns/bamazon
Link to video: 

# Created by
Ariel Quinones Octomber 2019

# Description
Bamazon combines Node.js command line interface with MySQL database to create an storefront Amazon-like application. The USERS (customer, manager, or supervisor) interact with the store through a system of commands.


# Instructions:
- Git clone in your local git repo
https://github.com/arielqns/bamazon

- NPM Install Dependencies
    1. Inquirer
    2. MySQL 
    3. DotEnv

- Set up MySQL database
    Use data from schema.sql

<strong>Customer View</strong>
    1. Open up terminal
    2. Use bash command cd to direct to your local repo folder
    3. In terminal enter node bamazonCustomer.js
    4. You will see connected as id in your terminal window to indicate successful connection to MySQL
	connection.connect(function(err) {
	  if (err) throw err;
	  console.log("connected as id " + connection.threadId); 
	  purchase();
	});
    5. Enter the Item Id (table's first column) of the product you wish to purchase
    6. Then you will be prompted to enter the quantity of products you wish to purchase
    7. Next either your purchase total or an alert of insufficient inventory will display
    8. After each purchase, you can choose to continue or exit by using the up and down arrow keys on your keyboard (exit early with ctrl + c)
    9. If you select no, connection to your MySQL ends

<strong>Manager View</strong>
    1. Open up terminal
    2. Use bash command cd to direct to your local repo folder
    3. In terminal enter node bamazonManager.js
    4. You will see connected as id in your terminal window to indicate successful connection to MySQL
    connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId); 
  manage();
});
    5. You will then be prompted 4 options:
- View Products
- View Low Inventory
- Add to Inventory
- Add New Products
    6. View Low Inventory option displays items with quantity < 5
    7. Add New Products will prompt the user to select a department. Note that this a rawlist so option selection must be done through the number keys.
    8. After each manage, you can choose to continue or exit by using the up and down arrow keys on your keyboard (exit early with ctrl + c)
    9. If you select no, connection to your MySQL ends



# Created using: 
Javascript, Node.js, MySQL, NPM packages: Inquirer, MySQL, DotEnv. 

