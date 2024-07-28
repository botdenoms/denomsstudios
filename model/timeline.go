package model

import "time"

type Timeline struct {
	Title, Category, Id, Ref string
	Date                     time.Time
}
