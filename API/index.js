// Use libraries
const express = require('express');
const cors = require('cors');
const multer = require('multer');


const app = express();
const port = 3000;

app.use(express.json())
app.use(cors());

// Import modules
const MySQL = require('./conection')
const security = require("./security.js")

app.get("/user/:id", (order, response) => {   

  MySQL.conection.query(`SELECT * FROM publisher WHERE id_user = ${order.params.id}`, function(error, results) {
    
    if (error) throw error
    response.send(results);
      
  });
})

// Enter with the user
app.post("/user/logIn", (order, response) => {   

  MySQL.conection.query(`SELECT * FROM publisher WHERE (email = '${order.body.email}' AND password = '${order.body.password}')`, function(error, results) {
 
      if (error) throw error

      if(results.length === 0)
        response.send(undefined);
      else
      {
        let userArray = [security.createToken(results[0]['id'], order.body.user), `${results[0].id_user}`]

        response.send(userArray);
      }
  });
})

// return the token expiration
app.post("/tokenExpiration", (order, response) => { 
  response.send(security.expiredToken(order.body.token))
})

// upload img

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../src/img/articles');
  },
  filename: function (req, file, cb) {
    let fileName = Date.now() + '-' + file.originalname
    cb(null, fileName);
  }
});
const upload = multer({ storage: storage});

app.post('/uploadImg', upload.single('file'), (order, response) => {

  app.locals.frontPage = order.file.filename

});

// route for publish
app.post("/publish", security.validateToken, (order, response) => {

  MySQL.conection.query(`INSERT INTO article (title, description, front_page, body, category, publisher, time, day, month, year) VALUES ("${order.body.title}", "${order.body.description}", "${app.locals.frontPage}", '${order.body.text}', "${order.body.category}", ${order.body.publisher}, "${order.body.time}", ${order.body.day}, ${order.body.month}, ${order.body.year})`, (error, results) => {
    if (error) throw error
    response.send("Publicado exitosamente")
  });
})

// get all article
app.post("/article/", (order, response) => {   

  MySQL.conection.query(`SELECT * FROM article ORDER BY id_article DESC LIMIT ${order.body.quantity}`, function(error, results) {
    if (error) throw error
    response.send(results);
  });
})

// get article by id
app.get("/article/:id", (order, response) => {   

  MySQL.conection.query(`SELECT * FROM article WHERE id_article = ${order.params.id}`, function(error, results) {
    if (error) throw error
    response.send(results);
  });
})

// get general article
app.post("/general", (order, response) => {   

  MySQL.conection.query(`SELECT * FROM article WHERE category = "general" ORDER BY id_article DESC LIMIT ${order.body.quantity}`, function(error, results) {
    if (error) throw error
    response.send(results);
  });
})

// get technology article
app.post("/technology", (order, response) => {   

  MySQL.conection.query(`SELECT * FROM article WHERE category = "tegnologia" ORDER BY id_article DESC LIMIT ${order.body.quantity}`, function(error, results) {
    if (error) throw error
    response.send(results);
  });
})

// get sport article
app.post("/sport", (order, response) => {   

  MySQL.conection.query(`SELECT * FROM article WHERE category = "deporte" ORDER BY id_article DESC LIMIT ${order.body.quantity}`, function(error, results) {
    if (error) throw error
    response.send(results);
  });
})

// get entertainment article
app.post("/entertainment", (order, response) => {   

  MySQL.conection.query(`SELECT * FROM article WHERE category = "entretenimiento" ORDER BY id_article DESC LIMIT ${order.body.quantity}`, function(error, results) {
    if (error) throw error
    response.send(results); 
  });
})

// Delete a article 
app.delete("/deleteArticle/:id", security.validateToken, (order, response) => {   

  MySQL.conection.query(`DELETE FROM article WHERE id_article = ${order.params.id}`, function(error, results) {
    if (error) throw error
    response.send("Articulo elimininado exitosamente");
  });
})

// Search articles
app.post("/search/:search", (order, response) => {   

  MySQL.conection.query(`SELECT * FROM article WHERE title LIKE "%${order.params.search}%" ORDER BY id_article DESC LIMIT ${order.body.quantity}`, function(error, results) {
    if (error) throw error

    response.send(results);

  });
})

// Listen in the specific port 
app.listen(port, () => {
    console.log(`Servidor Node.js escuchando en http://localhost:${port}/`);
  });

