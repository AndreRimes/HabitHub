-- name: CreateTodo :one
INSERT INTO todo (
    title, term, user_id
) VALUES (
  $1, $2, $3
)
RETURNING *;

-- name: GetTodo :one
SELECT * FROM todo
WHERE id = $1;

-- name: ListTodoByUser :many
SELECT * FROM todo
WHERE user_id= $1
ORDER BY created_at;

-- name: ToggleTodo :one
UPDATE todo
SET completed = NOT completed
WHERE id = $1
RETURNING *;

-- name: DeleteTodo :one
DELETE FROM todo
WHERE id = $1
RETURNING *;
