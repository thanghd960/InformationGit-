window.addEventListener("load", function load(event){
    window.removeEventListener("load", load, false); //remove listener, no longer needed
    //console.log("Web Performance Timing API data ready.")
},false);