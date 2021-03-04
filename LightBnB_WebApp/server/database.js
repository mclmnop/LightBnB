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
/* const getAllReservations = function(guest_id, limit = 10) {
  return getAllProperties(null, 2);
} */
const getAllReservations = function(guest_id, limit) {
  console.log('Our guest ', guest_id)
  return pool.query(`
  SELECT  properties.*, reservations.*, avg(property_reviews.rating) as average_rating
  FROM reservations
  JOIN users ON reservations.guest_id = users.id
  JOIN properties ON reservations.property_id = properties.id
  JOIN property_reviews ON reservations.property_id = property_reviews.property_id
  WHERE reservations.guest_id = $1
  GROUP BY reservations.id, properties.id
  ORDER BY reservations.start_date DESC
  LIMIT $2
    `, [guest_id, limit]
  )  
  .then(res => {
    return res.rows;
  })
  .catch(err => console.error('query error', err.stack));;
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
} */
const getAllProperties = function(options, limit =10) {
  console.log('Optiones received', options)
  // 1
  const queryParams = [];
  // 2
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  WHERE TRUE
  `;

  // 3
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `AND city LIKE $${queryParams.length}`;
  } 
  if (options.minimum_price_per_night){
    queryParams.push(Number(options.minimum_price_per_night));
    queryString += `AND cost_per_night/100 > $${queryParams.length} `;

  }
  if (options.maximum_price_per_night){
    queryParams.push(Number(options.maximum_price_per_night));
    queryString += `AND cost_per_night/100 < $${queryParams.length} `;

  }
  if (options.minimum_rating){
    queryParams.push(Number(options.minimum_rating));
    queryString += `AND property_reviews.rating >=  $${queryParams.length} `;

  }

  if (options.owner_id) {
    queryParams.push(Number(options.owner_id));
    queryString += `AND owner_id = $${queryParams.length} `;
  }

  
  // 4
  queryParams.push(limit);
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  // 5
  console.log(queryString, queryParams);

  // 6
  return pool.query(queryString, queryParams)
  .then(res => res.rows)
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

















/* SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
WHERE city like ('%ancouv%')
AND owner_id = 743
  GROUP BY properties.id
  ORDER BY cost_per_night; */
