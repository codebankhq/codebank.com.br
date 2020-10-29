const phoneParse = require('telefone/parse');

class FormControl {
    constructor(selector) {
        this.form = $(selector);

        this.inputs = {
            "name": {
                input: $(this.form[0][0]),
                border: $($(".border--input")[0]),
                errorMessage: "Informe o seu nome.",
            },

            "email": {
                input: $(this.form[0][1]),
                border: $($(".border--input")[1]),
                errorMessage: "informe o seu email.",
            },

            "cellphone": {
                input: $(this.form[0][2]),
                border: $($(".border--input")[2]),
                errorMessage: "Informe um número válido.",
            }
        };

        this.form.on('submit', (e) => this.submit(e));
        $("input").on('change', (e) => this.onChange(e));
    }

    submit(event) {
        event.preventDefault();

        if (this.validate()) {
            const body = {
                "name": this.inputs['name'].input.val(),
                "email": this.inputs['email'].input.val(),
                "phone": this.inputs['cellphone'].input.val(),
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

    onChange(event) {
        const name = event.target.name;
        if (this.inputs[name].error && this.inputs[name].input.val().length > 0) {
            this.reset(this.inputs[name]);
        }
    }

    validate() {
        var valid = true;
        const inputNames = Object.keys(this.inputs);

        inputNames.forEach((inputName) => {
            if ((inputName != 'cellphone' && this.isEmpty(this.inputs[inputName].input.val())) ||
                (inputName == 'cellphone' && this.inputs['cellphone'].input.val() && phoneParse(this.inputs['cellphone'].input.val()) == null)) {

                this.inputError(this.inputs[inputName]);
                this.errorMessage(this.inputs[inputName].errorMessage);
                this.inputs[inputName].error = true;
                valid = false;
            }
        });

        return valid;
    }

    isEmpty(string) {
        const regex = new RegExp(/^\s+$/);
        return string == "" || regex.test(string);
    }

    inputError(element) {
        element.border.css("border", "1px solid #E04646");
        element.input.css("border", "1px solid #E04646");
    }

    errorMessage(msg) {
        let message = $(".register__message");
        message.css("display", "block");
        message.html(msg);
    }

    reset(element) {
        element.border.css("border", "1px solid white");
        element.input.css("border", "1px solid white");
        $(".register__message").css("display", "none");
        element.error = false;
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

new FormControl("form");
