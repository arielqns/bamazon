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

//commands
function promptMan()
{
    inquirer.prompt([
        {
            type: "list",
            name: "command",
            message: "/Select an option:",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory","Add New Product", "Exit"]
        }
    ]).then(function (choice){
        switch (choice.command) {
            case  "View Products for Sale":
                showItems();
                break;
            case  "View Low Inventory":
                viewLowInv();
                break;
            case  "Add to Inventory":
                addInv();
                break;
            case  "Add New Product":
                addNew();
                break;
            case  "Exit":
                connection.end();
                break;

        };
    });
}
//show items
function showItems() {
    connection.query("SELECT * FROM products", function (err, results) {
        console.log("");
        for (var i = 0; i < results.length; i++) {
            console.log(
                results[i].itemid +
                " | " + results[i].productname +
                " | " + results[i].departmentname +
                " | $" + results[i].price +
                " | " + results[i].stockquantity);
        }
    promptMan();
    });
}
//view low inventory, only < 5 items
function viewLowInv() {
    connection.query("SELECT * FROM products WHERE stockquantity < 5", function (err, results) {
        console.log("");
        for (var i = 0; i < results.length; i++) {
            console.log(
                results[i].itemid +
                " | " + results[i].productname +
                " | " + results[i].stockquantity + " in stock.");
        } 
        promptMan();
    });
}
//add inventory
function addInv() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        inquirer.prompt([
            {
                type: "list",
                name: "item",
                message: "\nSelect the product you want to update.",
        
                choices: function () {
                    var choices = [];
                    for (var i = 0; i < results.length; i++) {
                        choices.push(results[i].itemid + " | " + results[i].productname + " | " + results[i].stockquantity + " in stock.")
                    }
                    return choices;
                }
            }
        ]).then(function (res) {
            connection.query("SELECT * FROM products WHERE itemid=?"), [res.addProduct], function(err, res) {
                if (err) throw err;
                var currentProd = res[0].productname
                var updatedQuant = res[0].stockquantity + parseInt(res.quantityIncrease) 
                connection.query(
                    "UPDATE products SET ? WHERE ?", [{
                        stockquantity: updatedQuant
                    },
                {
                    itemid: res.addProduct
                }
            ],
            function(err, res){
                if (err) throw err;
                console.log(res.quantityIncrease + " unites has been added to " + currentProd);
                promptMan();
            })}
         
            
        });
    });
}

function addNew() {
    connection.query("SELECT * FROM products", function (err, res) {
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

// function addInvUpdateDb(results, quantity, value, splitItemId) {
//     var query = connection.query(
//     "UPDATE products SET ? WHERE ?",
//     [
//     {
//     stockquantity: parseInt(results[quantity].stockquantity) + parseInt(value)
//     },
//     {
//     itemid: splitItemId
//     }
//     ],
//     function (err, res) {
//     var product = " product.\n";
//     if (value > 1) {
//     product = " products.\n";
//     }
//     console.log("");
//     process.stdout.write(results[splitItemId - 1].productname);
//     process.stdout.write(" updated by ");
//     process.stdout.write(value);
//     process.stdout.write(" more");
//     process.stdout.write(product);
//     promptMan();
//     }
//     );
//    }