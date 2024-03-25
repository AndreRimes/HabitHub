package api

import (
	"database/sql"
	"habithub/auth"
	db "habithub/db/sqlc"
	"habithub/util"
	"time"

	"net/http"

	"github.com/gin-gonic/gin"
)


type createUserResponce struct{ 
	ID        int64          `json:"id"`
	Email     string `json:"email"`
	CreatedAt sql.NullTime   `json:"created_at"`
	UpdatedAt sql.NullTime   `json:"updated_at"`
}

 
func (server *Server) createUser(ctx *gin.Context){
    var req db.CreateUserParams
    
    if err := ctx.ShouldBindJSON(&req); err != nil {
        ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return 
    }   
    
    var err error
    req.Password ,err = util.HashPassword(req.Password)

    if err != nil{
        ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Error hashing your password."})
        return
    }

    user, err := server.store.Queries.CreateUser(ctx, req)

    if err != nil {
        ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Email already in use."})
        return
    }

    res := createUserResponce{
        ID: user.ID,
        Email: user.Email,
        CreatedAt: user.CreatedAt,
        UpdatedAt: user.UpdatedAt,
    }

    ctx.JSON(http.StatusOK, gin.H{"user": res})
}

type LoginUserParams struct{
    Email string `json:"email" binding:"required"`
    Password string `json:"password" binding:"required"`
}

func (server *Server) loginUser(ctx *gin.Context){
    var req LoginUserParams

    if err := ctx.ShouldBindJSON(&req); err != nil {
        ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Information."})
        return 
    }       
    
    user,err := server.store.Queries.GetUser(ctx, req.Email)

    if err != nil{
        ctx.JSON(http.StatusBadRequest, gin.H{"error": "Email or Password Invalid"}) 
        return
    }

    err = util.CheckPassword(req.Password, user.Password)

    if err != nil{
        ctx.JSON(http.StatusUnauthorized, gin.H{"error": "Email or Password Invalid"})
        return
    }

    params := auth.PayloadParams{
        UserId: user.ID,
        Email: user.Email,
    }
 
    token, err := auth.CreateToken(params, 10*time.Minute)

    if err != nil{
        ctx.JSON(http.StatusInternalServerError, gin.H{"error":"Fail creating the Auth Token"})
        return
    }

    ctx.Writer.Header().Set("authorization", "bearer " + token)
    ctx.JSON(http.StatusOK, gin.H{"token": token, "user": user})
}

type getUserRes struct{
    User createUserResponce `json:"user"`
    Todos []db.Todo `json:"todos"`
    Calendar []util.Day `json:"calendar"`
    Today util.Day `json:"today"`
}

func (server *Server) getUser(ctx *gin.Context){

    payload, err := auth.GetPayload(ctx)
    
    if err != nil{
        ctx.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
        return
    }

    user, err := server.store.Queries.GetUser(ctx,payload.Email)
    
    if err != nil {
        ctx.JSON(http.StatusBadRequest, gin.H{"Error": err})
        return
    }


    todos, err := server.store.Queries.ListTodoByUser(ctx, user.ID)

    if err != nil {
        ctx.JSON(http.StatusInternalServerError, gin.H{"error":"Error Geting user todo"})
        return
    }

    ax := createUserResponce{
        Email: user.Email,
        CreatedAt: user.CreatedAt,
        UpdatedAt: user.UpdatedAt,
        ID: user.ID,
    }

    res := getUserRes{
        User: ax,
        Todos: todos,
    }

    currentTime := time.Now()

    currentMonth := currentTime.Month()
    currentYear := currentTime.Year()

    calendar := util.GenerateCalendar(int(currentYear), currentMonth)

    events, err := server.store.Queries.ListEventByUser(ctx, user.ID)

    if err != nil {
        ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Error getting user events"})
        return
    }

    calendar = util.AddEventToCalendar(events, calendar)


    today, err := util.FindToday(calendar)

    if err != nil{
        ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Today not found"})
        return
    }

    res.Today = today 
    res.Calendar = calendar 
    ctx.JSON(http.StatusOK, res)    
}

 
