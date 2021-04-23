"use strict";

var Customer = function(name, city, state, email) {
    this.name = name;
    this.city = city;
    this.state = state;
    this.email = email;
};

// Make sure name field isn't empty
Customer.prototype.isNameValid = function() {
    if (this.name == "") {
        return false;
    } else {
        return true;
    }
}
;

// Make sure city field isn't empty
Customer.prototype.isCityValid = function() {
    if (this.city == "") {
        return false;
    } else {
        return true;
    }
}
;

var states = ["NE", "IA", "MN", "WI", "MI", "IL", "IN", "OH", "PA", "MD", "NJ"];

// Make sure state is in states array
Customer.prototype.isStateValid = function() {
    if (!states.includes(this.state)) {
        return false;
    } else {
        return true;
    }
}
;

var emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\b/;

// Make sure email is valid
Customer.prototype.isEmailValid = function() {
    if (!emailPattern.test(this.email)) {
        return false;
    } else {
        return true;
    }
}
;

var customerList = {
    customers: [],
    emails: [],
    add: function(cust) {
        this.customers.push(cust);
        this.emails.push(cust.email);
    },
    toList: function(cust) {
        // print list of info
        $("#list").empty();
        for (let i in this.customers) {
            $("#list").append("<li>" + this.customers[i].email + "</li><ul><li>" + this.customers[i].name + "</li><li>" + this.customers[i].city + ", " + this.customers[i].state + "</li></ul>");
        }
    }
};

var addCustomer = function(cust) {

    var isValid = true;

    if (!cust.isNameValid()) {
        $("#name").next().text("Name must not be blank.");
        isValid = false;
    } else {
        $("#name").next().text("");
    }
    if (!cust.isCityValid()) {
        $("#city").next().text("City must not be blank.");
        isValid = false;
    } else {
        $("#city").next().text("");
    }
    if (!cust.isStateValid()) {
        $("#state").next().text("State must be a Big 10 state.");
        isValid = false;
    } else {
        $("#state").next().text("");
    }
    if (!cust.isEmailValid()) {
        $("#email").next().text("Must be a valid email address.");
        isValid = false;
    } else {
        $("#email").next().text("");
    }
    var email = $("#email").val();
    // Check if email is already in emails array
    if (customerList.emails.includes(email)) {
        $("#email").next().text("This email adress is already taken.");
        isValid = false;
    }
    if (isValid) {
        // If valid, then add the data to customer list and display the list to the user
        customerList.add(cust);
        customerList.toList(cust);
        // Reset all fields
        $("#name").val("");
        $("#city").val("");
        $("#state").val("NE");
        $("#email").val("");
    }

};

$(document).ready(function() {
    $("#add").click(function() {
        var name = $("#name").val();
        var city = $("#city").val();
        var state = $("#state").val();
        var email = $("#email").val();
        var cust = new Customer(name,city,state,email);
        addCustomer(cust);
    });
});
