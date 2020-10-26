jQuery(function ($) {
    const cellphone = $("#cellphone");
    cellphone.mask("(99)9?9999-9999", { placeholder: "_" });
    
    cellphone.on('focus click', function () {
        var regex = new RegExp('[0-9]+');
        const value = $(this)[0].value;

        if (!regex.test(value)) {
            $(this)[0].setSelectionRange(0, 0);
        }
    })
});