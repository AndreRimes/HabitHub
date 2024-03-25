package api

import (
	"errors"
	"habithub/auth"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

const (
	authorizationHeaderKey  = "authorization"
	authTypeBearer          = "bearer"
    authorizationPayloadKey = "authorization_payload"
)



func (server *Server) AuthMiddleware() gin.HandlerFunc{

    return func(ctx *gin.Context) {
        authorizationHeader := ctx.GetHeader(authorizationHeaderKey)

        if len(authorizationHeader) == 0{
            err := errors.New("Authorization Header was not provided")
            ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
            return
        }

        fields := strings.Fields(authorizationHeader)


        if len(fields) < 2 {
            err := errors.New("Authorization Header has a invalid Format")
            ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
            return
        }

        authorizationType := strings.ToLower(fields[0])

        if authorizationType != authTypeBearer {
            err := errors.New("Authorization Header Type is Invalid")
            ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
            return
        }

        accessToken := fields[1]

        payload, err := auth.VerifyToken(accessToken)

        if err != nil{
            ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
            return
        }

        ctx.Set(authorizationPayloadKey, payload)
        ctx.Next()
    }
}

func CORS() gin.HandlerFunc {
	return func(c *gin.Context) {
        c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE, PATCH")
        

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}

