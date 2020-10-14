$(".api__transactions__item").click(function(){
    let oldSelected = $(".api__transactions__item--selected");
    oldSelected.addClass("api__transactions__item--notselected");
    oldSelected.removeClass("api__transactions__item--selected");
    oldSelected.children(".title").removeClass("marked");

    let selected = $(this);
    selected.children(".title").addClass("marked");

    let classes = selected.attr("class").split(/\s+/);
    if(classes.filter(element => element === "api__transactions__item--notselected")){ 
        selected.removeClass('api__transactions__item--notselected');
    }

    selected.addClass('api__transactions__item--selected');
});
