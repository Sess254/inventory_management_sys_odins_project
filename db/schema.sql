-- CREATE TABLE category (
--   id SERIAL PRIMARY KEY,
--   name VARCHAR(100) NOT NULL UNIQUE
-- );

-- CREATE TABLE product (
--   id SERIAL PRIMARY KEY,
--   name VARCHAR(150) NOT NULL,
--   description TEXT NOT NULL,
--   price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
--   stock INTEGER NOT NULL CHECK (stock >= 0),
--   category_id INTEGER NOT NULL REFERENCES category(id) ON DELETE RESTRICT
-- );


-- INSERT INTO category (name) VALUES ('No Category');

-- INSERT INTO category (name) VALUES
--   ('Headphones'),
--   ('Earbuds'),
--   ('Soundbars'),
--   ('Speakers'),
--   ('Turntables');


  insert into product (name, description, price, stock, category_id) values
  ('WH-1000XM5', 'Industry-leading noise canceling over-ear headphones with 30-hour battery life.', 399.99, 45, 'Headphones'),
  ('WCH720N', 'Lightweight noise canceling headphones with up to 35 hours of battery life.', 149.99, 60, 'Headphones'),
  ('MDR-7506', 'Professional studio monitor headphones with closed-ear design.', 99.99, 30, 'Headphones'),
  ('WF-1000XM5', 'Truly wireless noise canceling earbuds with industry-leading sound quality.', 299.99, 55, 'Earbuds'),
  ('WF-C700N', 'Compact noise canceling truly wireless earbuds.', 119.99, 70, 'Earbuds'),
  ('LinkBuds S', 'Small, lightweight truly wireless earbuds with Adaptive Sound Control.', 199.99, 40, 'Earbuds'),
  ('HT-A7000', '7.1.2ch Dolby Atmos soundbar with 500W output.', 1399.99, 15, 'Soundbars'),
  ('HT-S2000', '3.1ch Dolby Atmos soundbar with built-in subwoofer.', 499.99, 25, 'Soundbars'),
  ('HT-X8500', '2.1ch single soundbar with built-in subwoofer and Dolby Atmos.', 349.99, 20, 'Soundbars'),
  ('SRS-XB100', 'Compact portable Bluetooth speaker with punchy bass.', 59.99, 90, 'Speakers'),
  ('SRS-XG500', 'X-Series portable wireless speaker with powerful bass and lighting.', 349.99, 20, 'Speakers'),
  ('SRS-RA5000', '360 Reality Audio speaker for spatial sound throughout the room.', 399.99, 18, 'Speakers'),
  ('PS-LX310BT', 'Belt-drive turntable with Bluetooth connectivity.', 199.99, 12, 'Turntables'),
  ('PS-HX500', 'Hi-Res USB turntable for vinyl-to-digital recording.', 399.99, 8, 'Turntables')