$("form").on("submit", function (event) {
    event.preventDefault();

    const body = {
        "name": event.target[0].value,
        "email": event.target[1].value,
        "phone": event.target[2].value.replace(" ", ""),
    }

    function onSuccess(response) {
        if (response.status == "success") {
            alert("Cadastro realizado com sucesso!");
        } else {
            alert("Ocorreu algum erro inesperado!");
        }
    }

    function onError(_) {
        alert("Ocorreu algum erro inesperado!");
    }

    $.ajax({
        type: "POST",
        url: process.env.LEAD_URL,
        data: JSON.stringify(body),
        success: onSuccess,
        error: onError
    });
})
