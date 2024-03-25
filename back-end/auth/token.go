package auth

import (
	"errors"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"

	"github.com/dgrijalva/jwt-go"
)



type Payload struct{
    jwt.StandardClaims
    ID        uuid.UUID `json:"id"`
    UserId int64 `json:"user_id"`
	Email  string    `json:"email"`
	IssuedAt  time.Time `json:"issued_at"`
	ExpiredAt time.Time `json:"expired_at"`
}

type PayloadParams struct {
    UserId int64 `json:"user_id"`
	Email  string    `json:"email"`
}

func CreatePayload(params PayloadParams,duration time.Duration ) (*Payload,error) {
	tokenID, err := uuid.NewRandom()
	if err != nil {
		return nil, err
	}

    payload := &Payload{
        ID: tokenID,
        UserId: params.UserId,
        Email: params.Email,
        IssuedAt: time.Now(),
        ExpiredAt: time.Now().Add(duration),
    }

    return payload, nil
}


func CreateToken(params PayloadParams, duration time.Duration)(string,error){
    payload,err := CreatePayload(params,duration)

    jwtToken := jwt.NewWithClaims(jwt.SigningMethodHS256, payload)
    
    token, err := jwtToken.SignedString([]byte("Secrete"))
	return token, err

}


func VerifyToken(token string) (*Payload, error) {
	keyFunc := func(token *jwt.Token) (interface{}, error) {
		_, ok := token.Method.(*jwt.SigningMethodHMAC)
		if !ok {
            return nil, errors.New("Invalid Token")
		}
		return []byte("Secrete"), nil
	}

	jwtToken, err := jwt.ParseWithClaims(token, &Payload{}, keyFunc)
	if err != nil {
		verr, ok := err.(*jwt.ValidationError)
		if ok && errors.Is(verr.Inner, errors.New("Token expired")) {
			return nil, errors.New("Token expired")
		}
		return nil, errors.New("Invalid Token")
	}

	payload, ok := jwtToken.Claims.(*Payload)
	if !ok {
		return nil, errors.New("Invalid Token")

	}
	return payload, nil
}



const authorizationPayloadKey = "authorization_payload"

func GetPayload(ctx *gin.Context) (*Payload, error) {

    payloadHeader, exist := ctx.Get(authorizationPayloadKey)

    if !exist {
        return nil, errors.New("Payload not in the header")
    }
    
    payload, ok := payloadHeader.(*Payload)
    if !ok {
        return nil, errors.New("Invalid Payload Format")
    }
    
    return payload, nil
}
