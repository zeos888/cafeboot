<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%><%--
  Created by IntelliJ IDEA.
  User: alxev
  Date: 12.07.2017
  Time: 23:32
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Cafe</title>
    <script type="application/javascript">
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
        function showArea() {
            var areaList = document.getElementById("areaList");
            Get('/area/list', function (data) {
                var areas = JSON.parse(data);
                for (var i=0; i<areas.length; i++) {
                    var area = areas[i];
                    var b = document.createElement("button");
                    b.type = "button";
                    b.textContent = "area #" + area.id + " '" + area.name + "'";
                    areaList.appendChild(b);
                }
            });
        }
    </script>
    <link rel="stylesheet" type="text/css" href="webjars/bootstrap/3.2.0/css/bootstrap.min.css"/>
    <script type="application/javascript" src="webjars/jquery/2.1.1/jquery.min.js"></script>
    <script type="application/javascript" src="webjars/bootstrap/3.2.0/js/bootstrap.min.js"></script>
</head>
<body>

<button type="button" class="btn btn-success btn-block" onclick="showArea()"></button>
<div class="col-md-3">
    <p id="areaList">

    </p>
</div>
</body>
</html>
