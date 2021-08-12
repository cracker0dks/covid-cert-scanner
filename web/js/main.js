$(document).ready(function () {
    $("#openreader-btn").qrCodeReader({
        target: "#target-input",
        audioFeedback: true,
        multiple: false,
        skipDuplicates: true,
        callback: function (codes) {
            $("#log").text(JSON.stringify(codes));
            $.get("/validate", { data: codes }, function (res) {
                console.log(res)
                $("#log2").text(res)
            });
            console.log(codes);
        }
    });
})