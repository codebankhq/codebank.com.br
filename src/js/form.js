const phoneParse = require('telefone/parse');

$("form").on("submit", function (event) {
    event.preventDefault();

    function isEmpty(string) {
        const regex = new RegExp(/^\s+$/);
        return string == "" || regex.test(string);
    }

    function inputError(border, input) {
        $(border).css("border", "1px solid #E04646");
        $(input).css("border", "1px solid #E04646");
    }

    function errorMessage(msg) {
        let message = $(".register__message");
        message.css("display", "block");
        message.html(msg);
    }

    const body = {
        "name": event.target[0].value,
        "email": event.target[1].value,
        "phone": event.target[2].value,
    }

    const inputs = $(".border--input");

    if (isEmpty(body.name)) {
        inputError(inputs[0], inputs[0].firstElementChild);
        errorMessage("Informe o seu nome.");
        return;
    }

    if (isEmpty(body.email)) {
        inputError(inputs[1], inputs[1].firstElementChild);
        errorMessage("Informe o seu email.");
        return;
    }

    if (body.phone && phoneParse(body.phone) == null) {
        inputError(inputs[2], inputs[2].firstElementChild);
        errorMessage("Informe um número válido.");
        return;
    }

    function onSuccess(response) {
        if (response.status == "success") {
            const title = $("#register .title");
            const subtitle = $(".register__request-account");

            $(title[1]).html("<span class='marked'> Cadastrado com sucesso! </span>");
            $("form").css("display", "none");

            if(subtitle.css("display") == "none") {
                subtitle.css("display", "block");
            }

            subtitle.html("Ficamos felizes com o seu interesse! Toda nova atualização, lembraremos de enviar à você!");

        } else {
            errorMessage("Ocorreu um erro inesperado, tente novamente mais tarde.");
        }
    }

    function onError(_) {
        errorMessage("Ocorreu um erro inesperado, tente novamente mais tarde.");
    }

    $.ajax({
        type: "POST",
        url: process.env.LEAD_URL,
        data: JSON.stringify(body),
        success: onSuccess,
        error: onError
    });

    return;
})
