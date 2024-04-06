package api

import (
	"habithub/auth"
	"habithub/util"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

func (server *Server) getCalendar(ctx *gin.Context){
    req :=  ctx.Param("id")
    offset, err := strconv.Atoi(req)

    if err != nil {
      ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
      return
    }

    Time := time.Now().AddDate(0,offset, 0)

    Month := Time.Month()
    Year := Time.Year()

    calendar := util.GenerateCalendar(int(Year), Month)
    payload,err := auth.GetPayload(ctx)

    if err != nil {
        ctx.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
        return
    }

    events,err := server.store.Queries.ListEventByUser(ctx, payload.UserId)

    if err != nil {
        ctx.JSON(http.StatusInternalServerError, gin.H{"error":err.Error()})
        return
    }

    calendar = util.AddEventToCalendar(events, calendar)

    ctx.JSON(http.StatusOK, gin.H{"calendar":calendar})
}


