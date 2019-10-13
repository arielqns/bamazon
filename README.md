# <strong>bamazon</strong>

# Links
- Deployment Link: https://arielqns.github.io/bamazon/
- GitHub Resipository Link: https://github.com/arielqns/bamazon
- Link to video: https://drive.google.com/file/d/13Q5Tb85Bw4-zPdlPriWdZxGGLg1GFNjB/view?usp=sharing

# Created by
Ariel Quinones, Octomber 2019

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

- <strong>For Customer View</strong>
    1. Open bamazonCostumer.js in terminal.
    2. You may need to update your MySQL password on line 11.  
    3. Enter node bamazonCustomer.js to see Products Chart.
    4. Enter the ID (1st column) of the product you wish to purchase. Or type Q to exit.
    5. Then enter the quantity of products you wish to purchase.
    6. Next either a purchase confirmation "Product Bought!" or an alert "Not a valid selection!" display.
    7. After each purchase, you can choose to continue by adding ID # or exit by selecting Q.
    
    Notes: Inventory doesnt reflect subtractions after purchases/Im working on it......

- <strong>Manager View</strong>
    1. Open bamazonManager.js in terminal.
    2. You may need to update your MySQL password on line 11. 
    3. Enter node bamazonManager.js
    4. After a "HELLO MANAGER!" greeting, You will then be prompted with 4 options (use arrow keys to select):
        - View Products for Sale:
        This will display the Products Chart.

        - View Low Inventory:
        This will display products with > 5 stockquantity. 

        - Add to Inventory:
        Use the arrows to select the product. (Working on this..error after selection).

        - Add New Product:
        Enter product name, department, price and quantity. A confirmation message listing the above information will diplay (working on reflecting the addition on the product chart).

        - Exit:
        Select exit to finish.



# Created using: 
Javascript, Node.js, MySQL, NPM packages: Inquirer, MySQL, DotEnv. 

