var zheader, version, url; 
var cityID, colID, restoID; 

var u = "https://developers.zomato.com/api/";

var Zomato = {
    /*
    init: function(opts) {
        if (opts.key !== null) {
            zheader = {
                Accept: "text/plain; charset=utf-8",
                "Content-Type": "text/plain; charset=utf-8",
                "X-Zomato-API-Key": opts.key
            };
        } else {
            console.error("Enter the key");
        }
        version = opts.version || "v2.1";
        url = u + version;
    },
    geocode: function(coords, scb, ecb) {
        if (coords.latitude && coords.longitude === null) {
            console.error("Enter the coordinates correctly");
        }else {
            this.request({
                url: url + "/geocode",
                headers: zheader,
                data: {
                    lat: coords.latitude,
                    lon: coords.longitude
                },
                success: function(response) {
                    scb(response);
                },
                error: function(res) {
                    ecb(res);
                }
            });
        }
    },
    restaurant: function(resid, scb, ecb) {
        if (resid === null) {
            console.error("Enter the restaurant id correctly");
        } else {
            this.request({
                url: url + "/restaurant",
                headers: zheader,
                data: {
                    res_id: resid
                },
                success: function(response) {
                    scb(response);
                },
                error: function(res) {
                    ecb(res);
                }
            });
        }
    },
    */
    request: function(opts) {                 
        var typeArray = opts.url.split("/");
        type = typeArray[typeArray.length-1];       //type of request - city, collection, restaurant

        var req;
        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            req = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            req = new ActiveXObject("Microsoft.XMLHTTP");
        }
        //req.responseType = 'json'; 
        if (opts.type === undefined || opts.type === "GET") {
            var q = "?";
            for (var j = 0; j < Object.keys(opts.data).length; j++) {
                var element = Object.keys(opts.data)[j];
                q += element + "=" + opts.data[Object.keys(opts.data)[j]];
                if (j !== Object.keys(opts.data).length - 1) {
                    q += "&";
                }
            }
            opts.url = opts.url + q;
        }

        //setting data
        req.open(opts.type === undefined ? "GET" : opts.type, opts.url, true);
        //setting headers
        req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");      
        req.setRequestHeader('X-Zomato-API-Key', USER_KEY);
        /*if (opts.headers !== undefined || typeof opts.headers === "object") {
            for (var index = 0; index < Object.keys(opts.headers).length; index++) {
                req.setRequestHeader(Object.keys(opts.headers)[index], opts.headers[Object.keys(opts.headers)[index]]);
            }
        }*/
        req.onreadystatechange = function() {
            //console.log(req.readyState);
            //var city = document.getElementById("city");
            if (req.readyState === 4 && req.status === 200) {
                var data = JSON.parse(req.responseText);
                output(type, data);                                     //show the output of JSON file
                if(type=="cities"){
                    //get details of restaurant collections inside a city
                    Zomato.request({
                        type: "GET",
                        url: "https://developers.zomato.com/api/v2.1/collections",
                        data: {
                                city_id: cityID,
                            }
                        }, function(s) {
                        //document.getElementById("city").innerHTML = JSON.stringify(s);
                        console.log(s)
                    });
                } 
                else if(type=="collections"){
                    //search restaurants within a collection of some city
                    Zomato.request({
                        type: "GET",
                        url: "https://developers.zomato.com/api/v2.1/search",
                        data: {
                                city_id: cityID,
                                collection_id: colID
                            }
                        }, function(s) {
                        //document.getElementById("city").innerHTML = JSON.stringify(s);
                        console.log(s)
                    }); 
                }                                       
            } else if (req.status === "400" || req.status === "401" || req.status === "403" || req.status === "404") {
                opts.error(req);
            } else {

            }  
        };

        req.send();/*opts.type === "GET" ? null : opts.data*/
    }
};

function output(typ, data){  
    //console.log(data);
    var string="";
    //console.log(typ);
    if(typ=="cities"){
        //city.insertAdjacentHTML("beforeend",data["location_suggestions"][0].name);
        cityID = data["location_suggestions"][0].id;
        //console.log(cityID);
    }else if(typ=="collections"){
        colID = data.collections[1].collection["collection_id"];
        //console.log("COLLECTION ID: "+colID);
    }else if(typ=="search"){
        //console.log('\nInside search:\n');
        localStorage.setItem("data", JSON.stringify(data));                 //store json data in loacl storage for retrieving elsewhere
        console.log(data);
        var city = document.getElementById("cityy");
        var numOfResto = data["restaurants"].length;
        //console.log(numOfResto);        
        //console.log(data.restaurants[2].restaurant.name);

        for (var i = 0; i < numOfResto; i++) {
            string += "<p id='resto"+(i+1)+"'> <a href=resto.php?id=resto"+(i+1)+"&resID="+data["restaurants"][i].restaurant.id+" target=_blank><h3>"+data.restaurants[i].restaurant.name+"</h3></a>";
            string += "<h4> Rating: "+data.restaurants[i].restaurant["user_rating"]["aggregate_rating"]+"</h4>";
            string += "<h5>"+data.restaurants[i].restaurant["user_rating"]["rating_text"]+"</h5>";
            string += "<a href=resto.php?id=resto"+(i+1)+"&resID="+data["restaurants"][i].restaurant.id+" target=_blank><img src="+data.restaurants[i].restaurant.thumb+"></a>";
            string += "<p> Cuisines Available: "+data.restaurants[i].restaurant.cuisines+"</p>";
            //string += "<a href="+data.restaurants[i].restaurant.url+">Click here to check out</a> </p>";
            string += "<a href=resto.php?id=resto"+(i+1)+"&resID="+data["restaurants"][i].restaurant.id+" target=_blank>Click here to check out</a></p><hr>";
        }
        city.innerHTML = string;
        window.localStorage.setItem("string", string);     //set the restaurant item for using elsewhere
    }
}          
   
