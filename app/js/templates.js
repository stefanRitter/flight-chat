define(function() {

  this["Templates"] = this["Templates"] || {};

  this["Templates"]["templates/chat_link.html"] = new Hogan.Template(function(c,p,i){var _=this;_.b(i=i||"");_.b("<a href=\"chatView\" class=\"chat-link js-view-link ");_.b(_.v(_.f("active",c,p,0)));_.b("\" data-conversationId=\"");_.b(_.v(_.f("conversationId",c,p,0)));_.b("\">");_.b("\n" + i);_.b("  <img src=\"");_.b(_.v(_.f("userImageUrl",c,p,0)));_.b("\" class=\"chat-message-author\" />");_.b("\n" + i);_.b("  <div class=\"chat-user-name\">");_.b(_.v(_.f("userName",c,p,0)));_.b("</div>");_.b("\n" + i);_.b("  <div class=\"chat-message-text\">");_.b(_.v(_.f("message",c,p,0)));_.b("</div>");_.b("\n" + i);_.b("  <div class=\"arrow-right\"></div>");_.b("\n" + i);_.b("</a>");return _.fl();;});

  this["Templates"]["templates/chat_message.html"] = new Hogan.Template(function(c,p,i){var _=this;_.b(i=i||"");_.b("<div class=\"chat-message ");_.b(_.v(_.f("self",c,p,0)));_.b("\" id=\"");_.b(_.v(_.f("_id",c,p,0)));_.b("\">");_.b("\n" + i);_.b("  <img src=\"");_.b(_.v(_.f("userId",c,p,0)));_.b("\" class=\"chat-message-author\" />");_.b("\n" + i);_.b("  <div class=\"chat-message-text\">");_.b(_.v(_.f("text",c,p,0)));_.b("</div>");_.b("\n" + i);_.b("</div>");return _.fl();;});

  this["Templates"]["templates/chat_view.html"] = new Hogan.Template(function(c,p,i){var _=this;_.b(i=i||"");_.b("<div class=\"chat\">");_.b("\n" + i);_.b("  <div class=\"chat-messages\">");_.b("\n" + i);_.b("    <!-- chat_message.html -->");_.b("\n" + i);_.b("  </div>");_.b("\n" + i);_.b("  <form class=\"chat-input\" data-event=\"uiEmitMessage\">");_.b("\n" + i);_.b("    <input type=\"text\" name=\"text\" value=\"\" placeholder=\"Send a message...\">");_.b("\n" + i);_.b("    <input type=\"hidden\" name=\"conversationId\" value=\"");_.b(_.v(_.f("conversationId",c,p,0)));_.b("\">");_.b("\n" + i);_.b("    <input type=\"hidden\" name=\"userId\" value=\"");_.b(_.v(_.f("userId",c,p,0)));_.b("\">");_.b("\n" + i);_.b("    <button type=\"submit\"><div class=\"arrow-right\"></div></button>");_.b("\n" + i);_.b("    <button href=\"imageUploaderView\" class=\"js-view-link\">img</button>");_.b("\n" + i);_.b("  </form>");_.b("\n" + i);_.b("</div>");_.b("\n" + i);_.b("\n" + i);_.b("<header class=\"main-header\">");_.b("\n" + i);_.b("  <a href=\"back\" class=\"js-view-link arrow-left\"></a>");_.b("\n" + i);_.b("</header>");_.b("\n");return _.fl();;});

  return this["Templates"];
});