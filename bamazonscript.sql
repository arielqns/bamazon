DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    itemid INT NOT NULL AUTO_INCREMENT,
    productname VARCHAR(50) NOT NULL,
    departmentname VARCHAR(50) NOT NULL,
    price DECIMAL(10.4) NOT NULL,
    stockquantity INT(10) NOT NULL,
    PRIMARY KEY (itemid)
);
INSERT INTO products (ProductName, DepartmentName, Price, StockQuantity)
VALUES ("Product1","Dep1", "9.99", 1),
	("Product2","Dep2", "9.99", 20),
	("Product3","Dep3", "9.99", 3),
	("Product4","Dep4", "9.99", 40),
	("Product5","Dep5", "9.99", 5),
	("Product6","Dep6", "9.99", 60),
	("Product7","Dep7", "9.99", 7),
	("Product8","Dep8", "9.99", 80),
	("Product9","Dep9", "9.99", 9),
	("Product10","Dep10", "9.99", 100);

SELECT * FROM products;