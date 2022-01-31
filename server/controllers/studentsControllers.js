const mysql = require("mysql");

const con = mysql.createPool({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "",
    connectionLimit: 10, //Mysql Connection Pool Length
    database: "node_crud"
});

exports.view = (req, res) => {
    con.getConnection((err, connection) => {
        if (err) throw err
        connection.query("select * from users", (err, rows) => {
            connection.release();
            if (!err) {
                res.render("home", { rows });
            }
            else {
                console.log("Error in Listing Data" + err);
            }
        });
    });
};

exports.adduser = (req, res) => {
    res.render("adduser");
};

exports.save = (req, res) => {
    con.getConnection((err, connection) => {
        if (err) throw err
        //Get Submitted Form Values
        const { name, age, city } = req.body;
        connection.query("insert into users(name,age,city) values(?,?,?)", [name, age, city], (err, rows) => {
            connection.release();
            if (!err) {
                res.render("adduser", { msg: "User Details Added Successfully..." });
            }
            else {
                console.log("Error in Listing Data" + err);
            }
        });
    });
};

exports.edituser = (req, res) => {
    con.getConnection((err, connection) => {
        if (err) throw err
        //Get id from URL
        let id = req.params.id;
        connection.query("select * from users where id=?", [id], (err, rows) => {
            connection.release();
            if (!err) {
                res.render("edituser", { rows });
            }
            else {
                console.log("Error in Listing Data" + err);
            }
        });
    });
};

exports.update = (req, res) => {
    con.getConnection((err, connection) => {
        if (err) throw err
        //Get id from URL
        let id = req.params.id;
        //Get Submitted Form Values
        const { name, age, city } = req.body;

        //Update Student Details
        connection.query("update users set name=?,age=?,city=? where id=?", [name, age, city, id], (err, rows) => {
            connection.release();
            if (!err) {

                //Get User Details After Update
                con.getConnection((err, connection) => {
                    if (err) throw err
                    //Get id from URL
                    let id = req.params.id;
                    connection.query("select * from users where id=?", [id], (err, rows) => {
                        connection.release();
                        if (!err) {
                            res.render("edituser", { rows, msg: "User Details Updated Successfully..." });
                        }
                        else {
                            console.log("Error in Listing Data" + err);
                        }
                    });
                });
            }
            else {
                console.log("Error in Listing Data" + err);
            }
        });
    });
};

exports.delete = (req, res) => {
    con.getConnection((err, connection) => {
        if (err) throw err

        //Get ID from URL
        let id = req.params.id;

        connection.query("delete from users where id=?", [id],
            (err, rows) => {
                connection.release(); //Close Connection 
                if (!err) {
                    res.redirect("/");
                }
                else {
                    console.log(err);
                }
            });
    });
};