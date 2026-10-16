document.addEventListener('DOMContentLoaded',()=>{
  const id=new URLSearchParams(location.search).get('success');
  if(!id||!/^[A-Za-z0-9_-]{1,64}$/.test(id))return;
  const form=document.getElementById('checkoutForm');
  const success=document.getElementById('checkoutSuccess');
  const idEl=success?.querySelector('[data-order-id]');
  if(form)form.hidden=true;
  if(success)success.hidden=false;
  if(idEl)idEl.textContent=id;
});
