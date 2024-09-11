package repo

import "denomsstudios/model"

type Repository interface {
	Name() string

	RandomRelease() model.Release

	CreateRelease(rel model.Release) (string, bool)

	CreateTimeline(tl model.Timeline) (string, bool)

	AllRelease() []model.Release

	AllTimeline() []model.Timeline

	ReleaseById(id string) (model.Release, bool)

	TimelineById(id string) (model.Timeline, bool)

	UpdateTimeline(id string, data map[string]interface{}) (string, bool)

	AllReleaseSorted() []model.Release

	PendingTimeline() []model.Timeline
}
