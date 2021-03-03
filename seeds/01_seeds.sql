INSERT INTO users (id, name, email, password)
VALUES (1, 'Marianne Charlebois', 'mcharlebois@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
(2, 'Jo Huang', 'huang@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
(3, 'Jessica Simpson', 'js@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
(4, 'Matt Duff', 'mathieu@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (id, owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES (1, 4, 'small room', 'description', 'https://bit.ly/3sNl1Qo', 'https://bit.ly/2PlhU3x', 99, 1, 1, 1, 'USA', 'roosevelt','Fargo', 'Texas', '90210', true),
(2, 1, 'big room', 'description', 'https://bit.ly/3baNaLg', 'https://flh.ca/media/73238/2016_space-highres-22.jpg?width=848&maxwidth=848', 199, 1, 1, 1, 'Russia', 'street', 'Moscow', 'Oblast', '9DFSFf', true),
(3, 2, 'small apartment', 'description', 'https://bit.ly/3kOLwlB', 'https://bit.ly/3bf7pXW', 499, 1, 1, 2, 'CANADA', 'Rachel', 'Montreal', 'Quebec', 'Z9944X', false),
(4, 3, 'big bungalow', 'description', 'https://bit.ly/3rfQjz1', 'https://bit.ly/3bVmLjO', 899, 2, 5, 3, 'Canada', 'viau', 'Montreal', 'Quebec', 'H$e3T4', true);

INSERT INTO reservations (id, start_date, end_date, property_id, guest_id)
VALUES (1, '2021-03-01', '2021-03-03', 1, 4),
 (2, '2021-03-17', '2021-03-18', 3, 4),
 (3, '2021-04-03', '2021-04-04', 2, 3),
(4, '2021-03-20', '2021-03-27', 4, 2);

INSERT INTO property_reviews (id, guest_id, property_id, reservation_id, rating, message)
VALUES (1, 1, 1, 1, 4, 'amazing'),
(2, 2, 2, 2, 5, 'awful'),
(3, 3, 3, 3, 4, 'Thank you'),
(4, 4, 4, 4, 5, 'Nice stay');

