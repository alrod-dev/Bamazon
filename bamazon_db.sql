DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;


CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10, 2) NULL,
  stock_quantity INTEGER(255) NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Kit Kat", "Candy", 2.99, 5000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Rickenbacker F500 Bass", "Musical Instruments", 2199.99 , 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Nintendo Switch", "Video Games", 299.99, 12);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("PlayStation 4 Pro 1TB Console", "Video Games", 399.99, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Xbox One 1TB Console - Tom Clancy's The Division Bundle", "Video Games", 349.99, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hershey's Nuggets", "Candy", 10.99, 1000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Rickenbacker 325C64 Guitar", "Musical Instruments", 3599.99, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Fender Standard Stratocaster", "Musical Instruments", 599.99, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Paranoid (Remastered Edition) - Black Sabbath", "CDs", 7.99, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Light Up Gold - Parquet Courts", "CDs", 12.99, 100);


SELECT * FROM products;
