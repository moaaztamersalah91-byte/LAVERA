/* LAVÉRA security layer — loaded first on every page (classic script, no inline code needed).
 * Defense-in-depth against DOM XSS (OWASP A03): every HTML string assigned through
 * innerHTML / insertAdjacentHTML is parsed inertly and stripped of active content
 * (script/iframe/object/embed, on* handlers, javascript: URLs) before it reaches the live DOM.
 * Output encoding with escapeHtml() in app.js remains the primary control. */
(function(){
  'use strict';
  var BAD_TAGS='script,iframe,frame,frameset,object,embed,applet,base,meta,link,noscript,form[action],portal';
  var URL_ATTRS=['href','src','xlink:href','action','formaction','poster','srcset','data'];
  var nativeInner=Object.getOwnPropertyDescriptor(Element.prototype,'innerHTML');
  if(!nativeInner||!nativeInner.set)return;

  function badUrl(v,isImg){
    v=String(v).replace(/[\u0000- \u007f-\u009f]+/g,'').toLowerCase();
    if(/^(javascript|vbscript|livescript):/.test(v))return true;
    if(/^data:/.test(v)) return !(isImg&&/^data:image\/(png|jpe?g|webp|gif|avif);base64,/.test(v));
    return false;
  }
  function clean(html){
    html=String(html==null?'':html);
    if(html.indexOf('<')<0)return html;
    var t=document.createElement('template');
    nativeInner.set.call(t,html);
    var c=t.content;
    c.querySelectorAll(BAD_TAGS).forEach(function(n){n.remove();});
    c.querySelectorAll('*').forEach(function(el){
      Array.prototype.slice.call(el.attributes).forEach(function(a){
        var n=a.name.toLowerCase();
        if(n.indexOf('on')===0||n==='srcdoc'){el.removeAttribute(a.name);return;}
        if(URL_ATTRS.indexOf(n)>-1&&badUrl(a.value,el.tagName==='IMG'))el.removeAttribute(a.name);
        if(n==='style'&&/expression\s*\(|javascript:|url\s*\(\s*['"]?\s*(javascript|data:text)/i.test(a.value))el.removeAttribute(a.name);
      });
      if(el.tagName==='A'&&el.getAttribute('target')==='_blank')el.setAttribute('rel','noopener noreferrer');
    });
    return nativeInner.get.call(t);
  }
  Object.defineProperty(Element.prototype,'innerHTML',{
    configurable:true,enumerable:nativeInner.enumerable,get:nativeInner.get,
    set:function(v){nativeInner.set.call(this,clean(v));}
  });
  var nativeAdj=Element.prototype.insertAdjacentHTML;
  Element.prototype.insertAdjacentHTML=function(pos,html){return nativeAdj.call(this,pos,clean(html));};
  window.__laveraSanitize=clean;

  // Replaces former inline onclick="addToCart()" (CSP forbids inline handlers).
  document.addEventListener('click',function(e){
    var b=e.target&&e.target.closest&&e.target.closest('[data-add-product]');
    if(b&&typeof window.addToCart==='function'){e.preventDefault();window.addToCart();}
  });
})();
