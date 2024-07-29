package model

import (
	"strconv"
	"time"
)

type Release struct {
	Title, Category, Synopsis, Thumbnail, Trailer, Url, Id string
	Date                                                   time.Time
}

func (r Release) HumanDate() string {
	yrs := r.Date.Year()
	dy := r.Date.Day()
	mnt := r.Date.Month().String()[:3]
	return strconv.Itoa(dy) + " " + mnt + " " + strconv.Itoa(yrs)
}

func (r Release) Future() bool {
	return r.Date.After(time.Now())
}
