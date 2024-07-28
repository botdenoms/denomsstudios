package model

import "time"

type Release struct {
	Title, Category, Synopsis, Thumbnail, Trailer, Url, Id string
	Date                                                   time.Time
}
