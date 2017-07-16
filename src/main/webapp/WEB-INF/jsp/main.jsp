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
    <button class="btn btn-primary col-md-3" type="button" data-toggle="collapse" data-target="#cafe" aria-expanded="false" aria-controls="cafe">
        Show cafe
    </button></div>
<div class="row collapse" id="cafe">
    <div class="col-md-3">
        <p onload="showArea()" id="areaListCafe">

        </p>
    </div>
    <div class="col-md-2">
        <p id="tableListCafe">

        </p>
    </div>
    <div class="col-md-3">
        <p id="orderList">

        </p>
    </div>
    <div class="col-md-3">
        <p id="orderDetails">

        </p>
    </div>
</div>

<div class="row">
    <button class="btn btn-primary col-md-3" type="button" data-toggle="collapse" data-target="#manage" aria-expanded="false" aria-controls="manage">
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
    <button class="btn btn-primary col-md-3" type="button" data-toggle="collapse" data-target="#kitchen" aria-expanded="false" aria-controls="kitchen">
        Show kitchen
    </button>
</div>
<div class="row collapse" id="kitchen">

</div>

</body>
</html>