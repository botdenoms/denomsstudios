package repo

import (
	"denomsstudios/model"
	"math/rand"
	"sort"
	"time"
)

type MemoryRepo struct {
	Timeline []model.Timeline
	Releases []model.Release
}

func (r MemoryRepo) Name() string {
	return "Memory repo"
}

func (r MemoryRepo) RandomRelease() model.Release {
	i := rand.Intn(len(r.Releases))
	return r.Releases[i]
}

func (r MemoryRepo) CreateRelease(items model.Release) (string, bool) {
	// r.Releases = append(r.Releases, items)
	return "", true
}

func (r MemoryRepo) CreateTimeline(items model.Timeline) (string, bool) {
	return "", true
}

func (r MemoryRepo) AllRelease() []model.Release {
	return r.Releases
}

func (r MemoryRepo) AllReleaseSorted() []model.Release {
	t := r.Releases
	var its []int
	var fl []model.Release
	for _, v := range t {
		dy := v.Date.YearDay()
		its = append(its, dy)
	}
	sort.Ints(its)
	for _, dy := range its {
		for _, tl := range t {
			if dy == tl.Date.YearDay() {
				fl = append(fl, tl)
				break
			}
		}
	}
	return fl
}

func (r MemoryRepo) AllTimeline() []model.Timeline {
	t := r.Timeline
	var its []int
	var fl []model.Timeline
	for _, v := range t {
		v.Index = v.Date.YearDay()
		its = append(its, v.Index)
	}
	sort.Ints(its)
	for _, dy := range its {
		for _, tl := range t {
			if dy == tl.Date.YearDay() {
				fl = append(fl, tl)
				break
			}
		}
	}
	return fl
}

func (r MemoryRepo) ReleaseById(id string) (model.Release, bool) {
	for _, rel := range r.Releases {
		if rel.Id == id {
			return rel, false
		}
	}
	return model.Release{}, true
}

func (r MemoryRepo) TimelineById(id string) (model.Timeline, bool) {
	return model.Timeline{}, true
}

func (r MemoryRepo) UpdateTimeline(id string, data map[string]interface{}) (string, bool) {
	return "", true
}

func (r MemoryRepo) PendingTimeline() []model.Timeline {
	t := r.Timeline
	var its []int
	var fl, fln []model.Timeline
	for _, v := range t {
		v.Index = v.Date.YearDay()
		its = append(its, v.Index)
	}
	sort.Ints(its)
	for _, dy := range its {
		for _, tl := range t {
			if dy == tl.Date.YearDay() {
				fl = append(fl, tl)
				break
			}
		}
	}
	for _, f := range fl {
		if f.Date.After(time.Now()) {
			fln = append(fln, f)
		}
	}
	return fln
}
