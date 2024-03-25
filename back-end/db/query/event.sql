
-- name: CreateEvent :one
INSERT INTO event (
    title, frequency, frequency_extension, begin_time, end_time, user_id
) VALUES (
  $1, $2, $3, $4, $5, $6
)
RETURNING *;


-- name: ListEventByUser :many
SELECT * FROM event
WHERE user_id= $1
ORDER BY begin_time;
