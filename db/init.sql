-- Crear esquema
CREATE SCHEMA IF NOT EXISTS shop;
--------------------------------------------------
-- TABLA CATEGORIA
--------------------------------------------------
CREATE TABLE IF NOT EXISTS shop.categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL
);
--------------------------------------------------
-- TABLA PRODUCTOS
--------------------------------------------------
CREATE TABLE IF NOT EXISTS shop.products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price NUMERIC(10, 2) NOT NULL,
  stock INTEGER NOT NULL,
  image BYTEA,
  category_id INTEGER NOT NULL,
  CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES shop.categories(id) ON DELETE RESTRICT
);
--------------------------------------------------
-- DATOS DE EJEMPLO
--------------------------------------------------
-- Insertar categorías
INSERT INTO shop.categories (name)
VALUES ('Ropa'),
  ('Calzado'),
  ('Accesorios');
-- Insertar productos (asociados a categorías)
INSERT INTO shop.products (
    name,
    description,
    price,
    stock,
    image,
    category_id
  )
VALUES (
    'Camiseta',
    'Camiseta básica blanca',
    9.99,
    100,
    NULL,
    1
  ),
  (
    'Pantalón vaquero',
    'Pantalón vaquero azul',
    39.99,
    50,
    NULL,
    1
  ),
  (
    'Zapatillas Deportivas',
    'Zapatillas deportivas',
    59.99,
    30,
    NULL,
    2
  );
--------------------------------------------------
-- ROLES
--------------------------------------------------
-- Rol sin login
CREATE ROLE web_anon;
-- Permisos
GRANT USAGE ON SCHEMA shop TO web_anon;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA shop TO web_anon;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA shop TO web_anon;
-- Usuario con login
CREATE ROLE authenticator WITH LOGIN PASSWORD 'mysecretpassword';
-- Puede asumir el rol
GRANT web_anon TO authenticator;