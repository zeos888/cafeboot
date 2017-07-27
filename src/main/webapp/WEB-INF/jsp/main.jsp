<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.springframework.org/schema/jdbc">
<head>
    <meta charset="UTF-8">
    <title>Cafe</title>
    <link rel="stylesheet" type="text/css" href="webjars/bootstrap/3.2.0/css/bootstrap.min.css"/>
    <script type="application/javascript" src="webjars/jquery/2.1.1/jquery.min.js"></script>
    <script type="application/javascript" src="webjars/bootstrap/3.2.0/js/bootstrap.min.js"></script>
    <script type="application/javascript" src="js/src/cafe.js"></script>
</head>
<body onload="run()">

<div class="row">
    <button class="btn btn-primary col-md-3" type="button" data-toggle="collapse" data-target="#cafe" aria-expanded="false" aria-controls="cafe" id="toggleCafe" onclick="toggleCafe('hide')">
        Show cafe
    </button></div>
<div class="row collapse" id="cafe">
    <div class="col-md-3" id="cafeAreaList">

    </div>
    <div class="col-md-3" id="cafeAreaDetails">

    </div>
    <div class="col-md-3" id="cafeTableDetails">

    </div>
    <div class="col-md-3">
        <div class="row" id="cafeOrderDetails">

        </div>
        <div class="row" id="cafeOrderMenu">

        </div>
    </div>
</div>

<div class="row">
    <button class="btn btn-primary col-md-3" type="button" data-toggle="collapse" data-target="#manage" aria-expanded="false" aria-controls="manage" id="toggleManagement" onclick="toggleManagement('hide')">
        Show management
    </button>
</div>
<div class="row collapse" id="manage">
    <div class="col-md-3">
        <div class="list-group" id="areaList">

        </div>
    </div>
    <div class="col-md-4">
        <div class="row" id="areaDetails">

        </div>
        <div class="row" id="areaButtons">

        </div>
    </div>
    <div class="col-md-2">
        <div class="list-group" id="tableList">

        </div>
    </div>
    <div class="col-md-2">
        <div class="row" id="tableDetails">

        </div>
        <div class="row" id="tableButtons">

        </div>
    </div>
</div>

<div class="row">
    <button class="btn btn-primary col-md-3" type="button" data-toggle="collapse" data-target="#kitchen" aria-expanded="false" aria-controls="kitchen" id="toggleKitchen" onclick="toggleKitchen('hide')">
        Show kitchen
    </button>
</div>
<div class="row collapse" id="kitchen">
    <div class="col-md-3">
        <div class="list-group" id="dishTypeList">

        </div>
    </div>
    <div class="col-md-4">
        <div class="row" id="dishTypeDetails">

        </div>
        <div class="row" id="dishTypeButtons">

        </div>
    </div>
    <div class="col-md-4">
        <div class="row" id="dishDetails">

        </div>
        <div class="row" id="dishButtons">

        </div>
    </div>
</div>

</body>
</html>