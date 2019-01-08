DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
	item_id INTEGER (10) AUTO_INCREMENT NOT NULL,
	product_name VARCHAR (250) NOT NULL,
	department_name VARCHAR (250),
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INTEGER (10) NOT NULL,
	product_sales DECIMAL (10,2) DEFAULT 0.00,
	PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Polo Ralph laurent hoodie", "Clothes", "89.00", "20", "0.00"),
	   ("Keurig Coffee Machine", "Electronics", "100.00", "89", "0.00"),
	   ("Fifa 18 Ps4 Game", "Games", "45.00", "25", "0.00"),
	   ("Cheez-it Crackers Box", "Groceries", "3.99", "75", "0.00"),
	   ("Polo Ralph Laurent T-Shirt", "Clothes", "70.00", "14", "0.00"),
	   ("Starbucks K-Cups", "Groceries", "7.50", "111", "0.00"),
	   ("Red Dead Redemption 2 Ps4 Game", "Games", "47.99", "26", "0.00"),
	   ("Ps4 Controller", "Electronics", "55.00", "19", "0.00"),
	   ("Yeezy Boost 350 Adidas Shoes", "Clothes", "170.00", "14", "0.00"),
	   ("We Happy Few Ps4 Game", "Games", "35.00", "25", "0.00");

CREATE TABLE departments (
	department_id INTEGER (10) AUTO_INCREMENT NOT NULL,
	department_name VARCHAR (250) NOT NULL,
	over_head_costs DECIMAL (10,2) NOT NULL,
	total_sales DECIMAL (10,2),
	PRIMARY KEY (department_id)
);

INSERT INTO departments (department_name, over_head_costs, total_sales)
VALUES ("Clothes", "100.50", "0.00"),
	   ("Electronics", "75.00", "0.00"),
	   ("Games", "50.00", "0.00"),
	   ("Groceries", "10.00", "0.00");
	  