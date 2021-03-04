const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'marianne',
  host: 'localhost',
  database: 'lightbnb'
});

/* pool.query('SELECT $1::text as message', ['Hello world!'], (err, res) => {
  console.log(err ? err.stack : res.rows[0].message) // Hello World!
  pool.end()
}) */

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */

const getUserWithEmail = function(email) {
  let user;
  return pool.query(`
  SELECT * 
  FROM users
  `
  )  
  .then(res => {
    for (const userId in res.rows) {
      user = res.rows[userId];
      if (user.email.toLowerCase() === email.toLowerCase()) {
        break;
      } else {
        user = null;
      }
    }
    return Promise.resolve(user);
  })
  .catch(err => console.error('query error', err.stack));
}

exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */

const getUserWithId = function(id) {
  let user;
  return pool.query(`
  SELECT * 
  FROM users
  `
  )  
  .then(res => {
    for (const userId in res.rows) {
      user = res.rows[userId];
      if (user.id === id) {
        break;
      } else {
        user = null;
      }
    }
    return Promise.resolve(res.rows[id]);
  })
  .catch(err => console.error('query error', err.stack));
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  newUser = [user.name, user.email, user.password]
  return pool.query(`
  INSERT INTO users (name, email, password) 
  VALUES ($1, $2, $3);
  `, newUser
  )  
  .then(res => {
    return Promise.resolve(user);
  })
  .catch(err => console.error('query error', err.stack));

}
exports.addUser = addUser;


/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  return getAllProperties(null, 2);
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
/* const getAllProperties = function(options, limit = 10) {
  const limitedProperties = {};
  for (let i = 1; i <= limit; i++) {
    limitedProperties[i] = properties[i];
  }
  return Promise.resolve(limitedProperties);
} */
const getAllProperties = function(options, limit = 10) {
  return pool.query(`
    SELECT * 
    FROM properties
    LIMIT $1;
    `, [limit]
  )  
  .then(res => {
    return res.rows;
  })
  .catch(err => console.error('query error', err.stack));
}





exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}
exports.addProperty = addProperty;