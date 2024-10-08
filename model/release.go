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

func (r Release) ToJson() map[string]interface{} {
	var mp map[string]interface{} = map[string]interface{}{}

	mp["Title"] = r.Title
	mp["Category"] = r.Category
	mp["Synopsis"] = r.Synopsis
	mp["Date"] = r.HumanDate()
	mp["Thumbnail"] = r.Thumbnail
	mp["Id"] = r.Id
	return mp
}

func (r Release) Day() string {
	d := strconv.Itoa(r.Date.Day())
	if len(d) < 2 {
		return "0" + d
	} else {
		return strconv.Itoa(r.Date.Day())
	}
}

func (r Release) Month() string {
	return r.Date.Month().String()[:3]
}
