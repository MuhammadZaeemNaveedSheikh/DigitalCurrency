'use strict'

$(function () {
    $("form input").on("click", function () {
        $(this).removeClass('error-imput');
    });

    $("form button.subscribe").on('click', function (event) {
        event.preventDefault();

        let userDetails = {};
        let email = $("form.subscribe input[type=email]");
        const alertMsg = $('.custom-alert');
        const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        $("form.subscribe input").each(function () {
            if ($(this).val() !== "") {
                userDetails[$(this).attr('name')] = $(this).val();
                $(this).removeClass('error-imput');
            } else {
                $(this).addClass('error-imput');
                return false;
            }
        });

        if(!email.val().match(regex)) {
            $(email).addClass('error-imput')
            return
        };

        if (!$.isEmptyObject(userDetails)) {
            $.ajax({
                url: 'https://qp-web-api.quantopay.com/api/v1/newsletter_subscribers/subscribe',
                method: "POST",
                data: userDetails,
            }).done(function (msg, textStatus) {
                if (textStatus == "success") {
                    alertMsg.html('You subscribed!')

                    alertMsg.show();
                    setTimeout(function () {
                        alertMsg.fadeOut(500);
                    }, 2000);
                }
            }).fail(function (msg, textStatus) {
                if (textStatus == "error") {
                    alertMsg.html(msg.responseJSON.error.message);

                    alertMsg.show();
                    setTimeout(function () {
                        alertMsg.fadeOut(500);
                    }, 2000);
                }
            });
        }
    });
});