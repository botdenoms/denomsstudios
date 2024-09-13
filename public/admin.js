// 
const months = ["Jan", "Feb", "Mar", "Apr",
                "May", "Jun", "Jul", "Aug",
                "Sep", "Oct", "Nov", "Dec"
            ]

function switchTab(index) {
    var tabsP = document.getElementById("tabs")
    if (tabsP.children.item(index).className.includes("active")) {
        return
    }
    for (const child of tabsP.children) {
        child.className = 'tb'
    }
    tabsP.children.item(index).className += " active"

    var dshtb = document.getElementById("dshb")
    var tltb = document.getElementById("tln")
    var rltb = document.getElementById("rls")
    var sttb = document.getElementById("stt")

    switch (index) {
        case 0:
            dshtb.className = "dshbrd"
            tltb.className = " hd"
            rltb.className = " hd"
            sttb.className = " hd"
            break;
        case 1:
            tltb.className = "tlbrd"
            dshtb.className = " hd"
            rltb.className = " hd"
            sttb.className = " hd"
            break;
        case 2:
            rltb.className ="rlsbrd"
            tltb.className = " hd"
            dshtb.className = " hd"
            sttb.className = " hd"
            break;
        case 3:
            sttb.className = "sttbrd"
            tltb.className = " hd"
            rltb.className = " hd"
            dshtb.className = " hd"
            break;
        default:
            break;
    }
}

function timelineForm(){
    var form = document.getElementById("tlform")
    var btn = document.getElementById("tlformbt")
    
    if (form.className.includes("hd")) {
        form.className = " "
        btn.className += " hd"
    }
}

function timelineFormClose(e){
    var form = document.getElementById("tlform")
    var btn = document.getElementById("tlformbt")
    
    btn.className = "btnb"
    form.className = "hd"
    e.preventDefault()
}

function propToggle(id) {
    var idv = ""
    var elms = ""
    if (id === 0) {
        idv = "props"
        elms = "itemtl"
    } else {
        idv = "props1"
        elms = "itemrl"
    }
    var itms = document.getElementsByClassName(elms)
    for (let index = 0; index < itms.length; index++) {
        itms.item(index).className = elms    
    }
    var props = document.getElementById(idv)
    props.className = `${idv} hd`
    if (id === 0) {
        var ntl = document.getElementById("ntitle")
        var nct = document.getElementById("ncategory")
        var ncl = document.getElementById("ndate")
        ntl.className = "nttl hd"
        nct.className = "ncat hd"
        ncl.className = "ndt hd"
    }else{
        // 
    }

}

function timelineSelect(id, ref=false){
    var clnm = ""
    var elms = ""
    if (ref) {
        clnm = "props1"
        elms = "itemrl"
    }else{
        clnm = "props"
        elms = "itemtl"
        var ntl = document.getElementById("ntitle")
        var nct = document.getElementById("ncategory")
        var ncl = document.getElementById("ndate")
        
        ntl.className = "hd nttl"
        nct.className = "hd ncat"
        ncl.className = "hd ndt"

        var props = document.getElementById(clnm)
        var rw1 = props.getElementsByClassName("row1")
        rw1.item(0).className = "row1 hd"

        peekHd()
    }
    var props = document.getElementById(clnm)

    var itms = document.getElementsByClassName(elms)
    var title = ""
    var category = ""
    var date = null
    var refId = null

    for (let index = 0; index < itms.length; index++) {
        if(itms.item(index).getAttribute("data-id") === id){
            itms.item(index).className = `${elms} selected`
            title = itms.item(index).getAttribute("data-title")
            category = itms.item(index).getAttribute("data-category")
            date = itms.item(index).getAttribute("data-date")
            refId = itms.item(index).getAttribute("data-ref")
        }else{
            itms.item(index).className = elms
        }
    }

    var tl = props.getElementsByClassName("tlwrd")
    var ct = props.getElementsByClassName("ctgwht")
    var cl = props.getElementsByClassName("col1")

    tl.item(0).innerHTML = title
    ct.item(0).innerHTML = category
    cl.item(0).children.item(1).innerHTML = date

    tl.item(0).className = "tlwrd"
    ct.item(0).className = "ctgwht"
    cl.item(0).className = "col1"
    if (ref) {
        // 
    }else{
        if (refId === "") {
            var edit = props.getElementsByClassName("edit")
            var del = props.getElementsByClassName("del")
            var peek = props.getElementsByClassName("pkb")
            var rls = props.getElementsByClassName("rels")
            edit.item(0).className = "btnb edit"
            del.item(0).className = "btnr del"
            peek.item(0).className = "btnb pkb hd"
            rls.item(0).className = "btnb rels hd"
        }else{
            var edit = props.getElementsByClassName("edit")
            var del = props.getElementsByClassName("del")
            var peek = props.getElementsByClassName("pkb")
            var rls = props.getElementsByClassName("rels")
            edit.item(0).className = "btnb edit hd"
            del.item(0).className = "btnr del hd"
            peek.item(0).className = "btnb pkb"
            rls.item(0).className = "btnb rels"
            rls.item(0).setAttribute("href", `/release?id=${refId}`)
            props.setAttribute("data-ref", refId)
        }
    }
    props.className = clnm
}

function nextRelease(index, id) {
    switchTab(index)
    timelineSelect(id, true)
}

async function peekShow() {
    var refid = ""
    var props = document.getElementById("props")
    refid = props.getAttribute("data-ref")
    if (refid === null) {
        alert("Invalid ref values")
        return
    }
    var ldr = document.getElementById("ldr1")
    var btn = document.getElementById("pkb")
    var vw = document.getElementById("peek")
    btn.setAttribute("disabled", true)
    ldr.className = ""
    try {
        var resp = await fetch(`http://localhost:5000/admin/db/release?id=${refid}`)
        var rel = await resp.json()
        if(rel["error"]){
            alert("Error fetching release, try again")
            ldr.className = "hd"
            btn.removeAttribute("disabled")
        }else{
            console.log(rel["data"])
            var imgt = document.getElementById("peekimg")
            var sysp = document.getElementById("synp")
            imgt.setAttribute('src', rel["data"]["Thumbnail"])
            sysp.innerHTML = rel["data"]["Synopsis"]
            ldr.className = "hd"
            vw.className = "peek"
        }
    } catch (error) {
        console.log(`Error : ${error}`)
        ldr.className = "hd"
        btn.removeAttribute("disabled")
    }
}

function peekHd() {
    var vw = document.getElementById("peek")
    var btn = document.getElementById("pkb")
    vw.className = "peek hd"
    btn.removeAttribute("disabled")
}

function editTimeline() {
    var props = document.getElementById("props")
    var tl = props.getElementsByClassName("tlwrd")
    var ct = props.getElementsByClassName("ctgwht")
    var cl = props.getElementsByClassName("col1")
    var rw1 = props.getElementsByClassName("row1")
    var ed = props.getElementsByClassName("edit")
    var del = props.getElementsByClassName("del")

    var ntl = document.getElementById("ntitle")
    var nct = document.getElementById("ncategory")
    var ncl = document.getElementById("ndate")

    var ttl = tl.item(0).innerHTML 
    var ctg = ct.item(0).innerHTML
    var dt = cl.item(0).children.item(1).innerHTML

    var ts = Date.parse(dt)
    var rld = new Date(ts)
    // hide the items
    tl.item(0).className += " hd"
    ct.item(0).className += " hd"
    cl.item(0).className += " hd"

    ed.item(0).className = "btnb edit hd"
    del.item(0).className = "btnr del hd"
    // show inputs
    ntl.value = ttl
    ncl.value = `${rld.getFullYear()}-${(rld.getMonth() + 1).toString().padStart(2, "0")}-${rld.getDate().toString().padStart(2, "0")}`
    ntl.className = "nttl"
    nct.className = "ncat"
    ncl.className = "ndt"

    rw1.item(0).className = "row1"
}

function closeEdit() {
    var ntl = document.getElementById("ntitle")
    var nct = document.getElementById("ncategory")
    var ncl = document.getElementById("ndate")
    var props = document.getElementById("props")
    var ed = props.getElementsByClassName("edit")
    var del = props.getElementsByClassName("del")
    var rw1 = props.getElementsByClassName("row1")
    var tl = props.getElementsByClassName("tlwrd")
    var ct = props.getElementsByClassName("ctgwht")
    var cl = props.getElementsByClassName("col1")


    tl.item(0).className = "tlwrd"
    ct.item(0).className = "ctgwht"
    cl.item(0).className = "col1"
    
    ntl.className = "hd nttl"
    nct.className = "hd ncat"
    ncl.className = "hd ndt"
    rw1.item(0).className = "row1 hd"
    ed.item(0).className = "btnb edit"
    del.item(0).className = "btnr del"
}

function delTimeline() {
    alert("Under development")
}

function fetchRelease(id) {
    // get release of the given id 
}

function showModal() {
    var mdl = document.getElementById("rlmodal")
    var props = document.getElementById("props1")
    var tl = props.getElementsByClassName("tlwrd")
    var pt = mdl.getElementsByClassName("tlwrd")
    pt.item(0).innerHTML = tl.item(0).innerHTML
    mdl.className = "rlmodal"
}

function closeModal(e) {
    var mdl = document.getElementById("rlmodal")
    mdl.className = "rlmodal hd"
    e.preventDefault()
}

function stopEvent(e) {
    e.stopPropagation()
}

async function createTimeline(e) {
    var subbtn = document.getElementById("smbt")
    var ldr = document.getElementById("ldr2")
    subbtn.className = "btnb hd"
    ldr.className = ""

    var ttl = document.getElementById("title").value
    var ctg = document.getElementById("category").value
    var dt = document.getElementById("date").value

    if (ttl !== "" &&  ctg !== "" && dt !== ""){
        e.preventDefault()
        var fmdt = new FormData()
        fmdt.append("title", ttl)
        fmdt.append("category", ctg)
        fmdt.append("date", dt)
        try {
            var resp = await fetch("http://localhost:5000/admin/db/timeline", {method: "POST", body: fmdt})
            var tl = await resp.json()
            if(tl["error"]){
                alert("Error Creating timeline\ntry again")
                subbtn.className = "btnb"
                ldr.className = "hd"
            }else{
                // create an itemtl & add to items list
                createItemtl(tl["data"])
                subbtn.className = "btnb"
                ldr.className = "hd"
                clearFields()
            }
        } catch (error) {
            console.log(`Error : ${error}`)
            subbtn.className = "btnb"
            ldr.className = "hd"
        }
    }else{
        setTimeout(()=>{
            subbtn.className = "btnb"
            ldr.className = "hd"
        }, 1500)
    }
    
}

function clearFields() {
    document.getElementById("title").value = ""
    document.getElementById("category").value = ""
    document.getElementById("date").value = ""
}

function createItemtl(item) {
    var dto = new Date(Date.parse(item.Date))
    var dm = dto.getDate().toString().padStart(2, "0")
    var tldiv = document.createElement('div')
    tldiv.setAttribute('class', "itemtl")
    tldiv.setAttribute('onclick', `timelineSelect('${item.Id}')`)
    // tldiv.addEventListener('onclicl', timelineSelect(item.Id))
    // attribs
    tldiv.setAttribute('data-title', item.Title)
    tldiv.setAttribute('data-category', item.Category)
    // Human form
    tldiv.setAttribute('data-date', `${dm} ${months[dto.getMonth()]} ${dto.getFullYear()}`)
    tldiv.setAttribute('data-ref', item.Ref)
    tldiv.setAttribute('data-id', item.Id)
    // children
    var row2 = document.createElement('div')
    row2.setAttribute('class', "row2")
    var dy = document.createElement('span')
    dy.setAttribute('class', "dy")
    dy.innerHTML = dm
    row2.appendChild(dy)

    var col2 = document.createElement('div')
    col2.setAttribute('class', "col2")
    var m = document.createElement('span')
    m.innerHTML = months[dto.getMonth()]
    var y = document.createElement('span')
    y.innerHTML = dto.getFullYear()
    col2.appendChild(m)
    col2.appendChild(y)
    row2.appendChild(col2)

    tldiv.appendChild(row2)
    var tl = document.createElement('span')
    tl.setAttribute('class', "tlwrd1")
    tl.innerHTML = item.Title
    tldiv.appendChild(tl)
    var cs = document.createElement('span')
    cs.setAttribute('class', "ctword1")
    cs.innerHTML = item.Category
    tldiv.appendChild(cs)
    var spr = document.createElement('div')
    spr.setAttribute('class', "spr20")
    tldiv.appendChild(spr)

    var tllst = document.getElementById("tllist")
    tllst.appendChild(tldiv)
    //                         {{ if ne $v.Ref ""}}
    //                         <a href="/release?id={{ $v.Ref }}" class="navlnk" target="_blank">Release Notes</a>
    //                         {{ end }}
}

async function updateTimeline() {
    // get item id
    var props = document.getElementById("props")
    var ldr = document.getElementById("ldr")
    var rw1 = props.getElementsByClassName("row1")
    rw1.item(0).children.item(0).className = "btnb hd"
    ldr.className = ""
    var curid = props.getAttribute("data-id")
    // fields to update
    var ntl = document.getElementById("ntitle")
    var nct = document.getElementById("ncategory")
    var ncl = document.getElementById("ndate")
    var fmdt = new FormData()
    fmdt.append("id", curid)
    fmdt.append("title", ntl.value)
    fmdt.append("category", nct.value)
    fmdt.append("date", ncl.value)
    try {
        var resp = await fetch("http://localhost:5000/admin/db/timeline", {method: "PATCH", body: fmdt})
        var msg = await resp.json()
        if(msg["error"]){
            alert("Error Updating try again")
            ldr.className = "hd"
            rw1.item(0).children.item(0).className = "btnb"
        }else{
            // refresh ui
            var sl = document.getElementById("ncategory")
            var catg = "None"
            for (let index = 0; index < sl.children.length; index++) {
                if (sl.children.item(index).getAttribute("value") === nct.value){
                    catg = sl.children.item(index).innerHTML
                }
            }
            // . props ui update too
            var tl = props.getElementsByClassName("tlwrd")
            tl.item(0).innerHTML = ntl.value
            var cl = props.getElementsByClassName("col1")
            var nd = new Date( Date.parse(ncl.value))
            var dy = nd.getDate().toString().padStart(2, "0")
            cl.item(0).children.item(1).innerHTML = `${dy} ${months[nd.getMonth()]} ${nd.getFullYear()}`
            var ct = props.getElementsByClassName("ctgwht")
            ct.item(0).innerHTML = catg
            // 2. selected item data
            var itms = document.getElementsByClassName("itemtl")
            for (let index = 0; index < itms.length; index++) {
                if(itms.item(index).className.includes("selected")){
                    itms.item(index).setAttribute("data-title", ntl.value)
                    itms.item(index).setAttribute("data-category", catg)
                    itms.item(index).setAttribute("data-date", `${dy} ${months[nd.getMonth()]} ${nd.getFullYear()}`)
                    itms.item(index).getElementsByClassName("tlwrd1").item(0).innerHTML = ntl.value
                    itms.item(index).getElementsByClassName("ctword1").item(0).innerHTML = catg
                    // TODO: for date
                    itms.item(index).getElementsByClassName("dy").item(0).innerHTML = dy
                    itms.item(index).getElementsByClassName("col2").item(0).children.item(0).innerHTML = months[nd.getMonth()]
                    itms.item(index).getElementsByClassName("col2").item(0).children.item(1).innerHTML = nd.getFullYear()
                }
            }
            // anims
            ldr.className = "hd"
            rw1.item(0).children.item(0).className = "btnb"
            // 3. close edit btns
            closeEdit()
        }
    } catch (error) {
        console.log(`Error : ${error}`)
        ldr.className = "hd"
        rw1.item(0).children.item(0).className = "btnb"
    }
}

function publishRelease(e) {
    alert("Under development")
    e.preventDefault()
}