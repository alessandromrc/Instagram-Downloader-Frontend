$(document).ready(function() {
    $("#search").focus(function() {
        $(".search-box").addClass("border-searching");
        $(".search-icon").addClass("si-rotate");
    });

    $("#search").blur(function() {
        $(".search-box").removeClass("border-searching");
        $(".search-icon").removeClass("si-rotate");
    });
    $("#search").keyup(function() {
        if ($(this).val().length > 0) {

            $(".go-icon").addClass("go-in");
        } else {
            $(".go-icon").removeClass("go-in");
        }
    });
    $(".go-icon").click(function() {
        var input = document.getElementById("search").value;
        fetch("http://192.168.178.124:162/?link=" + input, {
                method: "GET",
            })
            .then(response => response.json())
            .then(json => {
                if (json.video_url != null) {
                    var video = document.createElement('video');
                    var username = document.createElement('p');
                    username.innerHTML = "Username: " + json.username + " | Real Name: " + "(" + json.full_name + ")";
                    video.src = json.video_url
                    video.controls = true;
                    video.width = 400;
                    video.height = 400;
                    var anchorElem = document.createElement('a');
                    anchorElem.setAttribute("href", json.video_url);
                    anchorElem.innerHTML = "Download Video";
                    var src = document.getElementById("media");
                    src.appendChild(video)
                    document.getElementById('infos').appendChild(username);
                    document.getElementById('download').appendChild(anchorElem);

                } else {
                    var picture = document.createElement('img');
                    var username = document.createElement('p');
                    username.innerHTML = "Username: " + json.username + " | Real Name: " + "(" + json.full_name + ")";
                    picture.src = json.images[2].src
                    picture.width = 400;
                    picture.height = 400;
                    var src = document.getElementById("media");
                    var anchorElem = document.createElement('a');
                    anchorElem.setAttribute("href", json.images[2].src);
                    anchorElem.innerHTML = "Download Picture";
                    src.appendChild(picture)
                    document.getElementById('infos').appendChild(username);
                    document.getElementById('download').appendChild(anchorElem);
                }
            })
    });
});