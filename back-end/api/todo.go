package api

import (
	"errors"
	"habithub/auth"
	db "habithub/db/sqlc"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)




func (server *Server) createTodo(ctx *gin.Context){
    var req db.CreateTodoParams

    if err := ctx.ShouldBindJSON(&req); err != nil {
        ctx.JSON(http.StatusBadRequest, gin.H{"error": err})
        return
    }
    
    todo, err := server.store.Queries.CreateTodo(ctx, req)
    

    if err != nil {
        ctx.JSON(http.StatusInternalServerError, gin.H{"error": err})
        return
    }

    ctx.JSON(http.StatusOK, gin.H{"todo": todo})
}


func (server *Server) toggleTodo(ctx *gin.Context){
    req :=  ctx.Param("id")
    id, err := strconv.Atoi(req)

    if err != nil {
        ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invaid ID"})
        return
    }

    todo, err := server.store.ToggleTodo(ctx, int64(id));

    if err != nil {
        ctx.JSON(http.StatusNotFound, gin.H{"ERROR": "Not found"})
        return
    }


    payload, err := auth.GetPayload(ctx)

    if err != nil {
        ctx.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
        return
    }


    if payload.UserId != todo.UserID {
        ctx.JSON(http.StatusUnauthorized, gin.H{"error": "You cannot Edit Someone else todo"})
        return
    }

    ctx.JSON(http.StatusOK, gin.H{"todo": todo})
}

func (server *Server) deleteTodo(ctx *gin.Context){
    
    
    err := server.store.ExecTX(ctx, func(q *db.Queries) error {
        req :=  ctx.Param("id")
        id, err := strconv.Atoi(req)

        if err != nil {
            return err
        }

        todo, err := q.DeleteTodo(ctx, int64(id))

        if err != nil {
            return err
        }

        payload, err :=  auth.GetPayload(ctx)

        if err != nil{
            return err
        }

        if payload.UserId != todo.UserID{
            return errors.New("You cannot Edit Someone else todo")
        }

        return nil
    })

    if err != nil {
        ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    ctx.JSON(http.StatusOK, gin.H{"message": "Todo deleted sucessfully"})

}


