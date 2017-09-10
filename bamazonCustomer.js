// dependency for inquirer npm package
var inquirer = require("inquirer");

var mysql = require("mysql");

require("console.table");

var id_number, quantity;

var products = [];

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: "root",
    password: "89988998ar",
    database: "bamazon_db"
});


connection.connect(function (error) {
    if (error) throw error;

    console.log("connected as id" + connection.threadId);

    mainPage();

});


function mainPage() {
    connection.query("SELECT * FROM products", function (error, respond) {

        if (error) throw error;

        console.log("Welcome to Bamazon!\n");

        products = respond;

        selectionOfProducts();

    });
}


function selectionOfProducts() {


    console.table("All Products:\n", products);

    setTimeout(function () {


        inquirer.prompt([
            {
                name: "id_number",
                message: "Which product (by # id) would you like to pick: "
            }, {
                name: "quantity",
                message: "How many would you like to buy: "
            }

        ]).then(function (respond, error) {

            if (error) throw error;

            id_number = respond.id_number - 1;

            quantity = parseInt(respond.quantity);

            console.log("You said you wanted " + quantity + " units of " + products[id_number].product_name);

            if (quantity <= products[id_number].stock_quantity) {

                var price = quantity * products[id_number].price;

                inquirer.prompt([
                    {
                        name: "confirm",
                        type: "confirm",
                        message: "This will cost $" + price + "-- Is this ok?"
                    }
                ]).then(function (respond, error) {

                    if (error) throw error;

                    if (respond.confirm === true) {

                        products[id_number].stock_quantity = products[id_number].stock_quantity - quantity;

                        var remaining = products[id_number].stock_quantity - quantity;

                        var id = id_number + 1;

                        connection.query("UPDATE products\n" +
                            "SET stock_quantity = " + remaining + "\n" +
                            "WHERE item_id = " + id + ";");


                        console.table("Products Have Been Updated!\n", products);


                        inquirer.prompt([
                            {
                                name: "confirm",
                                type: "confirm",
                                message: "Would you like to buy a different item?"
                            }
                        ]).then(function (respond, error) {

                            if (error) throw error;

                            if (respond.confirm === true) {

                                selectionOfProducts();

                            }

                        });

                    }
                })
            }
            else {
                console.log("I'm sorry, we don't have enough to fill your order!\n");

                inquirer.prompt([
                    {
                        name: "confirm",
                        type: "confirm",
                        message: "Would you like to buy a different item?"
                    }
                ]).then(function (respond, error) {

                    if (error) throw error;

                    if (respond.confirm === true) {

                        selectionOfProducts();

                    }

                });
            }
        });

    }, 200);

}


