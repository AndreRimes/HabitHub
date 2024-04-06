// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.26.0
// source: habit.sql

package db

import (
	"context"
)

const completeDay = `-- name: CompleteDay :one
INSERT INTO day_completed (
    habit_id, date 
) VALUES (
  $1, $2
)
RETURNING id, habit_id, date, created_at, updated_at
`

type CompleteDayParams struct {
	HabitID int64  `json:"habit_id"`
	Date    string `json:"date"`
}

func (q *Queries) CompleteDay(ctx context.Context, arg CompleteDayParams) (DayCompleted, error) {
	row := q.db.QueryRowContext(ctx, completeDay, arg.HabitID, arg.Date)
	var i DayCompleted
	err := row.Scan(
		&i.ID,
		&i.HabitID,
		&i.Date,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}

const createHabit = `-- name: CreateHabit :one
INSERT INTO habit (
    title, week_days, user_id  
) VALUES (
  $1, $2, $3
)
RETURNING id, title, streak, week_days, user_id, created_at, updated_at
`

type CreateHabitParams struct {
	Title    string `json:"title"`
	WeekDays string `json:"week_days"`
	UserID   int64  `json:"user_id"`
}

func (q *Queries) CreateHabit(ctx context.Context, arg CreateHabitParams) (Habit, error) {
	row := q.db.QueryRowContext(ctx, createHabit, arg.Title, arg.WeekDays, arg.UserID)
	var i Habit
	err := row.Scan(
		&i.ID,
		&i.Title,
		&i.Streak,
		&i.WeekDays,
		&i.UserID,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}

const deleteCompletedDay = `-- name: DeleteCompletedDay :one
DELETE FROM day_completed
WHERE habit_id = $1
AND date = $2
RETURNING id, habit_id, date, created_at, updated_at
`

type DeleteCompletedDayParams struct {
	HabitID int64  `json:"habit_id"`
	Date    string `json:"date"`
}

func (q *Queries) DeleteCompletedDay(ctx context.Context, arg DeleteCompletedDayParams) (DayCompleted, error) {
	row := q.db.QueryRowContext(ctx, deleteCompletedDay, arg.HabitID, arg.Date)
	var i DayCompleted
	err := row.Scan(
		&i.ID,
		&i.HabitID,
		&i.Date,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}

const getHabit = `-- name: GetHabit :one
SELECT id, title, streak, week_days, user_id, created_at, updated_at FROM habit
WHERE id = $1 LIMIT 1
`

func (q *Queries) GetHabit(ctx context.Context, id int64) (Habit, error) {
	row := q.db.QueryRowContext(ctx, getHabit, id)
	var i Habit
	err := row.Scan(
		&i.ID,
		&i.Title,
		&i.Streak,
		&i.WeekDays,
		&i.UserID,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}

const listCompletedDays = `-- name: ListCompletedDays :many
SELECT id, habit_id, date, created_at, updated_at FROM day_completed
WHERE habit_id = $1
`

func (q *Queries) ListCompletedDays(ctx context.Context, habitID int64) ([]DayCompleted, error) {
	rows, err := q.db.QueryContext(ctx, listCompletedDays, habitID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	items := []DayCompleted{}
	for rows.Next() {
		var i DayCompleted
		if err := rows.Scan(
			&i.ID,
			&i.HabitID,
			&i.Date,
			&i.CreatedAt,
			&i.UpdatedAt,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const listHabits = `-- name: ListHabits :many
SELECT id, title, streak, week_days, user_id, created_at, updated_at FROM habit
WHERE user_id = $1
`

func (q *Queries) ListHabits(ctx context.Context, userID int64) ([]Habit, error) {
	rows, err := q.db.QueryContext(ctx, listHabits, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	items := []Habit{}
	for rows.Next() {
		var i Habit
		if err := rows.Scan(
			&i.ID,
			&i.Title,
			&i.Streak,
			&i.WeekDays,
			&i.UserID,
			&i.CreatedAt,
			&i.UpdatedAt,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}