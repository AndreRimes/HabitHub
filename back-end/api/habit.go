package api

import (
	"errors"
	"habithub/auth"
	db "habithub/db/sqlc"
	"net/http"

	"github.com/gin-gonic/gin"
)


type createHabitReqBody struct {
    Title string `json:"title" binding:"required"`
    WeekDays string `json:"week_days" binding:"required"`
}

func (server *Server) createHabit(ctx *gin.Context){
    var req createHabitReqBody

    if err := ctx.ShouldBindJSON(&req); err != nil {
        ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    payload, err:= auth.GetPayload(ctx)

    if err != nil {
        ctx.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
        return
    }

    args := db.CreateHabitParams{
        Title: req.Title,
        WeekDays: req.WeekDays,
        UserID: payload.UserId,
    }

    habit, err := server.store.Queries.CreateHabit(ctx, args)
    if err != nil {
        ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    ctx.JSON(http.StatusOK, gin.H{"habit": habit}) 
}



func (server *Server) completeDay(ctx *gin.Context) {

     err := server.store.ExecTX(ctx, func(q *db.Queries) error {

       var req db.CompleteDayParams

        if err := ctx.ShouldBindJSON(&req); err != nil {
            ctx.JSON(http.StatusBadRequest, gin.H{"error":err.Error()})
            return err
        }

        day, err := q.CompleteDay(ctx, req)


        if err != nil {
            ctx.JSON(http.StatusInternalServerError, gin.H{"error":err.Error()})
            return err
        }

        habit ,err := q.GetHabit(ctx, day.HabitID)

        if err != nil {
            ctx.JSON(http.StatusInternalServerError, gin.H{"error":err.Error()})
            return err
        }

        payload, err := auth.GetPayload(ctx)

        if err != nil{
            ctx.JSON(http.StatusUnauthorized, gin.H{"error":err.Error()})
            return err

        }

        if habit.UserID != payload.UserId{
            err = errors.New("You cannot acces this habit")
            ctx.JSON(http.StatusUnauthorized, gin.H{"error":err.Error()})
            return err
        }
        return nil

    })

    if err == nil {
        ctx.JSON(http.StatusOK, gin.H{"message" : "ok"})
    }

}

func (server *Server) getHabits(ctx *gin.Context){
    payload, err := auth.GetPayload(ctx)

    if err != nil {
        ctx.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
        return
    }
    
    habits ,err := server.store.Queries.ListHabits(ctx, payload.UserId)

    if err != nil {
        ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    
    ctx.JSON(http.StatusOK, gin.H{"habits": habits})
}

type deleteCompletedDayParams struct{
    HabitID int64 `form:"habit_id" binding:"required"`
    Date string `form:"date" binding:"required"`
}

func (server *Server) deleteCompleted_day(ctx *gin.Context){


    err := server.store.ExecTX(ctx, func(q *db.Queries) error {
        var req deleteCompletedDayParams

        if err := ctx.ShouldBindQuery(&req); err != nil {
            return err
        }

        arg := db.DeleteCompletedDayParams{
            HabitID: req.HabitID,
            Date:    req.Date,
        }

        cd, err := q.DeleteCompletedDay(ctx, arg)

        if err != nil {
            return err
        }

        habit, err := q.GetHabit(ctx, cd.HabitID)

        if err != nil {
            return err
        }

        payload, err := auth.GetPayload(ctx)

        if err != nil {
            return err
        }

        if payload.UserId != habit.UserID{
            return errors.New("Cannot perform this deletion")
        }
        return nil
    } )

    if err != nil {
        ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    ctx.JSON(http.StatusOK, gin.H{"message": "ok"}) 
}





