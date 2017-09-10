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

        displayProducts();

    });
}

function displayProducts() {


    setTimeout(function () {


        inquirer.prompt([
            {
                name: "options",
                message: "Press 1: View Products for Sale" +
                "\nPress 2: View Low Inventory" +
                "\nPress 3: Add to Inventory"
            }

        ]).then(function (respond, error) {

            if (error) throw error;


            switch (respond.options) {

                case "1":
                    console.table("All Products:\n", products);

                    restart();

                    break;

                case "2":

                    for (var i = 0; i < products.length; i++) {

                        if (parseInt(products[i].stock_quantity) < 5) {
                            console.table(products[i]);
                        }

                    }

                    restart();

                    break;

                case "3":

                    console.table("All Products:\n", products);

                    inquirer.prompt([
                        {
                            name: "id_number",
                            message: "Which product (by # id) would you like to pick: "
                        }, {
                            name: "quantity",
                            message: "How much would you like to restock: "
                        }

                    ]).then(function (respond, error) {

                        if (error) throw error;

                        id_number = respond.id_number - 1;

                        quantity = parseInt(respond.quantity);

                        console.log("You said you wanted " + quantity + " units of " + products[id_number].product_name);

                        products[id_number].stock_quantity = products[id_number].stock_quantity + quantity;

                        var remaining = products[id_number].stock_quantity + quantity;

                        var id = id_number + 1;

                        connection.query("UPDATE products\n" +
                            "SET stock_quantity = " + remaining + "\n" +
                            "WHERE item_id = " + id + ";");


                        console.table("Products Have Been Updated and Restocked!\n", products);

                        restart();


                    });

                    break;


                default:
                    console.log("Please Select Again!");

                    displayProducts();

                    break;


            }

        });

    }, 200);


}


function restart() {

    inquirer.prompt([
        {
            name: "confirm",
            type: "confirm",
            message: "Would you like to do something else?"
        }

    ]).then(function (respond, error) {
        if (error) throw error;

        if (respond.confirm === true) {

            displayProducts();

        }
    });

}


