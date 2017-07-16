/**
 * Created by alxev on 15.07.2017.
 */
function run() {
    showAreas();
}
function clearArea(area) {
    while (area.firstChild) {
        area.removeChild(area.firstChild);
    }
}
function Get(yourUrl, callback){
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET",yourUrl,true);
    Httpreq.send();
    Httpreq.onreadystatechange = function () {
        if (Httpreq.readyState != 4) return;
        callback(Httpreq.responseText);
    };
    //return Httpreq.responseText;
}
function showAreas() {
    var areaList = document.getElementById("areaList");
    Get('/cafe/listAreas', function (data) {
        clearArea(areaList);
        var a0 = document.createElement("a");
        a0.setAttribute("href", "#");
        a0.setAttribute("class", "list-group-item active");
        a0.textContent = "Add new area";
        a0.setAttribute("onclick", "editArea(" + (-1) + ")");
        areaList.appendChild(a0);
        var areas = JSON.parse(data);
        for (var i=0; i<areas.length; i++) {
            var area = areas[i];
            var a = document.createElement("a");
            a.setAttribute("href", "#");
            if (area.occupied){
                a.setAttribute("class", "list-group-item list-group-item-danger");
                a.textContent = "Area #" + area.id + " '" + area.name + "' (occupied)";
            } else {
                a.setAttribute("class", "list-group-item list-group-item-success");
                a.textContent = "Area #" + area.id + " '" + area.name + "' (free)";
            }
            a.setAttribute("onclick", "openArea(" + area.id + ")");
            areaList.appendChild(a);
            /*
             var b = document.createElement("button");
             b.type = "button";
             b.textContent = "area #" + area.id + " '" + area.name + "'";
             if (!area.occupied){
             b.setAttribute("class", "btn btn-success btn-block");
             b.setAttribute("alt", "Area is free");
             } else {
             b.setAttribute("class", "btn btn-danger btn-block");
             b.setAttribute("alt", "Area is occupied");
             }
             b.setAttribute("onclick", "showTables(" + i + ")");
             areaList.appendChild(b);
             */
        }
    });
    progress("areaList");
    clearDetails(['areaDetails', 'areaButtons', 'tableList', 'tableDetails', 'tableButtons']);
}

function saveArea(id, name) {
    if (id < 0){
        Get("/manage/addArea?name=" + name, showAreas);
    } else {
        Get("/manage/updateArea/" + id + "?name=" + name, showAreas);
    }
}

function editArea(id) {
    var areaDetails = document.getElementById("areaDetails");
    if (id < 0){
        clearDetails(['areaDetails', 'areaButtons', 'tableList', 'tableDetails', 'tableButtons']);
        var h5 = document.createElement("h5");
        h5.textContent = "Create new area";
        areaDetails.appendChild(h5);
        var f = document.createElement("form");
        f.setAttribute("class", "form-horizontal");
        var d1 = document.createElement("div");
        d1.setAttribute("class", "form-group form-group-sm");
        d1.setAttribute("id", "areaNameDiv");
        var l1 = document.createElement("label");
        l1.setAttribute("for", "areaName");
        l1.setAttribute("class", "col-sm-3 control-label");
        l1.textContent = "Area name";
        d1.appendChild(l1);
        var d11 = document.createElement("div");
        d11.setAttribute("class", "col-sm-9");
        var inp1 = document.createElement("input");
        inp1.setAttribute("type", "text");
        inp1.setAttribute("class", "form-control");
        inp1.setAttribute("placeholder", "area name");
        inp1.setAttribute("pattern", "[A-Za-z0-9]{1,20}");
        inp1.setAttribute("oninput", "validateOnChange('areaName', 'saveArea')");
        d1.className = "form-group form-group-sm has-error";
        inp1.setAttribute("required", "required");
        inp1.setAttribute("id", "areaName");
        inp1.value = "";
        d11.appendChild(inp1);
        d1.appendChild(d11);
        f.setAttribute("onchange", "showAreaButtons(" + id + ")");
        f.setAttribute("oninput", "showAreaButtons(" + id + ")");
        f.appendChild(d1);
        areaDetails.appendChild(f);
        showAreaButtons(id);
    }
    else {
        Get("/cafe/area/" + id, function (data) {
            clearDetails(['areaDetails', 'areaButtons', 'tableList', 'tableDetails', 'tableButtons']);
            var h5 = document.createElement("h5");
            h5.textContent = "Edit area #" + id;
            areaDetails.appendChild(h5);
            area = JSON.parse(data);
            var f = document.createElement("form");
            f.setAttribute("class", "form-horizontal");
            var d1 = document.createElement("div");
            d1.setAttribute("class", "form-group form-group-sm");
            d1.setAttribute("id", "areaNameDiv");
            var l1 = document.createElement("label");
            l1.setAttribute("for", "areaName");
            l1.setAttribute("class", "col-sm-3 control-label");
            l1.textContent = "Area name";
            d1.appendChild(l1);
            var d11 = document.createElement("div");
            d11.setAttribute("class", "col-sm-9");
            var inp1 = document.createElement("input");
            inp1.setAttribute("type", "text");
            inp1.setAttribute("class", "form-control");
            inp1.setAttribute("placeholder", "area name");
            inp1.setAttribute("pattern", "[A-Za-z0-9]{1,20}");
            inp1.setAttribute("oninput", "validateOnChange('areaName', 'saveArea')");
            d1.className = "form-group form-group-sm has-success";
            inp1.setAttribute("required", "required");
            inp1.setAttribute("id", "areaName");
            inp1.value = area.name;
            d11.appendChild(inp1);
            d1.appendChild(d11);
            f.setAttribute("onchange", "showAreaButtons(" + id + ")");
            f.setAttribute("oninput", "showAreaButtons(" + id + ")");
            f.appendChild(d1);
            areaDetails.appendChild(f);
            showAreaButtons(id);
        });
        progress("areaDetails");
    }
}

function openArea(id) {
    clearDetails(['areaDetails', 'areaButtons', 'tableList', 'tableDetails', 'tableButtons']);
    var areaDetails = document.getElementById("areaDetails");
    var area;
    var h5 = document.createElement("h5");
    if (id < 0){
        editArea(id);
    } else {
        var a0 = document.createElement("a");
        a0.setAttribute("href", "#");
        a0.setAttribute("class", "list-group-item active");
        a0.textContent = "Manage tables";
        a0.setAttribute("onclick", "showTables(" + id + ")");
        areaDetails.appendChild(a0);

        var a01 = document.createElement("a");
        a01.setAttribute("href", "#");
        a01.setAttribute("class", "list-group-item list-group-item-info");
        a01.textContent = "Edit area";
        a01.setAttribute("onclick", "editArea(" + id + ")");
        areaDetails.appendChild(a01);

        var a2 = document.createElement("a");
        a2.setAttribute("href", "#");
        a2.setAttribute("class", "list-group-item list-group-item-danger");
        a2.textContent = "Remove area";
        a2.setAttribute("onclick", "removeArea(" + id + ")");
        areaDetails.appendChild(a2);
    }
}

function showAreaButtons(id) {
    var areaButtons = document.getElementById("areaButtons");
    clearArea(areaButtons);
    var bSave = document.createElement("button");
    bSave.setAttribute("type", "button");
    bSave.setAttribute("class", "btn btn-primary col-sm-6");
    bSave.setAttribute("onclick", "saveArea(" + id + ", '" + document.getElementById("areaName").value + "')");
    bSave.setAttribute("id", "saveArea");
    bSave.textContent = "Save";
    if (!validateOnChange("areaName")) {
        bSave.setAttribute("disabled", "disabled");
    }
    areaButtons.appendChild(bSave);
    var bCancel = document.createElement("button");
    bCancel.setAttribute("type", "button");
    bCancel.setAttribute("class", "btn btn-danger col-sm-6");
    bCancel.setAttribute("onclick", "clearDetails(['areaButtons', 'areaDetails', 'tableList', 'tableDetails', 'tableButtons'])");
    bCancel.textContent = "Cancel";
    areaButtons.appendChild(bCancel);
}

function clearDetails(details) {
    for (var i=0; i<details.length; i++){
        var area = document.getElementById(details[i]);
        clearArea(area);
    }
}

function validateOnChange(id, elemId) {
    var area = document.getElementById(id + "Div");
    var el = document.getElementById(id);
    var s = document.getElementById(elemId);
    if (el.value.search(el.pattern) == -1) {
        area.className = "form-group form-group-sm has-error";
        if (s) {
            s.setAttribute("disabled", "disabled");
        }
        return false;
    } else {
        area.className = "form-group form-group-sm has-success";
        if (s) {
            s.removeAttribute("disabled");
        }
        return true;
    }
}

function areaDetailsSub(form, id, name, state) {

}

function showTables(areaId) {
    var tableList = document.getElementById("tableList");
    Get('/cafe/listAreaTables/' + areaId, function (data) {
        clearArea(tableList);
        var a0 = document.createElement("a");
        a0.setAttribute("href", "#");
        a0.setAttribute("class", "list-group-item active");
        a0.textContent = "Add new table to area";
        a0.setAttribute("onclick", "editTable(" + (-1) + ", " + areaId + ")");
        tableList.appendChild(a0);
        var tables = JSON.parse(data);
        for (var i=0; i<tables.length; i++) {
            var table = tables[i];
            var a = document.createElement("a");
            a.setAttribute("href", "#");
            if (table.occupied){
                a.setAttribute("class", "list-group-item list-group-item-danger");
                a.textContent = "Table #" + table.id + " '" + table.name + "' (occupied)";
            } else {
                a.setAttribute("class", "list-group-item list-group-item-success");
                a.textContent = "Table #" + table.id + " '" + table.name + "' (free)";
            }
            a.setAttribute("onclick", "openTable(" + table.id + ", " + areaId + ")");
            tableList.appendChild(a);
        }
    });
    progress("tableList");
    clearDetails(['tableDetails', 'tableButtons']);
}

function openTable(id, areaId) {
    clearDetails(['tableDetails', 'tableButtons']);
    var tableDetails = document.getElementById("tableDetails");
    var h5 = document.createElement("h5");
    if (id < 0){
        editTable(id, areaId);
    } else {
        var a01 = document.createElement("a");
        a01.setAttribute("href", "#");
        a01.setAttribute("class", "list-group-item list-group-item-info");
        a01.textContent = "Edit table";
        a01.setAttribute("onclick", "editTable(" + id + ", " + areaId + ")");
        tableDetails.appendChild(a01);

        var a2 = document.createElement("a");
        a2.setAttribute("href", "#");
        a2.setAttribute("class", "list-group-item list-group-item-danger");
        a2.textContent = "Remove table";
        a2.setAttribute("onclick", "removeTable(" + id + ", " + areaId + ")");
        tableDetails.appendChild(a2);
    }
}

function removeTable(id, areaId) {
    Get("/manage/removeTable/" + id, function (data) {
        showTables(areaId);
    })
}

function removeArea(id) {
    Get("/manage/removeArea/" + id, showAreas);
}

function editTable(id, areaId) {
    var tableDetails = document.getElementById("tableDetails");
    if (id < 0){
        clearDetails(['tableDetails', 'tableButtons']);
        var h5 = document.createElement("h5");
        h5.textContent = "Create new table";
        tableDetails.appendChild(h5);
        var f = document.createElement("form");
        f.setAttribute("class", "form-horizontal");
        var d1 = document.createElement("div");
        d1.setAttribute("class", "form-group form-group-sm");
        d1.setAttribute("id", "tableNameDiv");
        var l1 = document.createElement("label");
        l1.setAttribute("for", "tableName");
        l1.setAttribute("class", "col-sm-3 control-label");
        l1.textContent = "Table name";
        d1.appendChild(l1);
        var d11 = document.createElement("div");
        d11.setAttribute("class", "col-sm-9");
        var inp1 = document.createElement("input");
        inp1.setAttribute("type", "text");
        inp1.setAttribute("class", "form-control");
        inp1.setAttribute("placeholder", "table name");
        inp1.setAttribute("pattern", "[A-Za-z0-9]{1,20}");
        inp1.setAttribute("oninput", "validateOnChange('tableName', 'saveTable')");
        d1.className = "form-group form-group-sm has-error";
        inp1.setAttribute("required", "required");
        inp1.setAttribute("id", "tableName");
        inp1.value = "";
        d11.appendChild(inp1);
        d1.appendChild(d11);
        f.setAttribute("onchange", "showTableButtons(" + id + ", " + areaId + ")");
        f.setAttribute("oninput", "showTableButtons(" + id + ", " + areaId + ")");
        f.appendChild(d1);
        tableDetails.appendChild(f);
        showTableButtons(id, areaId);
    }
    else {
        Get("/cafe/table/" + id, function (data) {
            clearDetails(['tableDetails', 'tableButtons']);
            var h5 = document.createElement("h5");
            h5.textContent = "Edit area #" + id;
            tableDetails.appendChild(h5);
            var table = JSON.parse(data);
            var f = document.createElement("form");
            f.setAttribute("class", "form-horizontal");
            var d1 = document.createElement("div");
            d1.setAttribute("class", "form-group form-group-sm");
            d1.setAttribute("id", "tableNameDiv");
            var l1 = document.createElement("label");
            l1.setAttribute("for", "tableName");
            l1.setAttribute("class", "col-sm-3 control-label");
            l1.textContent = "Table name";
            d1.appendChild(l1);
            var d11 = document.createElement("div");
            d11.setAttribute("class", "col-sm-9");
            var inp1 = document.createElement("input");
            inp1.setAttribute("type", "text");
            inp1.setAttribute("class", "form-control");
            inp1.setAttribute("placeholder", "table name");
            inp1.setAttribute("pattern", "[A-Za-z0-9]{1,20}");
            inp1.setAttribute("oninput", "validateOnChange('tableName', 'saveTable')");
            d1.className = "form-group form-group-sm has-success";
            inp1.setAttribute("required", "required");
            inp1.setAttribute("id", "tableName");
            inp1.value = table.name;
            d11.appendChild(inp1);
            d1.appendChild(d11);
            f.setAttribute("onchange", "showTableButtons(" + id + ", " + areaId + ")");
            f.setAttribute("oninput", "showTableButtons(" + id + ", " + areaId + ")");
            f.appendChild(d1);
            tableDetails.appendChild(f);
            showTableButtons(id, areaId);
        });
        progress("tableDetails");
    }
}

function showTableButtons(id, areaId) {
    var tableButtons = document.getElementById("tableButtons");
    clearArea(tableButtons);
    var bSave = document.createElement("button");
    bSave.setAttribute("type", "button");
    bSave.setAttribute("class", "btn btn-primary col-sm-6");
    bSave.setAttribute("onclick", "saveTable(" + areaId + ", " + id + ", '" + document.getElementById("tableName").value + "')");
    bSave.setAttribute("id", "saveTable");
    bSave.textContent = "Save";
    if (!validateOnChange("tableName")) {
        bSave.setAttribute("disabled", "disabled");
    }
    tableButtons.appendChild(bSave);
    var bCancel = document.createElement("button");
    bCancel.setAttribute("type", "button");
    bCancel.setAttribute("class", "btn btn-danger col-sm-6");
    bCancel.setAttribute("onclick", "clearDetails(['tableDetails', 'tableButtons'])");
    bCancel.textContent = "Cancel";
    tableButtons.appendChild(bCancel);
}

function saveTable(areaId, id, name) {
    if (id < 0){
        Get("/manage/addTable?areaId=" + areaId + "&name=" + name, function (data) {
            showTables(areaId);
        });
    } else {
        Get("/manage/updateTable/" + id + "?name=" + name, function (data) {
            showTables(areaId);
        });
    }
}

function progress(elementId) {
    var tables = document.getElementById(elementId);
    var s = document.createElement("img");
    s.setAttribute("src", "ajax-loader.gif");
    s.setAttribute("id", "ajax-loader");
    tables.appendChild(s);

}