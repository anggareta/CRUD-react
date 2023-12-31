const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');

const db = mysql.createPool({
  host: 'localhost',
  user: "root",
  password: '',
  database: 'CRUDDataBase'
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  //const sqlInsert = "insert into movie_reviews (movie_name, movie_review) values ('kita','seru');";
  //db.query(sqlInsert, (err, result) => {
  res.send('halo ayus');
  //});
});

app.get('/api/get', (req, res) => {
  const sqlSelect = "select * from movie_reviews;";
  db.query(sqlSelect, (err, result) => {
    //console.log(result);
    res.send(result);
  });
});

app.post('/api/insert', (req, res) => {
  const movieName = req.body.movieName;
  const movieReview = req.body.movieReview;
  const sqlInsert = "insert into movie_reviews (movie_name, movie_review) values (?,?);";
  db.query(sqlInsert, [movieName, movieReview], (err, result) => {
    console.log(err);
  });
});

app.delete('/api/delete/:movieName', (req, res) => {
  const name = req.params.movieName;
  const sqlDelete = "delete from movie_reviews where movie_name=?;";
  db.query(sqlDelete, name, (err, result) => {
    if (err) {
      console.log(err);
    }
  });
});

app.put('/api/update', (req, res) => {
  const name = req.body.movieName;
  const review = req.body.movieReview;
  const sqlUpdate = "update movie_reviews set movie_review=? where movie_name=?;";
  db.query(sqlUpdate, [review, name], (err, result) => {
    if (err) {
      console.log(err);
    }
  });
});

app.listen(3001, () => {
  console.log("running on port 3001");
});