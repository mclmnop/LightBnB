SELECT city, COUNT(reservations) as total_reservations
FROM properties
JOIN reservations ON properties.id = reservations.property_id
GROUP BY city
ORDER by COUNT(reservations) DESC;

