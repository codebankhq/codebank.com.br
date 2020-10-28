const phoneParse = require('telefone/parse');

class FormControl {
    constructor(selector) {
        this.form = $(selector);

        this.name = $(this.form[0][0]);
        this.email = $(this.form[0][1]);
        this.phone = $(this.form[0][2]);
    }

    submit() {
        if (this.validate()) {
            const body = {
                "name": this.name.val(),
                "email": this.email.val(),
                "phone": this.phone.val(),
            }

            $.ajax({
                type: "POST",
                url: process.env.LEAD_URL,
                data: JSON.stringify(body),
                success: this.onSuccess.bind(this),
                error: this.onError.bind(this)
            });
        };
    }

    validate() {
        let valid = true;
        const borders = $(".border--input");

        if (this.isEmpty(this.name.val())) {
            this.inputError(borders[0], this.name);
            this.errorMessage("Informe o seu nome.");
            this.name.error = true;
            valid = false;
        }

        if (this.isEmpty(this.email.val())) {
            this.inputError(borders[1], this.email);
            this.errorMessage("Informe o seu email.");
            this.email.error = true;
            valid = false;
        }

        if (this.phone.val() && phoneParse(this.phone.val()) == null) {
            this.inputError(borders[2], this.phone);
            this.errorMessage("Informe um número válido.");
            this.phone.error = true;
            valid = false;
        }

        return valid;
    }

    isEmpty(string) {
        const regex = new RegExp(/^\s+$/);
        return string == "" || regex.test(string);
    }

    inputError(border, input) {
        $(border).css("border", "1px solid #E04646");
        input.css("border", "1px solid #E04646");
    }

    errorMessage(msg) {
        let message = $(".register__message");
        message.css("display", "block");
        message.html(msg);
    }

    onError(_) {
        this.errorMessage("Ocorreu um erro inesperado, tente novamente mais tarde.");
    }

    onSuccess(response) {
        if (response.status == "success") {
            const title = $("#register .title");
            const subtitle = $(".register__request-account");

            $(title[1]).html("<span class='marked'> Cadastrado com sucesso! </span>");
            this.form.css("display", "none");

            if (subtitle.css("display") == "none") {
                subtitle.css("display", "block");
            }

            subtitle.html("Ficamos felizes com o seu interesse! Toda nova atualização, lembraremos de enviar à você!");

        } else {
            this.errorMessage("Ocorreu um erro inesperado, tente novamente mais tarde.");
        }
    }
}

const formControl = new FormControl("form");

$("form").on("submit", function (event) {
    event.preventDefault();
    formControl.submit();
});
