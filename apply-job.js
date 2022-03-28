'use strict'

$(function () {
    $("form input").on("click", function () {
        $(this).removeClass('error-imput');
    });

    var showAlert = function(msg) {
        const alertMsg = $('.custom-alert');

        $(alertMsg).html(msg)
        alertMsg.show();
        setTimeout(function () {
            alertMsg.fadeOut(500);
        }, 2000);
    }

    let validForm = true;

    $("form button.apply").on('click', function (event) {
        event.preventDefault();
        const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        $("form.apply input[required]").each(function () {
            if ($(this).val() == "") {
                $(this).addClass("error-imput");
                showAlert('Please fill in the mandatory information and try again.');
                validForm = false;
                return;
            }
            if ($(this).attr("type") == "email" && !$(this).val().match(regexEmail)) {
                $(this).addClass('error-imput');
                showAlert("Please enter a valid email!");
                validForm = false;
                return;
            }
        });

        validForm = $("form.apply input.error-imput").length ? false : true;

        if(validForm) {
            let formdata = new FormData(document.getElementById("job-application"));

            $.ajax({
                url: 'https://qp-web-api.quantopay.com/api/v1/applied_positions',
                method: "POST",
                data: formdata,
                processData: false,
                contentType: false,
            }).done(function (msg, textStatus) {
                if (textStatus == "success") {
                    showAlert("Congratulations! You have successfully applied to this position.");
                }
            }).fail(function (msg, textStatus) {
                showAlert("Already applied")
            });
        }

    });
});