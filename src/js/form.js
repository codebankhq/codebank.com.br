const form = document.getElementsByTagName("form")[0];
form.onsubmit = function (event) {
    event.preventDefault();

    const body = {
        "name": event.target[0].value,
        "email": event.target[1].value,
        "phone": event.target[2].value.replace(" ", ""),
    }

    const request = {
        headers: {
            "content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(body),
        method: "POST",
    }

    function onResponse(response) {
        if (response.status == "success") {
            alert("Cadastro realizado com sucesso!");
        } else {
            alert("Ocorreu algum erro inesperado!");
        }
    }

    function onError(_) {
        alert("Ocorreu algum erro inesperado!");
    }

    fetch(process.env.LEAD_URL, request)
        .then(data => { return data.json() })
        .then(onResponse)
        .catch(onError)
}
