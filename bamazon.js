var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  // Your port; if not 3306
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "Ambarqui5!",
  database: "bamazon"
})

//call back 
connection.connect(function (err) {
  if (err) throw err;
  console.log("*******************");
  console.log("WELCOME TO BAMAZON!");
  console.log("*******************");
  makeTable();
})
var makeTable = function () {
  connection.query("SELECT * FROM products", function (err, res) {
    for (var i = 0; i < res.lenght; i++) {
      console.log(res[i].itemid + " || " + res[i].productname + " || " + res[i].departmentname + " || " + res[i].price + " || " + res[i].stockquantity + "/n");
    }
    promptCustomer(res);
  })
}

var promptCustomer = function (res) {
  inquirer.prompt([{
    type: 'input',
    name: 'choice',
    message: "Which product do you want to purchase? [Quit with Q]"
  }]).then(function (answer) {
    var correct = false;
    if (answer.choice.toUpperCase() == "Q") {
      process.exit();
    }
    for (var i = 0; i < res.lenght; i++) {
      if (res[i].productname == answer.choice) {
        correct = true;
        var product = answer.choice;
        var id = i;
        inquirer.prompt({
          type: "input",
          name: "quant",
          message: "How many items would you like to buy?",
          validate: function (value) {
            if (isNaN(value) == false) {
              return true;
            } else {
              return false;
            }
          }
        }).then(function (answer) {
          if ((res[id].stockquantity - answer.quant) > 0) {
            connection.query("UPDATE products SET stockquantity='" + (res[id].stockquantity - answer.quant) + "' WHERE productname='" + product + "'", function (err, res2) {
              console.log("Product Bought!");
              makeTable();
            })
          } else {
            console.log("Not a valid selection!");
            promptCustomer(res);
          }
        })
      }
    }
    if (i == res.lenght && correct == false) {
      console.log("Not a valid selection!");
      promptCustomer(res);
    }
    
  })}
    
