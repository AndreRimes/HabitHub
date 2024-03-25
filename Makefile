DB_URL=postgresql://root:secret@localhost:5433/HabitHub?sslmode=disable

network:
	docker network create habithub-network

postgres:
	docker run --name postgres -p 5433:5432 -e POSTGRES_PASSWORD=secret -e POSTGRES_USER=root -d postgres:14-alpine

createdb:
	docker exec -it postgres createdb --username=root --owner=root HabitHub

dropdb:
	docker exec -it postgres dropdb HabitHub

migrateup:
	migrate -path back-end/db/migration/ -database "$(DB_URL)" -verbose up

migratedown:
	migrate -path db/migration -database "$(DB_URL)" -verbose down

sqlc:
	sqlc generate
server:
	go run ./back-end/main.go

.PHONNY: network postgres createdb dropdb migrateup migratedown sqlc server
