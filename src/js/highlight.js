$("pre code").each(function () {
  var html = $(this).html();
  var pattern = html.match(/\s*\n[\t\s]*/);
  $(this).html(html.replace(new RegExp(pattern, "g"), '\n'));
});

hljs.initHighlightingOnLoad();
hljs.initLineNumbersOnLoad();

$(".api__transactions__item").click(function () {
  const show = `.${this.id}_code`;
  const hidden = this.id == "ted" ? ".billet_code" : ".ted_code";

  $(hidden).css("display", "none");
  $(show).css("display", "block");
});
