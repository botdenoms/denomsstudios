package repo

import (
	"denomsstudios/model"
	"math/rand"
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
	r.Releases = append(r.Releases, items)
	return "", true
}

func (r MemoryRepo) AllRelease() []model.Release {
	return r.Releases
}

func (r MemoryRepo) AllTimeline() []model.Timeline {
	return r.Timeline
}

func (r MemoryRepo) ReleaseById(id string) model.Release {
	return r.RandomRelease()
}
