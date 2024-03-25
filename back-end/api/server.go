package api

import (
	"database/sql"
	db "habithub/db/sqlc"

	"github.com/gin-gonic/gin"
)



type Server struct{
    store *db.Store
    router *gin.Engine
    
}

func NewServer(DB *sql.DB) *Server{
    store := db.NewStore(DB)


    server := &Server{
        store: store,
    }
    router := gin.Default()

    router.Use(CORS())

    authRoutes := router.Group("/").Use(server.AuthMiddleware())

    
    // Get Routes
    authRoutes.GET("/us", server.getUser) 

    //Auth
    //router.GET("/auth/:provider/callback", server.getAuthCallBackFunction)
    router.POST("/login", server.loginUser)
    router.POST("/user", server.createUser)

    // Create Routes
    authRoutes.POST("/event", server.createEvent)
    authRoutes.POST("/todo", server.createTodo)

    // Update Routes
    authRoutes.PATCH("/todo/:id", server.toggleTodo)

    // Delete Routes
    authRoutes.DELETE("todo/:id", server.deleteTodo)


    server.router = router
    return server
}

func (server *Server) Start(adress string) error{
    return server.router.Run(adress)
}


