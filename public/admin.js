// 
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
    props.className = `${elms} hd`
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
        }
    }
    props.className = "props"
}

function nextRelease(index, id) {
    switchTab(index)
    timelineSelect(id, true)
}

function peekShow() {
    var btn = document.getElementById("pkb")
    var vw = document.getElementById("peek")
    btn.setAttribute("disabled", true)
    vw.className = "peek"
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

function updateTimeline(itemid) {
    alert("Under development")
}

function publishRelease(e) {
    alert("Under development")
    e.preventDefault()
}