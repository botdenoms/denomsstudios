package model

import (
	"math"
	"strconv"
	"time"
)

type Timeline struct {
	Title, Category, Id, Ref string
	Date                     time.Time
	Index                    int
	Left                     bool
}

func (t Timeline) Month() string {
	return t.Date.Month().String()[:3]
}

func (t Timeline) Day() string {
	d := strconv.Itoa(t.Date.Day())
	if len(d) < 2 {
		return "0" + d
	} else {
		return strconv.Itoa(t.Date.Day())
	}
}

func (t Timeline) Pos() string {
	dy := float32(t.Date.YearDay()) / float32(366+31) * 100
	return strconv.Itoa(int(math.Ceil(float64(dy))))
}

func (t Timeline) HumanDate() string {
	yrs := t.Date.Year()
	dy := t.Date.Day()
	mnt := t.Date.Month().String()[:3]
	return strconv.Itoa(dy) + " " + mnt + " " + strconv.Itoa(yrs)
}
