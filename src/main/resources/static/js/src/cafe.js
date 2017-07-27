/**
 * Created by alxev on 15.07.2017.
 */
function run() {
    showAreas();
    showDishTypes();
    showCafeAreas();
}

function clearArea(area) {
    if (area){
        while (area.firstChild) {
            area.removeChild(area.firstChild);
        }
    }
}

function Get(yourUrl, callback) {
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET", yourUrl, true);
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
        for (var i = 0; i < areas.length; i++) {
            var area = areas[i];
            var a = document.createElement("a");
            a.setAttribute("href", "#");
            if (area.occupied) {
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
    if (id < 0) {
        Get("/manage/addArea?name=" + name, function () {
            showAreas();
            showCafeAreas();
        });
    } else {
        Get("/manage/updateArea/" + id + "?name=" + name, function () {
            showAreas();
            showCafeAreas();
        });
    }
}

function editArea(id) {
    var areaDetails = document.getElementById("areaDetails");
    if (id < 0) {
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
    if (id < 0) {
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
    for (var i = 0; i < details.length; i++) {
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
        for (var i = 0; i < tables.length; i++) {
            var table = tables[i];
            var a = document.createElement("a");
            a.setAttribute("href", "#");
            if (table.occupied) {
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
    if (id < 0) {
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
    if (id < 0) {
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
    if (id < 0) {
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

function toggleManagement(doWhat) {
    var tm = document.getElementById("toggleManagement");
    if (tm && doWhat == 'hide') {
        tm.textContent = "Hide management";
        tm.setAttribute("onclick", "toggleManagement('show')");
    }
    else if (tm) {
        tm.textContent = "Show management";
        tm.setAttribute("onclick", "toggleManagement('hide')");
    }
}

function toggleKitchen(doWhat) {
    var tm = document.getElementById("toggleKitchen");
    if (tm && doWhat == 'hide') {
        tm.textContent = "Hide kitchen";
        tm.setAttribute("onclick", "toggleKitchen('show')");
    }
    else if (tm) {
        tm.textContent = "Show kitchen";
        tm.setAttribute("onclick", "toggleKitchen('hide')");
    }
}

function toggleCafe(doWhat) {
    var tm = document.getElementById("toggleCafe");
    if (tm && doWhat == 'hide') {
        tm.textContent = "Hide cafe";
        tm.setAttribute("onclick", "toggleCafe('show')");
    }
    else if (tm) {
        tm.textContent = "Show cafe";
        tm.setAttribute("onclick", "toggleCafe('hide')");
    }
}

function showDishTypes() {
    var dishTypesList = document.getElementById("dishTypeList");
    Get('/cafe/listDishTypes', function (data) {
        clearArea(dishTypesList);
        var a0 = document.createElement("a");
        a0.setAttribute("href", "#");
        a0.setAttribute("class", "list-group-item active");
        a0.textContent = "Add new dish type";
        a0.setAttribute("onclick", "editDishType(" + (-1) + ")");
        dishTypesList.appendChild(a0);
        var dishTypes = JSON.parse(data);
        for (var i = 0; i < dishTypes.length; i++) {
            var dishType = dishTypes[i];
            var a = document.createElement("a");
            a.setAttribute("href", "#");
            a.setAttribute("class", "list-group-item");
            a.textContent = dishType.name;
            a.setAttribute("onclick", "openDishType(" + dishType.id + ")");
            dishTypesList.appendChild(a);
        }
    });
    progress("dishTypeList");
    clearDetails(['dishTypeDetails', 'dishTypeButtons', 'dishDetails', 'dishButtons']);
}

function editDishType(id) {
    var dishTypeDetails = document.getElementById("dishTypeDetails");
    if (id < 0) {
        clearDetails(['dishTypeDetails', 'dishTypeButtons', 'dishDetails', 'dishButtons']);
        var h5 = document.createElement("h5");
        h5.textContent = "Create new dish type";
        dishTypeDetails.appendChild(h5);
        var f = document.createElement("form");
        f.setAttribute("class", "form-horizontal");
        var d1 = document.createElement("div");
        d1.setAttribute("class", "form-group form-group-sm");
        d1.setAttribute("id", "dishTypeNameDiv");
        var l1 = document.createElement("label");
        l1.setAttribute("for", "dishTypeName");
        l1.setAttribute("class", "col-sm-3 control-label");
        l1.textContent = "Dish type name";
        d1.appendChild(l1);
        var d11 = document.createElement("div");
        d11.setAttribute("class", "col-sm-9");
        var inp1 = document.createElement("input");
        inp1.setAttribute("type", "text");
        inp1.setAttribute("class", "form-control");
        inp1.setAttribute("placeholder", "dish type name");
        inp1.setAttribute("pattern", "[A-Za-z0-9]{1,20}");
        inp1.setAttribute("oninput", "validateOnChange('dishTypeName', 'saveDishType')");
        d1.className = "form-group form-group-sm has-error";
        inp1.setAttribute("required", "required");
        inp1.setAttribute("id", "dishTypeName");
        inp1.value = "";
        d11.appendChild(inp1);
        d1.appendChild(d11);
        f.setAttribute("onchange", "showDishTypeButtons(" + id + ")");
        f.setAttribute("oninput", "showDishTypeButtons(" + id + ")");
        f.appendChild(d1);
        dishTypeDetails.appendChild(f);
        showDishTypeButtons(id);
    }
    else {
        Get("/cafe/dishType/" + id, function (data) {
            clearDetails(['dishTypeDetails', 'dishTypeButtons', 'dishDetails', 'dishButtons']);
            var h5 = document.createElement("h5");
            h5.textContent = "Edit dish type #" + id;
            dishTypeDetails.appendChild(h5);
            var dishType = JSON.parse(data);
            var f = document.createElement("form");
            f.setAttribute("class", "form-horizontal");
            var d1 = document.createElement("div");
            d1.setAttribute("class", "form-group form-group-sm");
            d1.setAttribute("id", "dishTypeNameDiv");
            var l1 = document.createElement("label");
            l1.setAttribute("for", "dishTypeName");
            l1.setAttribute("class", "col-sm-3 control-label");
            l1.textContent = "Dish type name";
            d1.appendChild(l1);
            var d11 = document.createElement("div");
            d11.setAttribute("class", "col-sm-9");
            var inp1 = document.createElement("input");
            inp1.setAttribute("type", "text");
            inp1.setAttribute("class", "form-control");
            inp1.setAttribute("placeholder", "dish type name");
            inp1.setAttribute("pattern", "[A-Za-z0-9]{1,20}");
            inp1.setAttribute("oninput", "validateOnChange('dishTypeName', 'saveDishType')");
            d1.className = "form-group form-group-sm has-success";
            inp1.setAttribute("required", "required");
            inp1.setAttribute("id", "dishTypeName");
            inp1.value = dishType.name;
            d11.appendChild(inp1);
            d1.appendChild(d11);
            f.setAttribute("onchange", "showDishTypeButtons(" + id + ")");
            f.setAttribute("oninput", "showDishTypeButtons(" + id + ")");
            f.appendChild(d1);
            dishTypeDetails.appendChild(f);
            showDishTypeButtons(id);
        });
        progress("dishTypeDetails");
    }
}

function openDishType(id) {
    var dishTypeDetails = document.getElementById("dishTypeDetails");
    var h5 = document.createElement("h5");
    if (id < 0) {
        editDishType(id);
    } else {
        Get("/cafe/listTypeDishes/" + id, function (data) {
            clearDetails(['dishTypeDetails', 'dishTypeButtons', 'dishDetails', 'dishButtons']);
            var a0 = document.createElement("a");
            a0.setAttribute("href", "#");
            a0.setAttribute("class", "list-group-item active");
            a0.textContent = "Edit dish type";
            a0.setAttribute("onclick", "editDishType(" + id + ")");
            dishTypeDetails.appendChild(a0);

            var a01 = document.createElement("a");
            a01.setAttribute("href", "#");
            a01.setAttribute("class", "list-group-item list-group-item-danger");
            a01.textContent = "Remove dish type";
            a01.setAttribute("onclick", "removeDishType(" + id + ")");
            dishTypeDetails.appendChild(a01);

            var a2 = document.createElement("a");
            a2.setAttribute("href", "#");
            a2.setAttribute("class", "list-group-item list-group-item-info");
            a2.textContent = "Add dish";
            a2.setAttribute("onclick", "editDish(-1, " + id + ")");
            dishTypeDetails.appendChild(a2);

            var dishes = JSON.parse(data);
            for (var i = 0; i < dishes.length; i++) {
                var dish = dishes[i];
                var a3 = document.createElement("a");
                a3.setAttribute("href", "#");
                a3.setAttribute("class", "list-group-item");
                a3.innerHTML = "<span class=\"badge\">" + dish.quantity + " available</span>" + dish.name;
                a3.setAttribute("onclick", "editDish(" + dish.id + ", " + id + ")");
                dishTypeDetails.appendChild(a3);
            }
        });
        progress("dishTypeDetails");
    }
}

function showDishTypeButtons(id) {
    var dishTypeButtons = document.getElementById("dishTypeButtons");
    clearArea(dishTypeButtons);
    var bSave = document.createElement("button");
    bSave.setAttribute("type", "button");
    bSave.setAttribute("class", "btn btn-primary col-sm-6");
    bSave.setAttribute("onclick", "saveDishType(" + id + ", '" + document.getElementById("dishTypeName").value + "')");
    bSave.setAttribute("id", "saveDishType");
    bSave.textContent = "Save";
    if (!validateOnChange("dishTypeName")) {
        bSave.setAttribute("disabled", "disabled");
    }
    dishTypeButtons.appendChild(bSave);
    var bCancel = document.createElement("button");
    bCancel.setAttribute("type", "button");
    bCancel.setAttribute("class", "btn btn-danger col-sm-6");
    bCancel.setAttribute("onclick", "clearDetails(['dishTypeDetails', 'dishTypeButtons', 'dishDetails', 'dishButtons'])");
    bCancel.textContent = "Cancel";
    dishTypeButtons.appendChild(bCancel);
}

function saveDishType(id, name) {
    if (id < 0) {
        Get("/kitchen/addDishType?name=" + name, showDishTypes);
    } else {
        Get("/kitchen/editDishType/" + id + "?name=" + name, showDishTypes);
    }
}

function removeDishType(id) {
    Get("/kitchen/removeDishType/" + id, showDishTypes);
}

function editDish(id, dishTypeId) {
    var dishDetails = document.getElementById("dishDetails");
    if (id < 0) {
        clearDetails(['dishDetails', 'dishButtons']);
        var h4 = document.createElement("h4");
        h4.textContent = "Add new dish";
        dishDetails.appendChild(h4);
        var f = document.createElement("form");
        f.setAttribute("class", "form-horizontal");
        editDishSub(f, "dishName", "text", "Dish name", "dish name", "");
        editDishSub(f, "dishPrice", "number", "Price", "price", "");
        editDishSub(f, "dishQuantity", "number", "Quantity", "quantity", "");
        f.setAttribute("onchange", "showDishButtons(" + id + ", " + dishTypeId + ")");
        f.setAttribute("oninput", "showDishButtons(" + id + ", " + dishTypeId + ")");
        dishDetails.appendChild(f);
        showDishButtons(id, dishTypeId);
    }
    else {
        Get("/cafe/dish/" + id, function (data) {
            clearDetails(['dishDetails', 'dishButtons']);
            var h4 = document.createElement("h4");
            h4.textContent = "Edit dish";
            dishDetails.appendChild(h4);
            var f = document.createElement("form");
            var dish = JSON.parse(data);
            f.setAttribute("class", "form-horizontal");
            editDishSub(f, "dishName", "text", "Dish name", "dish name", dish.name);
            editDishSub(f, "dishPrice", "number", "Price", "price", dish.price);
            editDishSub(f, "dishQuantity", "number", "Quantity", "quantity", dish.quantity);
            f.setAttribute("onchange", "showDishButtons(" + id + ", " + dishTypeId + ")");
            f.setAttribute("oninput", "showDishButtons(" + id + ", " + dishTypeId + ")");
            dishDetails.appendChild(f);
            showDishButtons(id, dishTypeId);
        });
        progress("dishDetails");
    }
}

function editDishSub(form, dId, iType, label, placeholder, iValue) {
    var d1 = document.createElement("div");
    d1.setAttribute("class", "form-group form-group-sm");
    d1.setAttribute("id", dId + "Div");
    var l1 = document.createElement("label");
    l1.setAttribute("for", dId);
    l1.setAttribute("class", "col-sm-3 control-label");
    l1.textContent = label;
    d1.appendChild(l1);
    var d11 = document.createElement("div");
    d11.setAttribute("class", "col-sm-9");
    var inp1 = document.createElement("input");
    inp1.setAttribute("type", iType);
    inp1.setAttribute("class", "form-control");
    inp1.setAttribute("placeholder", placeholder);
    if (iType == "number") {
        inp1.setAttribute("min", "0");
    } else {
        inp1.setAttribute("pattern", "[A-Za-z0-9]{1,20}");
        inp1.setAttribute("oninput", "validateOnChange('" + dId + "', 'saveDish')");
        if (!iValue) {
            d1.className = "form-group form-group-sm has-error";
        } else {
            d1.className = "form-group form-group-sm has-success";
        }
    }
    inp1.setAttribute("required", "required");
    inp1.setAttribute("id", dId);
    inp1.value = iValue;
    d11.appendChild(inp1);
    d1.appendChild(d11);
    form.appendChild(d1);
}

function showDishButtons(id, dishTypeId) {
    var dishButtons = document.getElementById("dishButtons");
    clearArea(dishButtons);
    var bSave = document.createElement("button");
    bSave.setAttribute("type", "button");
    bSave.setAttribute("class", "btn btn-primary col-sm-5");
    bSave.setAttribute("onclick", "saveDish(" + dishTypeId + ", " + id + ", '" + document.getElementById("dishName").value + "', '" + document.getElementById("dishPrice").value + "', '" + document.getElementById("dishQuantity").value + "')");
    bSave.setAttribute("id", "saveDish");
    bSave.textContent = "Save";
    if (!validateOnChange("dishName")) {
        bSave.setAttribute("disabled", "disabled");
    }
    dishButtons.appendChild(bSave);
    var bCancel = document.createElement("button");
    bCancel.setAttribute("type", "button");
    bCancel.setAttribute("class", "btn btn-danger col-sm-5");
    bCancel.setAttribute("onclick", "clearDetails(['dishDetails', 'dishButtons'])");
    bCancel.textContent = "Cancel";
    dishButtons.appendChild(bCancel);
    var bRemove = document.createElement("button");
    bRemove.setAttribute("type", "button");
    bRemove.setAttribute("class", "btn btn-warning col-sm-2");
    bRemove.setAttribute("onclick", "removeDish(" + dishTypeId + ", " + id + ")");
    bRemove.textContent = "Remove";
    dishButtons.appendChild(bRemove);
}

function saveDish(dishTypeId, id, name, price, quantity) {
    if (id < 0) {
        Get("/kitchen/addDish?name=" + name + "&dishTypeId=" + dishTypeId + "&price=" + price + "&quantity=" + quantity, function () {
            openDishType(dishTypeId);
        });
    }
    else {
        Get("/kitchen/editDish/" + id + "?name=" + name + "&price=" + price + "&quantity=" + quantity, function () {
            openDishType(dishTypeId);
        });
    }
}

function removeDish(dishTypeId, id) {
    Get("/kitchen/removeDish/" + id, function () {
        openDishType(dishTypeId);
    })
}

function showCafeAreas() {
    var areaList = document.getElementById("cafeAreaList");
    Get('/cafe/listAreas', function (data) {
        clearArea(areaList);
        var areas = JSON.parse(data);
        for (var i = 0; i < areas.length; i++) {
            var area = areas[i];
            var a = document.createElement("a");
            a.setAttribute("href", "#");
            if (area.occupied) {
                a.setAttribute("class", "list-group-item list-group-item-danger");
                a.textContent = "Area #" + area.id + " '" + area.name + "' (occupied)";
            } else {
                a.setAttribute("class", "list-group-item list-group-item-success");
                a.textContent = "Area #" + area.id + " '" + area.name + "' (free)";
            }
            a.setAttribute("onclick", "openCafeArea(" + area.id + ")");
            areaList.appendChild(a);
        }
    });
    progress("cafeAreaList");
    clearDetails(['cafeAreaDetails', 'cafeTableDetails', 'cafeOrderDetails', 'cafeOrderMenu']);
}

function openCafeArea(id) {
    var areaDetails = document.getElementById("cafeAreaDetails");
    Get("/cafe/area/" + id, function (data1) {
        Get("/cafe/listAreaTables/" + id, function (data) {
            clearDetails(['cafeAreaDetails', 'cafeTableDetails', 'cafeOrderDetails', 'cafeOrderMenu']);
            var area = JSON.parse(data1);
            var a01 = document.createElement("a");
            a01.setAttribute("href", "#");
            if (area.occupied){
                a01.setAttribute("class", "list-group-item list-group-item-warning");
                a01.textContent = "Release area";
                a01.setAttribute("onclick", "releaseCafeArea(" + id + ")");
            }
            else {
                a01.setAttribute("class", "list-group-item list-group-item-info");
                a01.textContent = "Occupy area";
                a01.setAttribute("onclick", "occupyCafeArea(" + id + ")");
            }
            areaDetails.appendChild(a01);
            var tables = JSON.parse(data);
            for (var i = 0; i < tables.length; i++) {
                var table = tables[i];
                var a0 = document.createElement("a");
                a0.setAttribute("href", "#");
                a0.setAttribute("class", "list-group-item");
                if (table.occupied) {
                    a0.innerHTML = "<span class=\"badge\">occupied</span>" + table.name;
                }
                else {
                    a0.innerHTML = "<span class=\"badge\">free</span>" + table.name;
                }
                a0.setAttribute("onclick", "openCafeTable(" + table.id + ")");
                areaDetails.appendChild(a0);
            }
        });
    });
    progress("cafeAreaDetails");
}

function openCafeTable(id) {
    var cafeTableDetails = document.getElementById("cafeTableDetails");
    Get("/cafe/listTableOrders/" + id, function (data1) {
        Get("/cafe/table/" + id, function (data2) {
            clearDetails(['cafeTableDetails', 'cafeOrderDetails', 'cafeOrderMenu']);
            var table = JSON.parse(data2);
            var h4 = document.createElement("h4");
            h4.textContent = "Table " + table.name;
            cafeTableDetails.appendChild(h4);
            var orders = JSON.parse(data1);
            var a;
            var a1;
            if (!table.occupied){
                a = document.createElement("a");
                a.setAttribute("href", "#");
                a.setAttribute("class", "list-group-item list-group-item-info");
                a.textContent = "Occupy table";
                a.setAttribute("onclick", "occupyTable(" + id + ")");
                cafeTableDetails.appendChild(a);
            }
            else {
                if (orders.length <= 0) {
                    a = document.createElement("a");
                    a.setAttribute("href", "#");
                    a.setAttribute("class", "list-group-item list-group-item-warning");
                    a.textContent = "Release table";
                    a.setAttribute("onclick", "releaseTable(" + id + ")");
                    cafeTableDetails.appendChild(a);
                    a1 = document.createElement("a");
                    a1.setAttribute("href", "#");
                    a1.setAttribute("class", "list-group-item list-group-item-success");
                    a1.textContent = "Place order";
                    a1.setAttribute("onclick", "showOrder(-1, " + id + ")");
                    cafeTableDetails.appendChild(a1);
                }
                else {
                    a = document.createElement("a");
                    a.setAttribute("href", "#");
                    a.setAttribute("class", "list-group-item list-group-item-warning disabled");
                    a.textContent = "Release table";
                    a.setAttribute("onclick", "releaseTable(" + id + ")");
                    cafeTableDetails.appendChild(a);
                    a1 = document.createElement("a");
                    a1.setAttribute("href", "#");
                    a1.setAttribute("class", "list-group-item list-group-item-success");
                    a1.textContent = "Place order";
                    a1.setAttribute("onclick", "showOrder(-1, " + id + ")");
                    cafeTableDetails.appendChild(a1);
                    for (var i=0; i<orders.length; i++){
                        var a2 = document.createElement("a");
                        a2.setAttribute("href", "#");
                        a2.setAttribute("class", "list-group-item");
                        a2.textContent = "Open order";
                        a2.setAttribute("onclick", "showOrder(" + orders[i].id + ", " + id + ")");
                        cafeTableDetails.appendChild(a2);
                    }
                }
            }
        });
    });
    progress("cafeTableDetails");
}

function occupyTable(id) {
    Get("/cafe/occupyTable/" + id, function (data) {
        if (data){
            var table = JSON.parse(data);
            openCafeArea(table.area.id);
        }
        openCafeTable(id);
    });
}

function releaseTable(id) {
    Get("/cafe/releaseTable/" + id, function (data) {
        if (data){
            var table = JSON.parse(data);
            openCafeArea(table.area.id);
        }
        openCafeTable(id);
    });
}

function showOrder(id, tableId) {
    showOrderDetails(id, tableId);
}

function showOrderDetails(id, tableId) {
    if (id < 0){
        Get("/cafe/addOrder/" + tableId, function (data) {
            clearDetails(["cafeOrderDetails"]);
            var order = JSON.parse(data);
            var cafeOrderDetails = document.getElementById("cafeOrderDetails");
            var h4 = document.createElement("h4");
            h4.textContent = "Order #" + order.id;
            cafeOrderDetails.appendChild(h4);
            var p = document.createElement("p");
            p.textContent = "Placed at " + order.startDate;
            cafeOrderDetails.appendChild(p);
            var bCancel = document.createElement("button");
            bCancel.setAttribute("class", "btn btn-danger");
            bCancel.textContent = "Cancel order";
            bCancel.setAttribute("onclick", "cancelOrder(" + id + ", " + tableId + ")");
            cafeOrderDetails.appendChild(bCancel);
            var bClose = document.createElement("button");
            bClose.setAttribute("class", "btn btn-info");
            bClose.textContent = "Get check";
            bClose.setAttribute("disabled", "disabled");
            cafeOrderDetails.appendChild(bClose);
            showOrderMenu(order.id, tableId);
        });
    }
    else {
        Get("/cafe/order/" + id, function (data1) {
            Get("cafe/listOrderItems/" + id, function (data2) {
                clearDetails(["cafeOrderDetails"]);
                var order = JSON.parse(data1);
                var details = JSON.parse(data2);
                var cafeOrderDetails = document.getElementById("cafeOrderDetails");
                var h4 = document.createElement("h4");
                h4.textContent = "Order #" + order.id;
                cafeOrderDetails.appendChild(h4);
                var p = document.createElement("p");
                p.textContent = "Placed at " + order.startDate;
                cafeOrderDetails.appendChild(p);
                var bCancel = document.createElement("button");
                bCancel.setAttribute("class", "btn btn-danger");
                bCancel.textContent = "Cancel order";
                bCancel.setAttribute("onclick", "cancelOrder(" + id + ", " + tableId + ")");
                cafeOrderDetails.appendChild(bCancel);
                var bClose = document.createElement("button");
                bClose.setAttribute("class", "btn btn-info");
                if (details.length <= 0){
                    bClose.textContent = "Get check";
                    bClose.setAttribute("disabled", "disabled");
                }
                else {
                    if (order.open){
                        bClose.textContent = "Get check";
                        bClose.setAttribute("onclick", "checkOrder(" + id + ", " + tableId + ")");
                    }
                    else {
                        bClose.textContent = "Close order";
                        bClose.setAttribute("onclick", "closeOrder(" + id + ", " + tableId + ")");
                    }
                }
                cafeOrderDetails.appendChild(bClose);
                for (var i = 0; i< details.length; i++){
                    if (details[i].quantity > 0 ){
                        var a = document.createElement("a");
                        a.setAttribute("href", "#");
                        if (order.open){
                            a.setAttribute("class", "list-group-item");
                            a.setAttribute("onclick", "decreaseOrderItem(" + details[i].id + ", " + order.id + ", " + tableId + ")");
                        }
                        else {
                            a.setAttribute("class", "list-group-item disabled");
                        }
                        a.innerHTML = "<span class=\"badge\">" + details[i].quantity + "</span>" + details[i].dish.name;
                        cafeOrderDetails.appendChild(a);
                    }
                }
                if (order.open){
                    showOrderMenu(order.id, tableId);
                }
            });
        });
    }
    progress("cafeOrderDetails");
}

function decreaseOrderItem(id, orderId, tableId) {
    Get("/cafe/incrementOrderItem/" + id + "?sign=minus", function () {
        showOrder(orderId, tableId);
    });
}

function showOrderMenu(id, tableId) {
    Get("/cafe/listDishTypes/", function (data) {
        clearDetails(["cafeOrderMenu"]);
        var dishTypes = JSON.parse(data);
        var cafeOrderMenu = document.getElementById("cafeOrderMenu");
        var d = document.createElement("div");
        d.setAttribute("class", "row");
        var bCollapse = document.createElement("button");
        bCollapse.setAttribute("class", "btn btn-primary col-md-12");
        bCollapse.setAttribute("type", "button");
        bCollapse.setAttribute("data-toggle", "collapse");
        bCollapse.setAttribute("data-target", "#orderDishTypes");
        bCollapse.setAttribute("aria-expanded", "false");
        bCollapse.setAttribute("aria-controls", "orderDishTypes");
        bCollapse.textContent = "Select dishes";
        d.appendChild(bCollapse);
        cafeOrderMenu.appendChild(d);
        var dc = document.createElement("div");
        dc.setAttribute("class", "row collapse");
        dc.setAttribute("id", "orderDishTypes");
        for (var i=0; i<dishTypes.length; i++){
            var di = document.createElement("div");
            di.setAttribute("class", "dropdown");
            di.setAttribute("id", "drop" + dishTypes[i].id);
            var a = document.createElement("a");
            a.setAttribute("href", "#");
            a.setAttribute("class", "list-group-item dropdown-toggle");
            a.setAttribute("data-toggle", "dropdown");
            a.setAttribute("aria-haspopup", "true");
            a.setAttribute("aria-expanded", "true");
            a.setAttribute("onclick", "dropDishes(" + id + ", " + dishTypes[i].id + ", " + tableId + ")");
            a.setAttribute("id", "dishesMenu" + dishTypes[i].id);
            a.innerHTML = dishTypes[i].name + "<span class=\"caret\">";
            di.appendChild(a);
            dc.appendChild(di);

        }
        cafeOrderMenu.appendChild(dc);
    });
    progress("cafeOrderMenu");
}

function dropDishes(orderId, id, tableId) {
    Get("/cafe/listTypeDishes/" + id, function (data) {
        clearDetails(["menu" + id]);
        var dishesMenu = document.getElementById("drop" + id);
        var u = document.createElement("ul");
        u.setAttribute("class", "dropdown-menu");
        u.setAttribute("aria-labelledby", "dishesMenu" + id);
        u.setAttribute("id", "menu" + id);
        var dishes = JSON.parse(data);
        for (var i = 0; i<dishes.length; i++){
            var li = document.createElement("li");
            var a = document.createElement("a");
            a.setAttribute("onclick", "addDishToOrder(" + orderId + ", " + dishes[i].id + ", " + tableId + ")");
            a.setAttribute("href", "#");
            if (dishes[i].quantity <= 0){
                li.setAttribute("class", "disabled");
            }
            a.innerHTML = "<span class=\"badge\">" + dishes[i].quantity + " left</span>" + dishes[i].name;
            li.appendChild(a);
            u.appendChild(li);
        }
        dishesMenu.appendChild(u);
    });
    //progress("menu" + id);
}

function addDishToOrder(orderId, id, tableId) {
    Get("/cafe/addOrderItem/" + orderId + "?dishId=" + id, function () {
        showOrder(orderId, tableId);
    });
}

function checkOrder(id, tableId) {
    Get("/cafe/checkOrder/" + id, function () {
        openCafeTable(tableId);
        showOrder(id, tableId);
    });
}

function closeOrder(id, tableId) {
    Get("/cafe/closeOrder/" + id, function () {
        openCafeTable(tableId);
    });
}

function cancelOrder(id, tableId) {
    Get("/cafe/cancelOrder/" + id, function () {
        openCafeTable(tableId);
    })
}

function occupyCafeArea(id) {
    Get("/cafe/occupyArea/" + id, function () {
        openCafeArea(id);
        showCafeAreas();
        showAreas();
    })
}

function releaseCafeArea(id) {
    Get("/cafe/releaseArea/" + id, function () {
        openCafeArea(id);
        showAreas();
        showCafeAreas();
    })
}