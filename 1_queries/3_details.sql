/* SELECT  properties.id, title, cost_per_night, owner_id, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active, avg(property_reviews.rating)
FROM properties
JOIN property_reviews ON properties.id = property_reviews.property_id
WHERE city = 'Vancouver'
GROUP BY properties.id
HAVING  avg(property_reviews.rating) >= 4
ORDER BY cost_per_night
LIMIT 10 */

SELECT  properties.*, title, cost_per_night,  avg(property_reviews.rating)
FROM properties
JOIN property_reviews ON properties.id = property_reviews.property_id
WHERE city LIKE '%ancouv%'
GROUP BY properties.id
HAVING  avg(property_reviews.rating) >= 4
ORDER BY cost_per_night
LIMIT 10