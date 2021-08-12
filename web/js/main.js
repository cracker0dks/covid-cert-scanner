$(document).ready(function () {
    $("#openreader-btn").qrCodeReader({
        target: "#target-input",
        audioFeedback: true,
        multiple: false,
        skipDuplicates: true,
        callback: function (codes) {
            $.get("/validate", { data: codes }, function (res) {
                console.log(res)
            });
            console.log(codes);
        }
    });
})