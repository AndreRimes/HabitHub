package api

import (
	db "habithub/db/sqlc"
	"net/http"

	"github.com/gin-gonic/gin"
)



func (server *Server) createEvent(ctx *gin.Context){
    var req db.CreateEventParams

    if err := ctx.ShouldBindJSON(&req); err != nil{
        ctx.JSON(http.StatusBadRequest, gin.H{"error": err})
        return
    }
    
    event,err := server.store.Queries.CreateEvent(ctx,req)

    if err != nil {
        ctx.JSON(http.StatusInternalServerError, gin.H{"error": err})
        return 
    }
    
    ctx.JSON(http.StatusOK, gin.H{"event": event})
}
