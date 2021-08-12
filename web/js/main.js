var url = document.URL.substr(0, document.URL.lastIndexOf('/'));
var urlSplit = url.split("/");
var subdir = "";
for (var i = 3; i < urlSplit.length; i++) {
    subdir = subdir + '/' + urlSplit[i];
}

$(document).ready(function () {
    $("#openreader-btn").qrCodeReader({
        target: "#target-input",
        audioFeedback: true,
        multiple: false,
        skipDuplicates: true,
        callback: function (codes) {
            $("#log").text(JSON.stringify(codes));
            $.get(subdir+"/validate", { data: codes }, function (res) {
                console.log(res)
                $("#log2").text(res)
            });
            console.log(codes);
        }
    });
})