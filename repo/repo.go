package repo

import "denomsstudios/model"

type Repository interface {
	Name() string

	RandomRelease() model.Release

	CreateRelease(items model.Release) (string, bool)

	AllRelease() []model.Release

	AllTimeline() []model.Timeline

	ReleaseById(id string) (model.Release, bool)
}
