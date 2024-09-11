package repo

import (
	"database/sql"
	"denomsstudios/model"
	"fmt"
	"strconv"
	"time"
)

type MysqlRepo struct {
	Db *sql.DB
}

func (d MysqlRepo) Name() string {
	return "Sqlite repo"
}

func (d MysqlRepo) RandomRelease() model.Release {
	rel := model.Release{}
	rows, err := d.Db.Query("select * from Release")
	if err == nil {
		if rows.Next() {
			e := rows.Scan(&rel.Id, &rel.Title, &rel.Category, &rel.Date, &rel.Synopsis, &rel.Thumbnail, &rel.Trailer, &rel.Url)
			if e != nil {
				fmt.Printf("Err in scanning data to model\nError: %v\n", e.Error())
			}
		} else {
			fmt.Printf("Err in rows . next call\n")
		}
	}
	return rel
}

func (d MysqlRepo) CreateRelease(rel model.Release) (string, bool) {
	d.Db.Exec(`INSERT INTO Timeline Release (?, ?, ?, ?, ?, ?, ?, ?)`, rel)
	return "", true
}

func (d MysqlRepo) CreateTimeline(tl model.Timeline) (string, bool) {
	r, e := d.Db.Exec(`INSERT INTO Timeline VALUES (?, ?, ?, ?, ?)`, tl.Id, tl.Title, tl.Category, tl.Ref, tl.Date.Format(time.DateOnly))
	if e != nil {
		fmt.Printf("Error on insert qr\nError: %v", e.Error())
		return "", true
	}
	rid, re := r.LastInsertId()
	if re != nil {
		return "", true
	}
	return strconv.Itoa(int(rid)), false
}

func (d MysqlRepo) AllRelease() []model.Release {
	rels := []model.Release{}
	rows, err := d.Db.Query("select * from Release")
	if err == nil {
		for rows.Next() {
			rel := model.Release{}
			e := rows.Scan(&rel.Id, &rel.Title, &rel.Category, &rel.Date, &rel.Synopsis, &rel.Thumbnail, &rel.Trailer, &rel.Url)
			if e != nil {
				fmt.Printf("Err in scanning data to model\nError: %v\n", e.Error())
			}
			rels = append(rels, rel)
		}
	}
	return rels
}

func (d MysqlRepo) UpdateTimeline(id string, data map[string]interface{}) (string, bool) {
	trx, tre := d.Db.Begin()
	if tre != nil {
		fmt.Printf("Transaction starting Error\nError: %v", tre.Error())
		return id, true
	}
	for ky, vl := range data {
		qry := fmt.Sprintf("update Timeline set %v = \"%v\" where id = %v", ky, vl, id)
		// fmt.Println(qry)
		r, e := trx.Exec(qry)
		if e != nil {
			fmt.Printf("Error on Update query for, %v = %v\nError: %v", ky, vl, e.Error())
			return id, true
		}
		_, re := r.LastInsertId()
		if re != nil {
			return id, true
		}
	}
	er := trx.Commit()
	if er != nil {
		fmt.Printf("Transaction commit Error\nError: %v", er.Error())
		return id, true
	}
	return id, false
}

func (d MysqlRepo) AllReleaseSorted() []model.Release {
	rels := []model.Release{}
	rows, err := d.Db.Query("select * from Release order by ReleaseDate desc")
	if err == nil {
		for rows.Next() {
			rel := model.Release{}
			e := rows.Scan(&rel.Id, &rel.Title, &rel.Category, &rel.Date, &rel.Synopsis, &rel.Thumbnail, &rel.Trailer, &rel.Url)
			if e != nil {
				fmt.Printf("Err in scanning data to model\nError: %v\n", e.Error())
			}
			rels = append(rels, rel)
		}
	}
	return rels
}

func (d MysqlRepo) AllTimeline() []model.Timeline {
	tls := []model.Timeline{}
	rows, err := d.Db.Query("select * from Timeline order by ReleaseDate asc")
	if err == nil {
		for rows.Next() {
			tl := model.Timeline{}
			e := rows.Scan(&tl.Id, &tl.Title, &tl.Category, &tl.Ref, &tl.Date)
			if e != nil {
				fmt.Printf("Err in scanning data to model\nError: %v\n", e.Error())
			}
			tls = append(tls, tl)
		}
	}
	return tls
}

func (d MysqlRepo) ReleaseById(id string) (model.Release, bool) {
	rel := model.Release{}
	row := d.Db.QueryRow(`select * from Release where id = ?`, id)
	if row.Err() != nil {
		fmt.Printf("Query error\n")
		return rel, true
	} else {
		e := row.Scan(&rel.Id, &rel.Title, &rel.Category, &rel.Date, &rel.Synopsis, &rel.Thumbnail, &rel.Trailer, &rel.Url)
		if e != nil {
			return rel, true
		}
		return rel, false
	}
}

func (d MysqlRepo) TimelineById(id string) (model.Timeline, bool) {
	tl := model.Timeline{}
	row := d.Db.QueryRow(`select * from Timeline where id = ?`, id)
	if row.Err() != nil {
		fmt.Printf("Query error\n")
		return tl, true
	} else {
		e := row.Scan(&tl.Id, &tl.Title, &tl.Category, &tl.Ref, &tl.Date)
		if e != nil {
			return tl, true
		}
		return tl, false
	}
}

func (d MysqlRepo) PendingTimeline() []model.Timeline {
	tls := []model.Timeline{}
	rows, err := d.Db.Query("select * from Timeline where ReleaseId = '' order by ReleaseDate asc")
	if err == nil {
		for rows.Next() {
			tl := model.Timeline{}
			e := rows.Scan(&tl.Id, &tl.Title, &tl.Category, &tl.Ref, &tl.Date)
			if e != nil {
				fmt.Printf("Err in scanning data to model\nError: %v\n", e.Error())
			}
			tls = append(tls, tl)
		}
	}
	return tls
}
