-- name: CreateHabit :one
INSERT INTO habit (
    title, week_days, user_id  
) VALUES (
  $1, $2, $3
)
RETURNING *;

-- name: GetHabit :one
SELECT * FROM habit
WHERE id = $1 LIMIT 1;

-- name: CompleteDay :one
INSERT INTO day_completed (
    habit_id, date 
) VALUES (
  $1, $2
)
RETURNING *;

-- name: ListHabits :many
SELECT * FROM habit
WHERE user_id = $1;

-- name: ListCompletedDays :many
SELECT * FROM day_completed
WHERE habit_id = $1;

-- name: DeleteCompletedDay :one
DELETE FROM day_completed
WHERE habit_id = $1
AND date = $2
RETURNING *;


