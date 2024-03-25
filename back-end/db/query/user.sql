-- name: CreateUser :one
INSERT INTO "user" (
   email, password
) VALUES (
  $1, $2
)
RETURNING *;


-- name: GetUser :one
SELECT * FROM "user"
WHERE email = $1 LIMIT 1;
