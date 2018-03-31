<!DOCTYPE html>
<html lang="en">

  <head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <title>Restaurant Page</title>

    <link href="css/bootstrap.min.css" rel="stylesheet">

    <link href="css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href='https://fonts.googleapis.com/css?family=Lora:400,700,400italic,700italic' rel='stylesheet' type='text/css'>
    <link href='https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800' rel='stylesheet' type='text/css'>

    <link href="css/clean-blog.min.css" rel="stylesheet">

    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.js"></script>
    <script type="application/javascript" src="zomato.js" ></script>

  </head>

  <body>

    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
      <div class="container">
        <a class="navbar-brand" href="index.html">RestoFinder</a>
      </div>
    </nav>

    <!-- Page Header -->
    <header class="masthead" style="background-image: url('img/post-bg.jpg')">
      <div class="overlay"></div>
      <div class="container">
        <div class="row">
          <div class="col-lg-8 col-md-10 mx-auto">
            <div class="post-heading">
              <h1>Man must eat food, and we aggregate the best food joints</h1>
              <h2 class="subheading">Problems look mighty small when you have Restofinder</h2>
            </div>
          </div>
        </div>
      </div>
    </header>

    <article>
      <div class="container">
        <div class="row">
          <div class="col-lg-8 col-md-10 mx-auto">                       
            <p id="city"></p>
            <form action="revHandler.php" method="POST">
              <input type="hidden" name="resID" id="resField" value="" />   
              Enter Review<textarea id="review" name="review" placeholder="Enter review here" rows="5" cols="50" required></textarea><br>
              Enter Rating<select id="rating" name="rating" required>
                <option value=1>1</option>
                <option value=2>2</option>
                <option value=3>3</option>
                <option value=4>4</option>
                <option value=5>5</option>
              </select><br>
              <input type="submit" value="Submit" name="subBtn">
            </form>
          </div>
        </div>
      </div>
    </article>

    <hr>

    <!-- Footer -->
    <footer>
      <div class="container">
        <div class="row">
          <div class="col-lg-8 col-md-10 mx-auto">
            <ul class="list-inline text-center">
              <li class="list-inline-item">
                <a href="#">
                  <span class="fa-stack fa-lg">
                    <i class="fa fa-circle fa-stack-2x"></i>
                    <i class="fa fa-facebook fa-stack-1x fa-inverse"></i>
                  </span>
                </a>
              </li>
              <li class="list-inline-item">
                <a href="#">
                  <span class="fa-stack fa-lg">
                    <i class="fa fa-circle fa-stack-2x"></i>
                    <i class="fa fa-github fa-stack-1x fa-inverse"></i>
                  </span>
                </a>
              </li>
            </ul>
            <p class="copyright text-muted">Copyright &copy; RestoFinder 2018</p>
            <p class="text-center small">Developed at lightning speed by Shimanta Bhuyan</p>
          </div>
        </div>
      </div>
    </footer>

    <script type="text/javascript">
      function getParameterByName(name, url) {        //function to get query string values
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    var id = getParameterByName('id')           //access correct restaurant from the query string value
    var rID = getParameterByName('resID');
    console.log("ID: "+id);
    console.log("RES_ID: "+rID);
    var str = window.localStorage.getItem("string"); 
    console.log("STRING: "+str);
    var subStart = "<p id=\'"+id+"\'> <a href=resto.php?id="+id+"&resID="+rID;
    console.log(subStart);
      var start = str.indexOf(subStart);
      var subEnd = "id="+id+"&resID="+rID+" target=_blank>Click here to check out</a></p>";
      var end = str.lastIndexOf(subEnd);
      console.log("START:"+start);
      console.log("END:"+end);
      var len = subEnd.length;
      var res = str.substring(start, end+len); 
      console.log("SUBSTRING: "+res);
      document.getElementById("city").innerHTML = res;

    var restoID = getParameterByName('resID');  
    console.log(restoID);     
    document.getElementById("resField").value = restoID; 

        var r = JSON.parse(localStorage.getItem("data"));
        console.log(r);
    </script>
  </body>

</html>


