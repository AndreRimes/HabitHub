package main

import (
	"database/sql"
	"fmt"
	"habithub/api"
	"habithub/util"
	"log"

	_ "github.com/lib/pq"
)



func main() {
    config, err := util.LoadConfig(".")

    if err != nil {
        log.Fatal("ERROR GETTING ENV")
        return
    }

    conn, err := sql.Open(config.DB_DRIVER, config.DB_SOURCE)

    if err != nil {
        fmt.Println("ERROR AAAAAAAAAAAAAAAAAAAAAAAAAAA")
        log.Fatal("Error Connecting to the Database", err)
        return
    }

    server := api.NewServer(conn)


    err = server.Start("0.0.0.0:8080")
    
    if err != nil {
        fmt.Println("ERROR AAAAAAAAAAAAAAAAAAAAAAAAAAA")
		log.Fatal("Error Starting the server", err)
        return
	}
}
