/**
 * Параметры виджета :
 * {
 *      Domain - определяет URL через который будет проводиться транзакция;
 *      Key - имя терминала;
 *      Amount - сумма транзакции;
 *      Product - наименование товара;
 *      CustomParams - { Key : "Value" } - дополнительные параметры;
 *      ChequeParams - параметры для генерации чека по ФЗ-54;
 *          {
 *              Message : "Чек Payture", заголовок сообщения
 *              CheckClose : { TaxationSystem : 0 } информация о системе налогообложения
 *              Positions : [ 
 *                  {
 *                      Quantity : 1.00, количество
 *                      Price : 12.00, цена за 1 товара
 *                      Tax : 3, налог
 *                      Text : "Product", наименование позиции
 *                  } 
 *              ]
 *          },
 * 
 *      OnTransactionCompleted - function (вызывается при завершении транзакции перед закрытием виджета)
 * }
 * 
 * Метод GetTransactionSuccess() вернет состояние успешности завершения транзакции (undefined - при инициализации, true/false - при завершении)
 * 
 * Поле CustomerContact в данном случае остается пустым и заполняется покупателем при совершении оплаты.
 * Важно, чтобы сумма, вычисленная по позициям в чеке, совпадала с общей суммой транзакции ( иначе чек не будет отправлен )
 * Домены : 1 - https://secure.payture.com (по умолчанию)
 *          2 - https://sandbox.payture.com
 *          3 - http://dev.payture.com:8095
 */
function PaytureWidget(e){var t,i,n,a,r,o,d,s={Domain:"2",Key:"",Amount:0,Product:"",CustomParams:void 0,ChequeParams:void 0},l=this,u="viewport-widget-device-width",c=!0,p=!1,m=void 0;function y(){v(!1),t&&(t.style.display="none",t.style.opacity=0),i&&(i.style.visibility="hidden"),a&&(a.style.visibility="visible"),r&&(r.style.visibility="hidden"),document.body.removeChild(t),window.onmessage=null;var e=document.getElementById(u);e&&(document.head.removeChild(e),f("viewport-scalable","user-scalable=yes"))}function f(e,t){var i=document.createElement("meta");i.setAttribute("id",e),i.setAttribute("name","viewport"),i.setAttribute("content",t),document.head.appendChild(i)}function v(e){var t=e?-1040:0,i=setInterval(function(){e&&t>=0?clearInterval(i):!e&&t<=-1e3?clearInterval(i):(t=e?t+80:t-80,o.setAttribute("style","margin-top:"+t+"px"))},1)}this.GetTransactionSuccess=function(){return m},this.OnTransactionCompleted=function(e){t.addEventListener("transactionCompleted",function(i){e(),t.removeEventListener("transactionCompleted",e)},!1)},d=navigator.userAgent.match(/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i),function(){(t=document.createElement("div")).setAttribute("id","payture-widget-wrapper");var e=document.createElement("div");e.setAttribute("id","payture-widget-shadow");var s=document.createElement("div");s.setAttribute("id","payture-widget-layout"),t.appendChild(e),t.appendChild(s),(a=document.createElement("div")).setAttribute("id","payture-widget-loader");var l=document.createElement("img");l.setAttribute("src","https://merchantgateway.payture.com/sources_export/img/loader.gif"),a.appendChild(l),(o=document.createElement("div")).setAttribute("id","payture-widget-iframe-wrapper"),o.setAttribute("style","margin-top: -100000px"),(r=document.createElement("div")).setAttribute("id","payture-widget-close"),(n=document.createElement("input")).setAttribute("type","image"),n.setAttribute("id","payture-widget-close-button"),n.setAttribute("src","https://merchantgateway.payture.com/sources_export/img/close_button.png"),r.appendChild(n),(i=document.createElement("iframe")).setAttribute("id","payture-widget-iframe"),i.setAttribute("frameborder","0"),i.setAttribute("scrolling","yes"),i.setAttribute("allowfullscreen","true"),o.appendChild(r),o.appendChild(i),s.appendChild(a),s.appendChild(o),document.body.appendChild(t),d&&0==function(){function e(e,t,i){return e.hasAttribute(t)&&e.getAttribute(t)==i}for(var t=!1,i=document.getElementsByTagName("meta"),n=0;n<i.length;n++){var a=i[n];if(e(a,"name","viewport")&&e(a,"content","width=device-width, initial-scale=1")){t=!0;break}}return t}()&&f(u,"width=device-width, initial-scale=1, user-scalable=no")}(),function(e){l.Data={};for(field in e){var t=e[field];"string"!=typeof t&&"number"!=typeof t&&"object"!=typeof t||(l.Data[field]=t),"function"==typeof t&&l.hasOwnProperty(field)&&"function"==typeof l[field]&&l[field](t)}for(field in s)l.Data.hasOwnProperty(field)||(l.Data[field]=s[field])}(e),t&&(t.style.display="block",t.style.opacity=1),i&&(i.onload=function(){p||(a&&(a.style.visibility="hidden"),r&&(r.style.visibility="visible"),i&&(i.style.visibility="visible"),c&&v(!0)),c=!1}),n&&(n.onclick=function(){y()}),window&&(window.onmessage=function(e){if("CLOSE_PAYTURE_WIDGET_SUCCESS"==e.data||"CLOSE_PAYTURE_WIDGET_ERROR"==e.data){p=!0,"CLOSE_PAYTURE_WIDGET_SUCCESS"==e.data?m=!0:"CLOSE_PAYTURE_WIDGET_ERROR"==e.data&&(m=!1);var i=document.createEvent("Event");i.initEvent("transactionCompleted",!0,!1),t.dispatchEvent(i),setTimeout(y,1e3)}}),function(){var e="https://merchantgateway.payture.com/?";for(field in l.Data){var t=l.Data[field];"string"!=typeof t&&"number"!=typeof t&&"boolean"!=typeof t||(e+=field.toLowerCase()+"="+t+"&"),"object"==typeof t&&(t.hasOwnProperty("CustomerContact")||(e+='CustomerContact=""&'),t.hasOwnProperty("Message")||(e+='Message="Payture Cheque"&'),e+=field.toLowerCase()+"="+JSON.stringify(t)+"&")}i&&(i.src=e)}()}