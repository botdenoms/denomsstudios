package main

import (
	"fmt"
	"html/template"
	"net/http"
	"strconv"
)

type Release struct {
	Title, Category, Synopsis, Thumbnail, Date string
}

type Releases struct {
	Items []Release
}

type Timeline struct {
	Date, Title, Synopsis, Category, Id string
}

var htmlTemplates *template.Template

var rels []Release = []Release{
	{Title: "Loopies", Date: "15/07/2025", Synopsis: "Test research on loopies holes,\nA scientific documentary on the experiments, the results, and more", Category: "Scientific", Thumbnail: "/public/thum.png"},
	{Title: "Books of w", Date: "15/09/2025", Synopsis: "Book on w poles, a fictional power\nharnesed on the highlands of orfords with dealy conditions\n but worth it rewards.", Category: "Fiction", Thumbnail: "/public/The Party Compst.png"},
	{Title: "Volls on leads", Date: "11/12/2025", Synopsis: "on the loop of voll", Category: "Comedy", Thumbnail: "/"},
}

var times []Timeline = []Timeline{
	{Title: "Loopies", Date: "15/07/2025", Synopsis: "Test loopies holes", Category: "Fun", Id: "1262"},
	{Title: "Books of w", Date: "15/09/2025", Synopsis: "Book on w poles", Category: "Fiction", Id: "5162626"},
	{Title: "Volls on leads", Date: "11/12/2025", Synopsis: "on the loop of voll", Category: "Comedy", Id: "1622"},
}

func HandleTemplateRequest(writer http.ResponseWriter, request *http.Request) {
	path := request.URL.Path
	var data interface{}

	switch path {
	case "/":
		path = "index.html"
		// get data required for the view
		data = rels[0]
	case "/releases":
		path = "releases.html"
		data = rels
		// get data required for the view
	case "/release":
		path = "release.html"
		id := request.FormValue("id")
		fmt.Printf("requested id: %s\n", id)
		// get data required for the view
		data = rels[0]
	case "/timeline":
		path = "timeline.html"
		// get data required for the view
		data = times
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
