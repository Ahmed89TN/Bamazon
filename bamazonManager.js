//dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

//database connection info
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password:"",
    database: "bamazon_db"
});

//connects to database
connection.connect(function(err) {
    if (err) throw err;
});

//initializes app
initialize();

//FUNCTIONS 

function initialize() {
    inquirer.prompt([{
        name: "action",
        message: "Select an action.",
        type: "list",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
    }]).then(function(answers) {
        
        if (answers.action === "View Products for Sale") {
            viewProd();
        } else if (answers.action === "View Low Inventory") {
            viewLow();
        } else if (answers.action === "Add to Inventory") {
            
            var products = [];
            connection.query("SELECT product_name FROM products", function(err, res) {
                for (h = 0; h < res.length; h++) {
                    products.push(res[h].product_name);
                }
                
                addInv(products);
            });
        } else if (answers.action === "Add New Product") {
            addProd();
        }
    });
}

function viewProd() {
    
    var productTable = new Table({
        head: ["Id", "Product Name", "Price", "Qty.", "Dept."],
        colWidths: [5, 35, 10, 10, 20]
    });
    
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log("ALL PRODUCTS");
        
        for (var i = 0; i < res.length; i++) {
            var prodId = res[i].item_id;
            var prodName = res[i].product_name;
            var price = res[i].price;
            var stock = res[i].stock_quantity;
            var sales = res[i].department_name;
            productTable.push(
                [prodId, prodName, price, stock, sales]
            );
        }
        
        console.log(productTable.toString());
        
        initialize();
    });
}

function viewLow() {
    var lowInvTable = new Table({
        head: ["Id", "Product Name", "Qty."],
        colWidths: [5, 35, 10]
    });
    
    connection.query("SELECT * FROM products WHERE stock_quantity < ?", [5], function(err, res) {
        if (err) throw err;
        
        if (res.length > 0) {
            console.log("***************");
            console.log("\nLOW INVENTORY");
            console.log("***************");
            for (var j = 0; j < res.length; j++) {
                
                var prodId = res[j].item_id;
                var prodName = res[j].product_name;
                var qty = res[j].stock_quantity;
                
                lowInvTable.push(
                    [prodId, prodName, qty]
                );
            }
            
            console.log(lowInvTable.toString());
           
        } else {
            console.log("*************************************");
            console.log("\nThere are no low inventory items!\n");
            console.log("*************************************");
        }
        
        initialize();
    });
}

function addInv(array) {
    
    inquirer.prompt([{
        name: "item",
        message: "Which item would you like to add inventory to?",
        type: "list",
        choices: array
    }, {
        name: "amount",
        message: "How many more units would you like to add?"
    }]).then(function(answers) {
        
        connection.query("SELECT stock_quantity FROM products WHERE product_name = ?", [answers.item], function(err, res) {
            
            var stockQty = parseInt(answers.amount) + parseInt(res[0].stock_quantity);
            
            connection.query("UPDATE products SET ? WHERE ?", [{
                stock_quantity: stockQty
            }, {
                product_name: answers.item
            }], function(err, res) {
                if (err) {
                    throw err;
                } else {
                    console.log("***********************************************************************");
                    console.log("The inventory for " + answers.item + " is now " + stockQty + " units.\n");
                    console.log("***********************************************************************");
                }
                
                initialize();
            });
        });
    });
}

function addProd() {
    connection.query("SELECT department_name FROM departments", function(err, res) {
        var departments = [];
        for (var k = 0; k < res.length; k++) {
            departments.push(res[k].department_name);
        }
        
        inquirer.prompt([{
            name: "product",
            message: "Enter name of product you would like to add."
        }, {
            name: "price",
            message: "Enter price of product to be added."
        }, {
            name: "quantity",
            message: "Enter quantity of product to be added."
        }, {
            name: "department",
            message: "Select the department of product to be added.",
            type: "list",
            choices: departments
        }]).then(function(answers) {
            
            var product = answers.product;
            var price = answers.price;
            var quantity = answers.quantity;
            var department = answers.department;
            
                    connection.query("INSERT INTO products SET ?", {
                        product_name: product,
                        price: price,
                        department_name: department,
                        stock_quantity: quantity,
                        product_sales: 0.00
                    }, function(err, res) {
                        if (err) {
                            throw err;
                        } else {
                            console.log("*****************************");
                            console.log("\nYour item has been added.\n");
                            console.log("*****************************");
                            initialize();
                        }
                    });
                    
        });
    });
}