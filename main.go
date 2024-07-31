package main

import (
	"denomsstudios/model"
	"denomsstudios/repo"
	"fmt"
	"html/template"
	"net/http"
	"strconv"
)

var htmlTemplates *template.Template

var curRepo repo.Repository = &repo.MemoryRepo{
	Timeline: model.Timelines,
	Releases: model.Releases,
}

func HandleTemplateRequest(writer http.ResponseWriter, request *http.Request) {
	path := request.URL.Path
	var data interface{}

	switch path {
	case "/":
		path = "index.html"
		// get data required for the view
		data = curRepo.RandomRelease()
	case "/releases":
		path = "releases.html"
		data = curRepo.AllRelease()
		// get data required for the view
	case "/release":
		path = "release.html"
		id := request.FormValue("id")
		fmt.Printf("requested id: %s\n", id)
		if id == "" {
			data = model.Response{Title: "", Message: "Id is required"}
			break
		}
		// get data required for the view
		resp, err := curRepo.ReleaseById(id)
		if err {
			data = model.Response{Title: "", Message: "Release not found"}
			break
		}
		data = resp
	case "/timeline":
		path = "timeline.html"
		// get data required for the view
		data = curRepo.AllTimeline()
	default:
		http.NotFoundHandler()
	}

	t := htmlTemplates.Lookup(path)
	if t == nil {
		http.NotFound(writer, request)
	} else {
		err := t.Execute(writer, data)
		if err != nil {
			http.Error(writer, err.Error(), http.StatusInternalServerError)
		}
	}
}

func main() {
	// server := http.NewServeMux()

	// server.HandleFunc("/", HandleTemplateRequest)

	http.HandleFunc("/", HandleTemplateRequest)
	http.HandleFunc("/releases", HandleTemplateRequest)
	http.HandleFunc("/release", HandleTemplateRequest)
	http.HandleFunc("/timeline", HandleTemplateRequest)
	http.Handle("/index", http.RedirectHandler("/", http.StatusTemporaryRedirect))

	fsHandler := http.FileServer(http.Dir("./public"))
	http.Handle("/public/", http.StripPrefix("/public", fsHandler))

	err := http.ListenAndServe(":5000", nil)
	if err != nil {
		fmt.Printf("Error: %v", err.Error())
	}
}

func init() {
	var err error
	htmlTemplates = template.New("all")
	htmlTemplates.Funcs(map[string]interface{}{
		"intVal": strconv.Atoi,
	})

	htmlTemplates, err = htmlTemplates.ParseGlob("templates/*.html")
	if err != nil {
		panic(err)
	}
	fmt.Printf("Loaded templates\n")
}
