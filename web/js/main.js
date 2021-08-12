var url = document.URL.substr(0, document.URL.lastIndexOf('/'));
var urlSplit = url.split("/");
var subdir = "";
for (var i = 3; i < urlSplit.length; i++) {
    subdir = subdir + '/' + urlSplit[i];
}

$(document).ready(function () {
    $("#openreader-btn").qrCodeReader({
        target: "#target-input",
        audioFeedback: false,
        multiple: false,
        skipDuplicates: true,
        callback: function (codes) {
            $("#openreader-btn").hide();
            $("#log").text("Running validation... please wait...")
            $.get(subdir+"/validate", { data: codes }, function (res) {
                $("#openreader-btn").show();
                console.log(res)
                res = JSON.parse(res);
                if(res.error) {
                    $("#log").text(JSON.stringify(res.error, null, 2))
                } else {
                    $("#log").text("Success: "+JSON.stringify(res.data, null, 2))
                }
            });
            console.log(codes);
        }
    });
})