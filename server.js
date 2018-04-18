// Express Setup
const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));

// Knex Setup
const env = process.env.NODE_ENV || 'development';
const config = require('./knexfile')[env];
const knex = require('knex')(config);

// bcrypt setup
let bcrypt = require('bcrypt');
const saltRounds = 10;


//login
app.post('/api/login', (req, res) => {
  if (!req.body.email || !req.body.password)
    return res.status(400).send();
  knex('users').where('email',req.body.email).first().then(user => {
    if (user === undefined) {
      res.status(403).send("Invalid credentials");
      throw new Error('abort');
    }
    return [bcrypt.compare(req.body.password, user.hash),user];
  }).spread((result,user) => {
    if (result)
      res.status(200).json({user:{username:user.username,name:user.name,id:user.id}});
    else
      res.status(403).send("Invalid credentials");
    return;
  }).catch(error => {
    if (error.message !== 'abort') {
      console.log(error);
      res.status(500).json({ error });
    }
  });
});


//register
app.post('/api/users', (req, res) => {
  if (!req.body.email || !req.body.password || !req.body.username || !req.body.name)
    return res.status(400).send();
  knex('users').where('email',req.body.email).first().then(user => {
    if (user !== undefined) {
      res.status(403).send("Email address already exists");
      throw new Error('abort');
    }
    return knex('users').where('username',req.body.username).first();
  }).then(user => {
    if (user !== undefined) {
      res.status(409).send("User name already exists");
      throw new Error('abort');
    }
    return bcrypt.hash(req.body.password, saltRounds);
  }).then(hash => {
    return knex('users').insert({email: req.body.email, hash: hash, username:req.body.username,
				 name:req.body.name, role: 'user'});
  }).then(ids => {
     return knex('outlines').insert({user_id: ids[0], genre: '', setting: '', main_character_name: '',
                 main_character_description: '', main_conflict: '', theme: '', beginning: '',middle: '', ending: ''});
 }).then(ids => {
     return knex('users').where('id',ids[0]).first().select('username','name','id');
 }).then(user => {
    res.status(200).json({user:user});
    return;
  }).catch(error => {
    if (error.message !== 'abort') {
      console.log(error);
      res.status(500).json({ error });
    }
  });
});


//Get Genre
app.get('/api/users/:id/genre', (req, res)=> {
    let id = parseInt(req.params.id);
    knex('outlines').where('user_id',id).first().then(outline => {
        if (outline === undefined) {
            res.status(404).json({error: "For some reason there isn't a row in the outline table for this user"});
            return;
        }
        res.status(200).json({outline:outline});
    }).catch(error => {
        res.status(500).json({ error });
    });
});

//Enter genre
app.post('/api/users/:id/genre', (req, res) => {
  let id = parseInt(req.params.id);
  knex('outlines').where('user_id',id).update({genre: req.body.genre}).then(ids => {
    return knex('outlines').where('user_id',id).first();
  }).then(outline => {
    if (outline === undefined) {
        res.status(404).json({error: "For some reason there isn't a row in the outline table for this user"});
        return;
    }
    res.status(200).json({outline:outline});
    return;
  }).catch(error => {
    console.log(error);
    res.status(500).json({ error });
  });
});


//

app.listen(3000, () => console.log('Server listening on port 3000!'));
