$(".transaction-item").click(function(){
    let oldSelected = $(".selected");
    oldSelected.addClass("not-selected");
    oldSelected.removeClass("selected");
    oldSelected.children(".title").removeClass("marked");

    let selected = $(this);
    selected.children(".title").addClass("marked");

    let classes = selected.attr("class").split(/\s+/);
    if(classes.filter(element => element === "not-selected")){ 
        selected.removeClass('not-selected');
    }

    selected.addClass('selected');
});