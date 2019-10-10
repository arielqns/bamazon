var inquirer = require("inquirer");
var mysql = require ("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  // Your port; if not 3306
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "Ambarqui5!",
  database: "bamazon_db"
});
// call back 
connection.connect(function (err) {
  if (err) throw err;
  console.log("*******************");
  console.log("HELLO MANAGER!");
  console.log("*******************");
  promptMan();
});
function promptMan()
{
    inquirer.prompt([
        {
            name: "command",
            message: "/Select an option:",
            type: "list",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory","Add New Product", "Exit"]
        }
    ]).then(function (choice){
        switch (choice.command) {
            case  "View Products for Sale":
                showItems();
                break;
            case  "View Low Inventory":
                showItems();
                break;
            case  "Add to Inventory":
                showItems();
                break;
            case  "Add New Product":
                showItems();
                break;
            case  "Add New Product":
                showItems();
                break;

        };
    });
}

function showItems() {
    connection.query("SELECT * FROM products", function (err, results) {
        console.log("");
        for (var i = 0; i < results.length; i++) {
            console.log(
                results[i].itemid +
                " | " + results[i].productname +
                " | $" + results[i].price);
        }
        promptMan();
    });
}

function viewLowInv() {
    connection.query("SELECT * FROM products WHERE stockquantity < 5", function (err, results) {
        console.log("");
        for (var i = 0; i < results.length; i++) {
            console.log(
                results[i].item_id +
                " | " + results[i].productname +
                " | " + results[i].stockquantity + " in stock.");
        }
        promptMngr();
    });
}

function addInv() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        inquirer.prompt([
            {
                name: "item",
                message: "\nSelect the product you want to update.",
                type: "list",
                choices: function () {
                    var choices = [];
                    for (var i = 0; i < results.length; i++) {
                        choices.push(results[i].itemid + " | " + results[i].productname)
                    }
                    return choices;
                }
            }
        ]).then(function (chosenItem) {
            var splitItemId = chosenItem.item.split(" ", 1);
            var quantity = parseInt(splitItemId - 1);
            inquirer.prompt([{
                name: "addInv",
                message: "Enter the amount you want to add.",
                type: "input",
                validate: function (value) {
                    if (parseInt(value) < 0) {
                        console.log("\nPlease enter a valid input.")
                        return false;
                    } else if (parseInt(value) > 0) {
                        addInvUpdateDb(results, quantity, value, splitItemId);
                        return true;
                    }
                }
            }]);
        });
    });
}

function addNew() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        inquirer.prompt([
            {
                name: "productname",
                message: "\nEnter the product name.",
                type: "input"
            },
            {
                name: "departmentname",
                message: "\nEnter the department name.",
                type: "input"
            },
            {
                name: "price",
                message: "\nEnter the price.",
                type: "input"
            },
            {
                name: "stockquantity",
                message: "\nEnter the stock quantity.",
                type: "input",
                validate: function (stockquantity) {
                    if (parseInt(stockquantity) <= 0) {
                        console.log("\nPlease enter a valid stock quantity.")
                        return false;
                    } else {
                        return true;
                    }
                }
            },
        ]).then(function (input) {
            var query = connection.query(
                "INSERT INTO products SET ?",
                {
                    productname: input.productname,
                    departmentname: input.departmentname,
                    consumerprice: input.price,
                    stockquantity: parseInt(input.stockquantity)
                },
                function (err, res) {
                    console.log("\nYou have added: ");
                    console.log("Product Name: " + input.productname)
                    console.log("Department: " + input.departmentname)
                    console.log("Price: $" + input.price)
                    console.log("Stock Quantity: " + input.stockquantity)
                    promptMan();
                }

            );
        });
    });
}

function addInvUpdateDb(results, quantity, value, splitItemId) {
    var query = connection.query(
    "UPDATE products SET ? WHERE ?",
    [
    {
    stockquantity: parseInt(results[quantity].stockquantity) + parseInt(value)
    },
    {
    item_id: splitItemId
    }
    ],
    function (err, res) {
    var product = " product.\n";
    if (value > 1) {
    product = " products.\n";
    }
    console.log("");
    process.stdout.write(results[splitItemId - 1].productname);
    process.stdout.write(" updated by ");
    process.stdout.write(value);
    process.stdout.write(" more");
    process.stdout.write(product);
    promptMngr();
    }
    );
   }