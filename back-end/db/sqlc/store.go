package db

import (
	"context"
	"database/sql"
	"fmt"
)


type Store struct {
    *Queries
    db *sql.DB
}

func NewStore(db *sql.DB) *Store {
    return &Store{
        db: db,
        Queries: New(db),
    }
}


func (store *Store) ExecTX(ctx context.Context, fn func(*Queries)error ) error {
    tx, err := store.db.BeginTx(ctx,nil)

    if err != nil {
        return err
    }

    q := New(tx)
    err = fn(q)

    if err != nil {
        rbError := tx.Rollback()
        if rbError != nil {
            return fmt.Errorf("tx err: %v, rb err: %v", err,rbError)
        }
        return err
    }
    return tx.Commit()
}

