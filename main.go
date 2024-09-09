package main

import (
	"denomsstudios/model"
	"denomsstudios/repo"
	"encoding/json"
	"fmt"
	"html/template"
	"math/rand"
	"net/http"
	"strconv"
	"strings"
	"time"
)

var htmlTemplates *template.Template

var curRepo repo.Repository = &repo.MemoryRepo{
	Timeline: model.Timelines,
	Releases: model.Releases,
}

var aday time.Duration = time.Duration(86400) * time.Second
var amonth time.Duration = aday * 31

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
		search := request.FormValue("s")
		new := request.FormValue("n")
		future := request.FormValue("f")
		ealier := request.FormValue("e")
		if search != "" {
			fmt.Printf("Searching for: %s\n", search)
			dt := curRepo.AllRelease()
			tmp := []map[string]interface{}{}
			for _, v := range dt {
				if strings.Contains(v.Title, search) {
					tmp = append(tmp, v.ToJson())
					continue
				}
				if strings.Contains(v.Synopsis, search) {
					tmp = append(tmp, v.ToJson())
				}
			}
			data = tmp
			writer.Header().Set("Content-Type", "application/json")
			json.NewEncoder(writer).Encode(data)
			return
		} else if new != "" {
			fmt.Printf("Searching for new releasaes\n")
			dt := curRepo.AllRelease()
			tmp := []map[string]interface{}{}
			for _, v := range dt {
				if v.Date.Before(time.Now()) {
					df := time.Until(v.Date)
					if df.Abs().Hours() < (amonth * 2).Abs().Hours() {
						tmp = append(tmp, v.ToJson())
					}
				}
			}
			data = tmp
			writer.Header().Set("Content-Type", "application/json")
			json.NewEncoder(writer).Encode(data)
			return
		} else if future != "" {
			fmt.Printf("Searching for future releasaes\n")
			dt := curRepo.AllRelease()
			tmp := []map[string]interface{}{}
			for _, v := range dt {
				if v.Date.After(time.Now()) {
					tmp = append(tmp, v.ToJson())
				}
			}
			data = tmp
			writer.Header().Set("Content-Type", "application/json")
			json.NewEncoder(writer).Encode(data)
			return
		} else if ealier != "" {
			fmt.Printf("Searching for previous releasaes\n")
			dt := curRepo.AllRelease()
			tmp := []map[string]interface{}{}
			for _, v := range dt {
				if v.Date.Before(time.Now()) {
					tmp = append(tmp, v.ToJson())
				}
			}
			data = tmp
			writer.Header().Set("Content-Type", "application/json")
			json.NewEncoder(writer).Encode(data)
			return
		} else {
			dt := curRepo.AllRelease()
			var tmp []model.Release
			for _, v := range dt {
				if v.Date.Before(time.Now()) {
					df := time.Until(v.Date)
					if df.Abs().Hours() < (amonth * 2).Abs().Hours() {
						tmp = append(tmp, v)
					}
				}
			}
			data = tmp
		}
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
		dt := curRepo.AllTimeline()
		tmp := map[int][]interface{}{}
		ftmp := map[int][]interface{}{}
		for _, v := range dt {
			if len(tmp[v.Date.Year()])%2 == 0 {
				v.Left = true
			} else {
				v.Left = false
			}
			tmp[v.Date.Year()] = append(tmp[v.Date.Year()], v)
		}
		for _, v := range tmp {
			col := rand.Intn(999999)
			ftmp[col] = append(ftmp[col], v...)
		}
		data = ftmp
	case "/about":
		path = "about.html"
		// get data required for the view
		data = nil
	case "/contacts":
		path = "contacts.html"
		// get data required for the view
		data = nil
	case "/privacy":
		path = "privacy.html"
		// get data required for the view
		data = nil
	case "/terms&conditions":
		path = "terms&conditions.html"
		// get data required for the view
		data = nil
	case "/admin/login":
		if request.Method == http.MethodPost {
			user := request.PostFormValue("email")
			pass := request.PostFormValue("pass")
			fmt.Printf("user: %v\t pass: %v\n", user, pass)
			if user == "admin@ds.st" {
				http.SetCookie(writer, &http.Cookie{Name: "auth", Expires: time.Now().Add(time.Minute * 4)})
				http.Redirect(writer, request, "/admin/dashboard", http.StatusTemporaryRedirect)
				return
			} else {
				data = model.Response{
					Status:  true,
					Message: "Invalid credentials",
					Title:   "Not authorized",
				}
			}
		} else {
			data = nil
		}
		path = "auth.html"
	case "/admin/dashboard":
		c, r := request.Cookie("auth")
		if r != nil {
			http.Redirect(writer, request, "/admin/login", http.StatusTemporaryRedirect)
			return
		}
		if c.Expires.After(time.Now()) {
			http.Redirect(writer, request, "/admin/login", http.StatusTemporaryRedirect)
			return
		}
		path = "dashboard.html"

		ftmp := map[string]interface{}{}
		tl := curRepo.AllTimeline()
		rl := curRepo.AllReleaseSorted()
		pn := curRepo.PendingTimeline()
		ftmp["Releases"] = rl
		ftmp["Timeline"] = tl
		ftmp["Pending"] = pn
		ftmp["Prev"] = rl[len(rl)-1]
		ftmp["Next"] = pn[0]
		ftmp["Pcount"] = len(pn)
		ftmp["Rcount"] = len(rl)
		data = ftmp
	case "/admin/db/timeline":
		switch request.Method {
		// Create
		case http.MethodPost:
			title := request.PostFormValue("title")
			category := request.PostFormValue("category")
			date := request.PostFormValue("date")
			if title == "" || category == "" || date == "" {
				// response
				tmp := map[string]interface{}{}
				tmp["error"] = true
				tmp["message"] = "Timeline creation failed, missing all fields"
				tmp["id"] = ""
				data = tmp
				writer.Header().Set("Content-Type", "application/json")
				json.NewEncoder(writer).Encode(data)
				return
			}
			fmt.Printf("Title: %v, Cat: %v, Date: %v\n", title, category, date)
			// write to db point
			// response
			tmp := map[string]interface{}{}
			tmp["error"] = false
			tmp["message"] = "Timeline created successfully"
			tmp["id"] = "12548"
			data = tmp
			writer.Header().Set("Content-Type", "application/json")
			json.NewEncoder(writer).Encode(data)
			return
		// Read
		case http.MethodGet:
			id := request.URL.Query().Get("id")
			if id == "" {
				// response for all timeline
				// get data from db
				tmp := map[string]interface{}{}
				tmp["error"] = false
				tmp["message"] = "All Timeline data"
				tmp["items"] = 0
				tmp["data"] = []model.Timeline{}
				data = tmp
				writer.Header().Set("Content-Type", "application/json")
				json.NewEncoder(writer).Encode(data)
				return
			}
			// response for a single timeline
			// get data from db by the given id
			// if not found return not found response
			fmt.Printf("id: %v\n", id)
			// response
			tmp := map[string]interface{}{}
			tmp["error"] = false
			tmp["message"] = "Single Timeline data"
			tmp["items"] = 0
			tmp["data"] = []model.Timeline{}
			data = tmp
			writer.Header().Set("Content-Type", "application/json")
			json.NewEncoder(writer).Encode(data)
			return
		// Update
		case http.MethodPatch:
			id := request.PostFormValue("id")
			if id == "" {
				// response
				tmp := map[string]interface{}{}
				tmp["error"] = true
				tmp["message"] = "Timeline Update failed, missing identifier"
				tmp["id"] = nil
				data = tmp
				writer.Header().Set("Content-Type", "application/json")
				json.NewEncoder(writer).Encode(data)
				return
			}
			// get item in db with id
			// if not found return not found error response
			// get fields to be updated
			title := request.PostFormValue("title")
			category := request.PostFormValue("category")
			date := request.PostFormValue("date")
			if title == "" && category == "" && date == "" {
				// response
				tmp := map[string]interface{}{}
				tmp["error"] = true
				tmp["message"] = "Timeline Update failed, No fields to update found"
				tmp["id"] = id
				data = tmp
				writer.Header().Set("Content-Type", "application/json")
				json.NewEncoder(writer).Encode(data)
				return
			}
			fmt.Printf("Title: %v, Cat: %v, Date: %v\n", title, category, date)
			// update non-empty fields found
			tmp := map[string]interface{}{}
			tmp["error"] = false
			tmp["message"] = "Timeline updated successfully"
			tmp["id"] = id
			data = tmp
			writer.Header().Set("Content-Type", "application/json")
			json.NewEncoder(writer).Encode(data)
			return
		// Delete
		case http.MethodDelete:
			// alert dangerous api point security should be implemented
			id := request.FormValue("id")
			if id == "" {
				// response
				tmp := map[string]interface{}{}
				tmp["error"] = true
				tmp["message"] = "Timeline delete failed, missing identifier"
				tmp["id"] = nil
				data = tmp
				writer.Header().Set("Content-Type", "application/json")
				json.NewEncoder(writer).Encode(data)
				return
			}
			// get item in db with id
			// if not found return not found error response
			// delete item to be deleted
			tmp := map[string]interface{}{}
			tmp["error"] = false
			tmp["message"] = "Timeline Deleted"
			tmp["id"] = id
			data = tmp
			writer.Header().Set("Content-Type", "application/json")
			json.NewEncoder(writer).Encode(data)
			return
		}
	case "/admin/db/release":
		tmp := map[string]interface{}{}
		tmp["error"] = false
		tmp["message"] = "Under development"
		data = tmp
		writer.Header().Set("Content-Type", "application/json")
		json.NewEncoder(writer).Encode(data)
		return
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
