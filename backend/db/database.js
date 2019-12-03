const { Client } = require("pg");
const { db } = require('../config.json');

const client = new Client({
  user: db.user,
  host: db.host,
  port: db.port,
  database: db.database,
  password: db.password
});

client.connect();

/*********************************************************************************
******                                EVENTS                                ******
*********************************************************************************/
exports.listEvents = () => {
  return client.query(`SELECT * FROM events;`)
    .then( res => { return res.rows });
}
exports.searchEvent = (id) => {
  return client.query(`SELECT * FROM events WHERE id = $1;`, [parseInt(id)])
    .then( res => { return res.rows[0] });
}
exports.createEvent = (event) => {
  return client.query(`INSERT INTO events (name, date, cover) VALUES ($1, $2, $3) RETURNING *;`, [event.name, event.date, event.cover])
    .then( res => { return res.rows[0] });
}
exports.updateEvent = (id, event) => {
  return client.query(`UPDATE events SET name = $2, date = $3, cover = $4 WHERE id = $1 RETURNING *;`, [parseInt(id), event.name, event.date, event.cover])
    .then( res => { return res.rows[0] });
}
exports.deleteEvent = (id) => {
  return client.query(`DELETE FROM events WHERE id = $1 RETURNING *;`, [parseInt(id)])
    .then( res => { return res.rows[0] });
}

/*********************************************************************************
******                              GALLERIES                               ******
*********************************************************************************/
exports.listGalleries = () => {
  return client.query(`SELECT * FROM galleries;`)
    .then( res => { return res.rows });
}
exports.searchGallery = (id) => {
  return client.query(`SELECT * FROM galleries WHERE id = $1;`, [parseInt(id)])
    .then( res => { return res.rows[0] });
}
exports.createGallery = (gallery) => {
  return client.query(`INSERT INTO galleries (name, cover) VALUES ($1, $2) RETURNING *;`, [gallery.name, gallery.cover])
    .then( res => { return res.rows[0] });
}
exports.updateGallery = (id, gallery) => {
  return client.query(`UPDATE galleries SET name = $2, cover = $3 WHERE id = $1 RETURNING *;`, [parseInt(id), gallery.name, gallery.cover])
    .then( res => { return res.rows[0] });
}
exports.deleteGallery = (id) => {
  return client.query(`DELETE FROM galleries WHERE id = $1 RETURNING *;`, [parseInt(id)])
    .then( res => { return res.rows[0] });
}

/*********************************************************************************
******                                USERS                                 ******
*********************************************************************************/
exports.searchUserContact = (id) => {
  return client.query(`SELECT name, email, image, description FROM users WHERE id = $1;`, [parseInt(id)])
    .then( res => { return res.rows[0] });
}
exports.searchUserInfo = (id) => {
  return client.query(`SELECT title, instagram, facebook, info FROM users WHERE id = $1;`, [parseInt(id)])
    .then( res => { return res.rows[0] });
}
exports.searchUserHome = (id) => {
  return client.query(`SELECT title, info FROM users WHERE id = $1;`, [parseInt(id)])
    .then( res => { return res.rows[0] });
}
exports.searchUserLinks = (id) => {
  return client.query(`SELECT instagram, facebook FROM users WHERE id = $1;`, [parseInt(id)])
    .then( res => { return res.rows[0] });
}

/*********************************************************************************
******                                ADMIN                                 ******
*********************************************************************************/
exports.listUsers = () => {
  return client.query(`SELECT id, username, name FROM users;`)
    .then( res => { return res.rows });
}

exports.searchUser = (username) => {
  return client.query(`SELECT password  FROM users WHERE username = $1;`, [username])
    .then( res => { return res.rows[0] });
}
exports.searchUserAccount = (id) => {
  return client.query(`SELECT id, username  FROM users WHERE id = $1;`, [id])
    .then( res => { return res.rows[0] });
}
exports.searchUserPassword = (id) => {
  return client.query(`SELECT password  FROM users WHERE id = $1;`, [id])
    .then( res => { return res.rows[0] });
}

exports.createUser = (user) => {
  return client.query(`INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id;`, [user.username, user.password])
    .then( res => { return res.rows[0] });
}

exports.updateUserAccount = (id, username) => {
  return client.query(`UPDATE users SET username = $2 WHERE id = $1 RETURNING id;`,[parseInt(id), username])
    .then( res => { return res.rows[0] });
}
exports.updateUserPassword = (id, password) => {
  return client.query(`UPDATE users SET password = $2 WHERE id = $1 RETURNING id;`,[parseInt(id), password])
    .then( res => { return res.rows[0] });
}
exports.updateUserContact = (id, user) => {
  return client.query(`UPDATE users
                        SET name = $2, email = $3, image = $4, description = $5
                        WHERE id = $1
                        RETURNING id, name, email, image, description;`,
                        [parseInt(id), user.name, user.email, user.image, user.description])
    .then( res => { return res.rows[0] });
}
exports.updateUserInfo = (id, user) => {
  return client.query(`UPDATE users
                        SET title = $2, instagram = $3, facebook = $4, info = $5
                        WHERE id = $1
                        RETURNING id, title, instagram, facebook, info;`,
                        [parseInt(id), user.title, user.instagram, user.facebook, user.info])
    .then( res => { return res.rows[0] });
}

exports.deleteUser = (id) => {
  return client.query(`DELETE FROM users WHERE id = $1 RETURNING id, image;`, [parseInt(id)])
    .then( res => { return res.rows[0] });
}