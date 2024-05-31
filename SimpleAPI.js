var express = require('express');
var bodyParser = require("body-parser");
var cors = require('cors');
var app = express();
var mysql = require('mysql2'); //npm install mysql
app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
//sample json

var con = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "Minhtan2304",
    insecureAuth : true,
    database: "lab10"
    });

con.connect(function(err) {
if (err) throw err;
console.log("Connected!!!")
var sql = "SELECT * FROM phim   ";
con.query(sql, function(err, results) {
if (err) throw err;
console.log(results);
})
});

app.get('/phim', function (req, res) {
    var sql = "SELECT * FROM phim";
    con.query(sql, function(err, results) {
    if (err) throw err;
    res.send(results);
    });
    })
    
    app.post('/phim', function (req, res) {
        const { id,tieude,phathanh,soluongtap,mieuta,lichchieu } = req.body
        //sample { id: 4, deviceName: 'DHT22' }
        var sql = "INSERT INTO phim (id,tieude,phathanh,soluongtap,mieuta,lichchieu) VALUES ('"+id+"','"+tieude+"','"+phathanh+"','"+soluongtap+"','"+mieuta+"','"+lichchieu+"')";
        con.query(sql, function(err, results) {
        if (err) throw err;
        res.send('Add PHIM ok');
        });
        })
  
        app.delete('/phim/:tieude', function (req, res) {
            const { tieude } = req.params
            var sql = "DELETE FROM phim  WHERE tieude = '"+tieude+"'";
            con.query(sql, function(err, results) {
            if (err) throw err;
            res.send('Delete PHIM ok');
            });
            }
            )
        app.put('/phim/:id', function (req, res) {
            const { id } = req.params
            const { tieude,phathanh,soluongtap,mieuta,lichchieu } = req.body
            var sql = "UPDATE phim SET tieude = '"+tieude+"', phathanh = '"+phathanh+"', soluongtap = '"+soluongtap+"', mieuta = '"+mieuta+"', lichchieu = '"+lichchieu+"' WHERE id = '"+id+"'";
            con.query(sql, function(err, results) {
            if (err) throw err;
            res.send('Update PHIM ok');
            });
            }
            )
    app.get('/phim/:id', function (req, res) {
        const { id } = req.params
        var sql = "SELECT * FROM phim WHERE id = '"+id+"'";
        con.query(sql, function(err, results) {
        if (err) throw err;
        res.send(results);
        });
        }
    )
     
var server = app.listen(2304, function () {
var host = server.address().address
var port = server.address().port
console.log("Server is listening at http://%s:%s", host, port)
})