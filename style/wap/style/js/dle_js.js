var c_cache=[],dle_poll_voted=[];function reload(){var a=(new Date).getTime();document.getElementById("dle-captcha").innerHTML='<img src="'+dle_root+"engine/modules/antibot/antibot.php?rndval="+a+'" width="160" height="80" alt="" />'}function dle_change_sort(a,b){var c=document.getElementById("news_set_sort");c.dlenewssortby.value=a;c.dledirection.value=b;c.submit();return!1}
function doPoll(a,b){var c=document.getElementById("dlepollform_"+b),d=c.status.value,e="";if(1!=dle_poll_voted[b]){if("results"!=a&&1!=d){for(var g=0;g<c.elements.length;g++){var f=c.elements[g];if("radio"==f.type&&1==f.checked){e=f.value;break}"checkbox"==f.type&&1==f.checked&&(e=e+f.value+" ")}if("vote"==a&&""==e)return;dle_poll_voted[b]=1}else d=1,c.status.value=1;1==d&&"vote"==a&&(d=0,c.status.value=0,a="list");ShowLoading("");$.post(dle_root+"engine/ajax/poll.php",{news_id:b,action:a,answer:e,
vote_skin:dle_skin},function(a){HideLoading("");$("#dle-poll-list-"+b).fadeOut(500,function(){$(this).html(a);$(this).fadeIn(500)})})}}function IPMenu(a,b,c,d){var e=[];e[0]='<a href="https://www.nic.ru/whois/?ip='+a+'" target="_blank">'+b+"</a>";e[1]='<a href="'+dle_root+dle_admin+"?mod=iptools&ip="+a+'" target="_blank">'+c+"</a>";e[2]='<a href="'+dle_root+dle_admin+"?mod=blockip&ip="+a+'" target="_blank">'+d+"</a>";return e}
function ajax_save_for_edit(a,b){var c={};"1"==quick_wysiwyg&&submit_all_data();"2"==quick_wysiwyg&&tinyMCE.triggerSave();$.each($("#ajaxnews"+a).serializeArray(),function(a,b){-1!=b.name.indexOf("xfield")&&(c[b.name]=b.value)});document.getElementById("allow_br_"+a).checked&&(c.allow_br=1);document.getElementById("approve_"+a).checked&&(c.approve=1);c.news_txt=$("#dleeditnews"+a).val();c.full_txt=$("#dleeditfullnews"+a).val();c.title=$("#edit-title-"+a).val();c.reason=$("#edit-reason-"+a).val();
c.id=a;c.field=b;c.action="save";ShowLoading("");$.post(dle_root+"engine/ajax/editnews.php",c,function(a){HideLoading("");"ok"!=a?DLEalert(a,dle_info):($("#dlepopup-news-edit").dialog("close"),DLEconfirm(dle_save_ok,dle_confirm,function(){location.reload(!0)}))});return!1}
function ajax_prep_for_edit(a,b){for(var c=0,d=c_cache.length;c<d;c++)c in c_cache&&(c_cache[c]||""!=c_cache[c])&&ajax_cancel_comm_edit(c);ShowLoading("");$.get(dle_root+"engine/ajax/editnews.php",{id:a,field:b,action:"edit"},function(c){HideLoading("");var d="none";$("#modal-overlay").remove();$("body").prepend('<div id="modal-overlay" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: #666666; opacity: .40;filter:Alpha(Opacity=40); z-index: 999; display:none;"></div>');
$("#modal-overlay").css({filter:"alpha(opacity=40)"}).fadeIn();var f={};f[dle_act_lang[3]]=function(){$(this).dialog("close")};f[dle_act_lang[4]]=function(){ajax_save_for_edit(a,b)};$("#dlepopup-news-edit").remove();$("body").prepend("<div id='dlepopup-news-edit' class='dlepopupnewsedit' title='"+menu_short+"' style='display:none'></div>");$(".dlepopupnewsedit").html("");$("#dlepopup-news-edit").dialog({autoOpen:!0,width:"800",height:500,buttons:f,resizable:!1,dialogClass:"modalfixed dle-popup-quickedit",
dragStart:function(a,c){d=$(".modalfixed").css("box-shadow");$(".modalfixed").css("box-shadow","none")},dragStop:function(a,c){$(".modalfixed").css("box-shadow",d)},close:function(a,c){$(this).dialog("destroy");$("#modal-overlay").fadeOut(function(){$("#modal-overlay").remove()})}});830<$(window).width()&&530<$(window).height()&&($(".modalfixed.ui-dialog").css({position:"fixed"}),$("#dlepopup-news-edit").dialog("option","position",["0","0"]));$("#dlepopup-news-edit").html(c)},"html");return!1}
function ajax_comm_edit(a,b){for(var c=0,d=c_cache.length;c<d;c++)c in c_cache&&""!=c_cache[c]&&ajax_cancel_comm_edit(c);c_cache[a]&&""!=c_cache[a]||(c_cache[a]=$("#comm-id-"+a).html());ShowLoading("");$.get(dle_root+"engine/ajax/editcomments.php",{id:a,area:b,action:"edit"},function(c){HideLoading("");$("#comm-id-"+a).html(c);setTimeout(function(){$("html,body").stop().animate({scrollTop:$("#comm-id-"+a).offset().top-70},700)},100)},"html");return!1}
function ajax_cancel_comm_edit(a){""!=c_cache[a]&&$("#comm-id-"+a).html(c_cache[a]);c_cache[a]="";return!1}function ajax_save_comm_edit(a,b){"1"==dle_wysiwyg&&submit_all_data();"2"==dle_wysiwyg&&tinyMCE.triggerSave();var c=$("#dleeditcomments"+a).val();ShowLoading("");$.post(dle_root+"engine/ajax/editcomments.php",{id:a,comm_txt:c,area:b,action:"save"},function(c){HideLoading("");c_cache[a]="";$("#comm-id-"+a).html(c)});return!1}
function DeleteComments(a,b){DLEconfirm(dle_del_agree,dle_confirm,function(){ShowLoading("");$.get(dle_root+"engine/ajax/deletecomments.php",{id:a,dle_allow_hash:b},function(a){HideLoading("");a=parseInt(a);if(!isNaN(a)){var b="1"==dle_tree_comm?$("#comments-tree-item-"+a):$("#comment-id-"+a);$("html,body").stop().animate({scrollTop:b.offset().top-70},700);setTimeout(function(){b.hide("blind",{},1400)},700)}})})}
function MarkSpam(a,b){DLEconfirm(dle_spam_agree,dle_confirm,function(){ShowLoading("");$.get(dle_root+"engine/ajax/adminfunction.php",{id:a,action:"commentsspam",user_hash:b},function(a){HideLoading("");"error"!=a&&DLEconfirm(a,dle_confirm,function(){location.reload(!0)})})})}function doFavorites(a,b,c){ShowLoading("");$.get(dle_root+"engine/ajax/favorites.php",{fav_id:a,action:b,skin:dle_skin,alert:c},function(b){HideLoading("");c?DLEalert(b,dle_info):$("#fav-id-"+a).html(b)});return!1}
function CheckLogin(){var a=document.getElementById("name").value;ShowLoading("");$.post(dle_root+"engine/ajax/registration.php",{name:a},function(a){HideLoading("");$("#result-registration").html(a)});return!1}
function doCalendar(a,b,c){ShowLoading("");$.get(dle_root+"engine/ajax/calendar.php",{month:a,year:b},function(a){HideLoading("");"left"==c?$("#calendar-layer").hide("slide",{direction:"left"},500,function(){$("#calendar-layer").html(a).show("slide",{direction:"right"},500)}):$("#calendar-layer").hide("slide",{direction:"right"},500,function(){$("#calendar-layer").html(a).show("slide",{direction:"left"},500)})})}
function doRate(a,b){ShowLoading("");$.get(dle_root+"engine/ajax/rating.php",{go_rate:a,news_id:b,skin:dle_skin},function(a){HideLoading("");if(a.success){var d=a.rating,d=d.replace(/&lt;/g,"<"),d=d.replace(/&gt;/g,">"),d=d.replace(/&amp;/g,"&");$("#ratig-layer-"+b).html(d);$("#vote-num-id-"+b).html(a.votenum)}else a.error&&DLEalert(a.errorinfo,dle_info)},"json")}
function doCommentsRate(a,b){ShowLoading("");$.get(dle_root+"engine/ajax/ratingcomments.php",{go_rate:a,c_id:b,skin:dle_skin},function(a){HideLoading("");if(a.success){var d=a.rating,d=d.replace(/&lt;/g,"<"),d=d.replace(/&gt;/g,">"),d=d.replace(/&amp;/g,"&");$("#comments-ratig-layer-"+b).html(d);$("#comments-vote-num-id-"+b).html(a.votenum)}else a.error&&DLEalert(a.errorinfo,dle_info)},"json")}function ajax_cancel_reply(){$("#dlefastreplycomments").hide("blind",{},1400)}
function ajax_fast_reply(a,b){var c=$("#comments"+a).val(),d=$("#name"+a).val(),e=$("#question_answer"+a).val(),g=$("#sec_code"+a).val(),f=$("#recaptcha"+a).val(),h=$("#subscribe"+a+":checked").val(),k=$("#postid"+a).val();if(""==d||""==c)return DLEalert(dle_req_field,dle_info),!1;f=f?grecaptcha.getResponse(recaptcha_widget):"";h||(h=0);g||(g="");e||(e="");ShowLoading("");$.post(dle_root+"engine/ajax/addcomments.php",{post_id:k,parent:a,indent:b,comments:c,name:d,mail:"",editor_mode:"",skin:dle_skin,
sec_code:g,question_answer:e,g_recaptcha_response:f,allow_subscribe:h},function(b){HideLoading("");$("#blind-animation"+a).remove();$("#dlefastreplyesponse").html(b);"error"!=b&&document.getElementById("blind-animation"+a)&&($("html,body").stop().animate({scrollTop:$("#dlefastreplyesponse").offset().top-70},1100),setTimeout(function(){$("#blind-animation"+a).show("blind",{},1500);$("#dlefastreplycomments").hide("blind",{},1500)},1100))},"html");return!1}
function dle_reply(a,b,c){var d={};$("#dlereplypopup").remove();"1"==c&&($("#dlefastreplycomments").remove(),$("#dlefastreplyesponse").remove());d[dle_act_lang[3]]=function(){$(this).dialog("close")};d[dle_p_send]=function(){if("1"==dle_wysiwyg||"2"==dle_wysiwyg){"1"==dle_wysiwyg?submit_all_data():tinyMCE.triggerSave();var c="wysiwyg"}else c="";var d=$("#comments"+a).val(),f=$("#name"+a).val(),h=$("#mail"+a).val(),k=$("#question_answer"+a).val(),l=$("#sec_code"+a).val(),m=$("#recaptcha"+a).val(),
n=$("#subscribe"+a+":checked").val(),p=$("#postid"+a).val();if(""==f||""==d)return DLEalert(dle_req_field,dle_info),!1;m=m?grecaptcha.getResponse(recaptcha_widget):"";n||(n=0);l||(l="");k||(k="");ShowLoading("");$.post(dle_root+"engine/ajax/addcomments.php",{post_id:p,parent:a,indent:b,comments:d,name:f,mail:h,editor_mode:c,skin:dle_skin,sec_code:l,question_answer:k,g_recaptcha_response:m,allow_subscribe:n},function(b){HideLoading("");$("#blind-animation"+a).remove();$("#comments-tree-item-"+a).append(b);
"error"!=b&&document.getElementById("blind-animation"+a)&&($("#dlereplypopup").remove(),$("html,body").stop().animate({scrollTop:$("#comments-tree-item-"+a).offset().top+$("#comments-tree-item-"+a).height()-70},1100),setTimeout(function(){$("#blind-animation"+a).show("blind",{},1500)},1100))},"html");return!1};ShowLoading("");$.get(dle_root+"engine/ajax/replycomments.php",{id:a,indent:b,skin:dle_skin},function(b){HideLoading("");"1"==c?($("#comment-id-"+a).append("<div id='dlefastreplyesponse'></div><div id='dlefastreplycomments' style='display:none'></div>"),
$("#dlefastreplycomments").html(b),$("html,body").stop().animate({scrollTop:$("#comment-id-"+a).offset().top+$("#comment-id-"+a).height()-70},1100),setTimeout(function(){$("#dlefastreplycomments").show("blind",{},1500)},1100)):($("body").append("<div id='dlereplypopup' title='"+dle_reply_title+"' style='display:none'></div>"),$("#dlereplypopup").html(b),$("#dlereplypopup").dialog({autoOpen:!0,width:600,resizable:!1,dialogClass:"modalfixed dle-popup-replycomments",buttons:d}),$(".modalfixed.ui-dialog").css({position:"fixed"}),
$("#dlereplypopup").dialog("option","position",["0","0"]))},"html");return!1}
function doAddComments(){var a=document.getElementById("dle-comments-form");if("1"==dle_wysiwyg||"2"==dle_wysiwyg){"1"==dle_wysiwyg?submit_all_data():tinyMCE.triggerSave();var b="wysiwyg"}else b="";if(""==a.comments.value||""==a.name.value)return DLEalert(dle_req_field,dle_info),!1;var c=a.question_answer?a.question_answer.value:"",d=a.sec_code?a.sec_code.value:"",e="undefined"!=typeof grecaptcha?grecaptcha.getResponse():"",g=a.allow_subscribe?1==a.allow_subscribe.checked?"1":"0":"0",f=a.mail?a.mail.value:
"";ShowLoading("");$.post(dle_root+"engine/ajax/addcomments.php",{post_id:a.post_id.value,comments:a.comments.value,name:a.name.value,mail:f,editor_mode:b,skin:dle_skin,sec_code:d,question_answer:c,g_recaptcha_response:e,allow_subscribe:g},function(b){a.sec_code&&(a.sec_code.value="",reload());HideLoading("");$("#dle-ajax-comments").html(b);"error"!=b&&document.getElementById("blind-animation")&&($("html,body").stop().animate({scrollTop:$("#dle-ajax-comments").offset().top-70},1100),setTimeout(function(){$("#blind-animation").show("blind",
{},1500)},1100))},"html");return!1}function isHistoryApiAvailable(){return!(!window.history||!history.pushState)}
function CommentsPage(a,b,c){ShowLoading("");$.get(dle_root+"engine/ajax/comments.php",{cstart:a,news_id:b,skin:dle_skin},function(d){HideLoading("");isNaN(a)||isNaN(b)||($("#dle-comm-link").unbind("click"),$("#dle-comm-link").bind("click",function(){CommentsPage(a,b);return!1}));scroll(0,$("#dle-comments-list").offset().top-70);$("#dle-comments-list").html(d.comments);$(".dle-comments-navigation").html(d.navigation);isHistoryApiAvailable()&&window.history.pushState(null,null,c)},"json");return!1}
function dle_copy_quote(a){dle_txt="";window.getSelection?dle_txt=window.getSelection():document.selection&&(dle_txt=document.selection.createRange().text);""!=dle_txt&&(dle_txt="[quote="+a+"]"+dle_txt+"[/quote]")}
function dle_fastreply(a){if(!document.getElementById("dle-comments-form"))return!1;var b=document.getElementById("dle-comments-form").comments,c="";"0"==dle_wysiwyg||"-1"==dle_wysiwyg?(b.value="0"==dle_wysiwyg?b.value+("[b]"+a+"[/b],\n"):b.value+(a+",\n"),b.focus()):(c="<b>"+a+"</b>,<br />","1"==dle_wysiwyg?(oUtil.obj.focus(),oUtil.obj.insertHTML(c)):tinyMCE.execCommand("mceInsertContent",!1,c));setTimeout(function(){$("html,body").stop().animate({scrollTop:$("#dle-comments-form").offset().top-70},
700)},100);return!1}
function dle_ins(a){if(!document.getElementById("dle-comments-form"))return!1;var b=document.getElementById("dle-comments-form").comments,c="";""!=dle_txt?("0"==dle_wysiwyg||"-1"==dle_wysiwyg?(b.value+=dle_txt+"\n",b.focus()):(c=dle_txt+"<br />","1"==dle_wysiwyg?(oUtil.obj.focus(),oUtil.obj.insertHTML(c)):tinyMCE.execCommand("mceInsertContent",!1,c)),setTimeout(function(){$("html,body").stop().animate({scrollTop:$("#dle-comments-form").offset().top-70},700)},100)):(ShowLoading(""),$.get(dle_root+
"engine/ajax/quote.php",{id:a},function(a){HideLoading("");"0"==dle_wysiwyg||"-1"==dle_wysiwyg?(b.value+=a+"\n",b.focus()):(c=a+"<br />","1"==dle_wysiwyg?(oUtil.obj.focus(),oUtil.obj.insertHTML(c)):tinyMCE.execCommand("mceInsertContent",!1,c));setTimeout(function(){$("html,body").stop().animate({scrollTop:$("#dle-comments-form").offset().top-70},700)},100)}));return!1}
function ShowOrHide(a){var b=$("#"+a);a=document.getElementById("image-"+a)?document.getElementById("image-"+a):null;var c=b.height()/200*1E3;3E3<c&&(c=3E3);250>c&&(c=250);"none"==b.css("display")?(b.show("blind",{},c),a&&(a.src=dle_root+"templates/"+dle_skin+"/dleimages/spoiler-minus.gif")):(2E3<c&&(c=2E3),b.hide("blind",{},c),a&&(a.src=dle_root+"templates/"+dle_skin+"/dleimages/spoiler-plus.gif"))}
function ckeck_uncheck_all(){for(var a=document.pmlist,b=0;b<a.elements.length;b++){var c=a.elements[b];"checkbox"==c.type&&(c.checked=1==a.master_box.checked?!1:!0)}a.master_box.checked=1==a.master_box.checked?!1:!0}function confirmDelete(a){DLEconfirm(dle_del_agree,dle_confirm,function(){document.location=a})}function setNewField(a,b){a!=selField&&(fombj=b,selField=a)}
function dle_news_delete(a){var b={};b[dle_act_lang[1]]=function(){$(this).dialog("close")};allow_dle_delete_news&&(b[dle_del_msg]=function(){$(this).dialog("close");var b={};b[dle_act_lang[3]]=function(){$(this).dialog("close")};b[dle_p_send]=function(){if(1>$("#dle-promt-text").val().length)$("#dle-promt-text").addClass("ui-state-error");else{var b=$("#dle-promt-text").val();$(this).dialog("close");$("#dlepopup").remove();$.post(dle_root+"engine/ajax/message.php",{id:a,text:b},function(b){"ok"==
b?document.location=dle_root+"index.php?do=deletenews&id="+a+"&hash="+dle_login_hash:DLEalert("Send Error",dle_info)})}};$("#dlepopup").remove();$("body").append("<div id='dlepopup' class='dle-promt' title='"+dle_notice+"' style='display:none'>"+dle_p_text+"<br /><br /><textarea name='dle-promt-text' id='dle-promt-text' class='ui-widget-content ui-corner-all' style='width:97%;height:100px; padding: .4em;'></textarea></div>");$("#dlepopup").dialog({autoOpen:!0,width:500,resizable:!1,dialogClass:"modalfixed dle-popup-newsdelete",
buttons:b});$(".modalfixed.ui-dialog").css({position:"fixed"});$("#dlepopup").dialog("option","position",["0","0"])});b[dle_act_lang[0]]=function(){$(this).dialog("close");document.location=dle_root+"index.php?do=deletenews&id="+a+"&hash="+dle_login_hash};$("#dlepopup").remove();$("body").append("<div id='dlepopup' class='dle-promt' title='"+dle_confirm+"' style='display:none'><div id='dlepopupmessage'>"+dle_del_agree+"</div></div>");$("#dlepopup").dialog({autoOpen:!0,width:500,resizable:!1,dialogClass:"modalfixed dle-popup-newsdelete",
buttons:b});$(".modalfixed.ui-dialog").css({position:"fixed"});$("#dlepopup").dialog("option","position",["0","0"])}
function MenuNewsBuild(a,b){var c=[];c[0]="<a onclick=\"ajax_prep_for_edit('"+a+"', '"+b+'\'); return false;" href="#">'+menu_short+"</a>";""!=dle_admin&&(c[1]='<a href="'+dle_root+dle_admin+"?mod=editnews&action=editnews&id="+a+'" target="_blank">'+menu_full+"</a>");allow_dle_delete_news&&(c[2]="<a onclick=\"sendNotice ('"+a+'\'); return false;" href="#">'+dle_notice+"</a>",c[3]="<a onclick=\"dle_news_delete ('"+a+'\'); return false;" href="#">'+dle_del_news+"</a>");return c}
function sendNotice(a){var b={};b[dle_act_lang[3]]=function(){$(this).dialog("close")};b[dle_p_send]=function(){if(1>$("#dle-promt-text").val().length)$("#dle-promt-text").addClass("ui-state-error");else{var b=$("#dle-promt-text").val();$(this).dialog("close");$("#dlepopup").remove();$.post(dle_root+"engine/ajax/message.php",{id:a,text:b,allowdelete:"no"},function(a){"ok"==a&&DLEalert(dle_p_send_ok,dle_info)})}};$("#dlepopup").remove();$("body").append("<div id='dlepopup' title='"+dle_notice+"' style='display:none'><br />"+
dle_p_text+"<br /><br /><textarea name='dle-promt-text' id='dle-promt-text' class='ui-widget-content ui-corner-all' style='width:97%;height:100px; padding: .4em;'></textarea></div>");$("#dlepopup").dialog({autoOpen:!0,width:500,resizable:!1,dialogClass:"modalfixed dle-popup-sendmessage",buttons:b});$(".modalfixed.ui-dialog").css({position:"fixed"});$("#dlepopup").dialog("option","position",["0","0"])}
function AddComplaint(a,b){var c={};c[dle_act_lang[3]]=function(){$(this).dialog("close")};c[dle_p_send]=function(){if(1>$("#dle-promt-text").val().length)$("#dle-promt-text").addClass("ui-state-error");else{var c=$("#dle-promt-text").val();$(this).dialog("close");$("#dlepopup").remove();$.post(dle_root+"engine/ajax/complaint.php",{id:a,text:c,action:b},function(a){"ok"==a?DLEalert(dle_p_send_ok,dle_info):DLEalert(a,dle_info)})}};$("#dlepopup").remove();$("body").append("<div id='dlepopup' title='"+
dle_complaint+"' style='display:none'><br /><textarea name='dle-promt-text' id='dle-promt-text' class='ui-widget-content ui-corner-all' style='width:97%;height:100px; padding: .4em;'></textarea></div>");$("#dlepopup").dialog({autoOpen:!0,width:500,resizable:!1,dialogClass:"modalfixed dle-popup-complaint",buttons:c});$(".modalfixed.ui-dialog").css({position:"fixed"});$("#dlepopup").dialog("option","position",["0","0"])}
function DLEalert(a,b){$("#dlepopup").remove();$("body").append("<div id='dlepopup' class='dle-alert' title='"+b+"' style='display:none'>"+a+"</div>");$("#dlepopup").dialog({autoOpen:!0,width:470,resizable:!1,dialogClass:"modalfixed dle-popup-alert",buttons:{Ok:function(){$(this).dialog("close");$("#dlepopup").remove()}}});$(".modalfixed.ui-dialog").css({position:"fixed"});$("#dlepopup").dialog("option","position",["0","0"])}
function DLEconfirm(a,b,c){var d={};d[dle_act_lang[1]]=function(){$(this).dialog("close");$("#dlepopup").remove()};d[dle_act_lang[0]]=function(){$(this).dialog("close");$("#dlepopup").remove();c&&c()};$("#dlepopup").remove();$("body").append("<div id='dlepopup' class='dle-confirm' title='"+b+"' style='display:none'>"+a+"</div>");$("#dlepopup").dialog({autoOpen:!0,width:500,resizable:!1,dialogClass:"modalfixed dle-popup-confirm",buttons:d});$(".modalfixed.ui-dialog").css({position:"fixed"});$("#dlepopup").dialog("option",
"position",["0","0"])}
function DLEprompt(a,b,c,d,e){var g={};g[dle_act_lang[3]]=function(){$(this).dialog("close")};g[dle_act_lang[2]]=function(){if(!e&&1>$("#dle-promt-text").val().length)$("#dle-promt-text").addClass("ui-state-error");else{var a=$("#dle-promt-text").val();$(this).dialog("close");$("#dlepopup").remove();d&&d(a)}};$("#dlepopup").remove();$("body").append("<div id='dlepopup' class='dle-promt' title='"+c+"' style='display:none'>"+a+"<br /><br /><input type='text' name='dle-promt-text' id='dle-promt-text' class='ui-widget-content ui-corner-all' style='width:97%; padding: .4em;' value='"+b+
"'/></div>");$("#dlepopup").dialog({autoOpen:!0,width:500,resizable:!1,dialogClass:"modalfixed dle-popup-promt",buttons:g});$(".modalfixed.ui-dialog").css({position:"fixed"});$("#dlepopup").dialog("option","position",["0","0"]);0<b.length?$("#dle-promt-text").select().focus():$("#dle-promt-text").focus()}var dle_user_profile="",dle_user_profile_link="";
function ShowPopupProfile(a,b){var c={};c[menu_profile]=function(){document.location=dle_user_profile_link};5!=dle_group&&(c[menu_send]=function(){document.location=dle_root+"index.php?do=pm&doaction=newpm&username="+dle_user_profile});1==b&&(c[menu_uedit]=function(){$(this).dialog("close");var a={};$("body").append('<div id="modal-overlay" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: #666666; opacity: .40;filter:Alpha(Opacity=40); z-index: 999; display:none;"></div>');
$("#modal-overlay").css({filter:"alpha(opacity=40)"}).fadeIn("slow");$("#dleuserpopup").remove();$("body").append("<div id='dleuserpopup' title='"+menu_uedit+"' style='display:none'></div>");a[dle_act_lang[3]]=function(){$(this).dialog("close");$("#dleuserpopup").remove()};a[dle_act_lang[5]]=function(){window.frames.edituserframe.confirmDelete(dle_login_hash)};a[dle_act_lang[4]]=function(){document.getElementById("edituserframe").contentWindow.document.getElementById("saveuserform").submit()};$("#dleuserpopup").dialog({autoOpen:!0,
show:"fade",width:560,resizable:!1,dialogClass:"modalfixed dle-popup-userprofileadmin",buttons:a,open:function(a,b){$("#dleuserpopup").html("<iframe name='edituserframe' id='edituserframe' width='100%' height='400' src='"+dle_root+dle_admin+"?mod=editusers&action=edituser&user="+dle_user_profile+"&skin="+dle_skin+"' frameborder='0' marginwidth='0' marginheight='0' allowtransparency='true'></iframe>")},beforeClose:function(a,b){$("#dleuserpopup").html("")},close:function(a,b){$("#modal-overlay").fadeOut("slow",
function(){$("#modal-overlay").remove()})}});830<$(window).width()&&530<$(window).height()&&($(".modalfixed.ui-dialog").css({position:"fixed"}),$("#dleuserpopup").dialog("option","position",["0","0"]))});$("#dleprofilepopup").remove();$("body").append(a);$("#dleprofilepopup").dialog({autoOpen:!0,show:"fade",hide:"fade",resizable:!1,dialogClass:"dle-popup-userprofile",buttons:c,width:500});return!1}
function ShowProfile(a,b,c){if(dle_user_profile==a&&document.getElementById("dleprofilepopup"))return $("#dleprofilepopup").dialog("open"),!1;dle_user_profile=a;dle_user_profile_link=b;ShowLoading("");$.get(dle_root+"engine/ajax/profile.php",{name:a,skin:dle_skin},function(a){HideLoading("");ShowPopupProfile(a,c)});return!1}
function FastSearch(){$("#story").attr("autocomplete","off");$("#story").blur(function(){$("#searchsuggestions").fadeOut()});$("#story").keyup(function(){var a=$(this).val();0==a.length?$("#searchsuggestions").fadeOut():dle_search_value!=a&&3<a.length&&(clearInterval(dle_search_delay),dle_search_delay=setInterval(function(){dle_do_search(a)},600))})}
function dle_do_search(a){clearInterval(dle_search_delay);$("#searchsuggestions").remove();$("body").append("<div id='searchsuggestions' style='display:none'></div>");$.post(dle_root+"engine/ajax/search.php",{query:""+a+""},function(a){$("#searchsuggestions").html(a).fadeIn().css({position:"absolute",top:0,left:0}).position({my:"left top",at:"left bottom",of:"#story",collision:"fit flip"})});dle_search_value=a}
function ShowLoading(a){$("#loading-layer").remove();$("body").append("<div id='loading-layer' style='display:none'></div>");a?$("#loading-layer").html(a):$("#loading-layer").html(dle_act_lang[6]);a=($(window).width()-$("#loading-layer").width())/2;var b=($(window).height()-$("#loading-layer").height())/2;$("#loading-layer").css({left:a+"px",top:b+"px",position:"fixed",zIndex:"99"});$("#loading-layer").fadeTo("slow",.6)}
function HideLoading(a){$("#loading-layer").fadeOut("slow",function(){$("#loading-layer").remove()})}
function ShowAllVotes(){if(document.getElementById("dlevotespopup"))return $("#dlevotespopup").dialog("open"),!1;$.ajaxSetup({cache:!1});ShowLoading("");$.get(dle_root+"engine/ajax/allvotes.php?dle_skin="+dle_skin,function(a){HideLoading("");$("#dlevotespopup").remove();$("body").append(a);$(".dlevotebutton").button();$("#dlevotespopup").dialog({autoOpen:!0,show:"fade",hide:"fade",resizable:!1,dialogClass:"dle-popup-allvotes",width:600});400<$("#dlevotespopupcontent").height()&&$("#dlevotespopupcontent").height(400);
$("#dlevotespopup").dialog("option","height",$("#dlevotespopupcontent").height()+60);$("#dlevotespopup").dialog("option","position","center")});return!1}
function fast_vote(a){var b=$("#vote_"+a+" input:radio[name=vote_check]:checked").val();ShowLoading("");$.get(dle_root+"engine/ajax/vote.php",{vote_id:a,vote_action:"vote",vote_mode:"fast_vote",vote_check:b,vote_skin:dle_skin},function(b){HideLoading("");$("#dle-vote_list-"+a).fadeOut(500,function(){$(this).html(b);$(this).fadeIn(500)})});return!1}
function AddIgnorePM(a,b){DLEconfirm(b,dle_confirm,function(){ShowLoading("");$.get(dle_root+"engine/ajax/pm.php",{id:a,action:"add_ignore",skin:dle_skin},function(a){HideLoading("");DLEalert(a,dle_info);return!1})})}function DelIgnorePM(a,b){DLEconfirm(b,dle_confirm,function(){ShowLoading("");$.get(dle_root+"engine/ajax/pm.php",{id:a,action:"del_ignore",skin:dle_skin},function(b){HideLoading("");$("#dle-ignore-list-"+a).html("");DLEalert(b,dle_info);return!1})})}
function media_upload(a,b,c,d){var e=(new Date).getTime(),g="none";$("#mediaupload").remove();$("body").append("<div id='mediaupload' title='"+text_upload+"' style='display:none'></div>");$("#mediaupload").dialog({autoOpen:!0,width:710,resizable:!1,dialogClass:"modalfixed dle-popup-upload",open:function(f,g){$("#mediaupload").html("<iframe name='mediauploadframe' id='mediauploadframe' width='100%' height='550' src='"+dle_root+"engine/ajax/upload.php?area="+a+"&author="+b+"&news_id="+c+"&wysiwyg="+
d+"&skin="+dle_skin+"&rndval="+e+"' frameborder='0' marginwidth='0' marginheight='0' allowtransparency='true'></iframe>");$(".ui-dialog").draggable("option","containment","")},dragStart:function(a,b){g=$(".modalfixed").css("box-shadow");$(".modalfixed").fadeTo(0,.6).css("box-shadow","none");$("#mediaupload").css("visibility","hidden")},dragStop:function(a,b){$(".modalfixed").fadeTo(0,1).css("box-shadow",g);$("#mediaupload").css("visibility","visible")},beforeClose:function(a,b){$("#mediaupload").html("")}});
830<$(window).width()&&530<$(window).height()&&($(".modalfixed.ui-dialog").css({position:"fixed"}),$("#mediaupload").dialog("option","position",["0","0"]));return!1}
function dropdownmenu(a,b,c,d){window.event?event.cancelBubble=!0:b.stopPropagation&&b.stopPropagation();b=$("#dropmenudiv");if(b.is(":visible"))return clearhidemenu(),b.fadeOut("fast"),!1;b.remove();$("body").append('<div id="dropmenudiv" style="display:none;position:absolute;z-index:100;width:165px;"></div>');b=$("#dropmenudiv");b.html(c.join(""));d&&b.width(d);c=$(document).width()-30;d=$(a).offset();c-d.left<b.width()&&(d.left-=b.width()-$(a).width());b.css({left:d.left+"px",top:d.top+$(a).height()+
"px"});b.fadeTo("fast",.9);b.mouseenter(function(){clearhidemenu()}).mouseleave(function(){delayhidemenu()});$(document).one("click",function(){hidemenu()});return!1}function hidemenu(a){$("#dropmenudiv").fadeOut("fast")}function delayhidemenu(){delayhide=setTimeout("hidemenu()",1E3)}function clearhidemenu(){"undefined"!=typeof delayhide&&clearTimeout(delayhide)}
jQuery(function(a){a(document).keydown(function(b){if(13==b.which&&b.ctrlKey){if(window.getSelection)var c=window.getSelection();else document.getSelection?c=document.getSelection():document.selection&&(c=document.selection.createRange().text);if(""==c)return!1;if(255<c.toString().length)return DLEalert(dle_big_text,dle_info),!1;b={};b[dle_act_lang[3]]=function(){a(this).dialog("close")};b[dle_p_send]=function(){if(1>a("#dle-promt-text").val().length)a("#dle-promt-text").addClass("ui-state-error");
else{var b=a("#dle-promt-text").val(),c=a("#orfom").text();a(this).dialog("close");a("#dlepopup").remove();a.post(dle_root+"engine/ajax/complaint.php",{seltext:c,text:b,action:"orfo",url:window.location.href},function(a){"ok"==a?DLEalert(dle_p_send_ok,dle_info):DLEalert(a,dle_info)})}};a("#dlepopup").remove();a("body").append("<div id='dlepopup' class='dle-promt' title='"+dle_orfo_title+"' style='display:none'><textarea name='dle-promt-text' id='dle-promt-text' class='ui-widget-content ui-corner-all' style='width:97%;height:80px; padding: .4em;'></textarea><div id='orfom' style='display:none'>"+
c+"</div></div>");a("#dlepopup").dialog({autoOpen:!0,width:600,resizable:!1,dialogClass:"modalfixed dle-popup-complaint",buttons:b});a(".modalfixed.ui-dialog").css({position:"fixed"});a("#dlepopup").dialog("option","position",["0","0"])}})});