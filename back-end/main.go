package main

import (
	"database/sql"
	"habithub/api"
    "log"

    _ "github.com/lib/pq"
)


const (
    DB_DRIVER = "postgres"
    DB_SOURCE = "postgresql://root:secret@localhost:5433/HabitHub?sslmode=disable"
)

func main() {

    conn, err := sql.Open(DB_DRIVER, DB_SOURCE)

    if err != nil {
        log.Fatal("Error Connecting to the Database", err)
    }

    server := api.NewServer(conn)


    err = server.Start("0.0.0.0:8080")
    
    if err != nil {
		log.Fatal("Error Starting the server", err)
	}
}
