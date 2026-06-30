// Копирование IP по клику
function copyIP(text){
  navigator.clipboard.writeText(text).then(()=>showToast('IP скопирован: ' + text));
}

function showToast(msg){
  let t = document.querySelector('.toast');
  if(!t){
    t = document.createElement('div');
    t.className = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(()=>t.classList.remove('show'), 2200);
}

document.addEventListener('click', e=>{
  const el = e.target.closest('[data-copy-ip]');
  if(el) copyIP(el.dataset.copyIp);
});

// Принудительное обновление картинки статуса (GameTracker banner),
// чтобы счётчик игроков и карта периодически "обновлялись" без бэкенда
function refreshStatusBanner(){
  document.querySelectorAll('.status-banner').forEach(img=>{
    const base = img.dataset.src;
    img.src = base + '?t=' + Date.now();
  });
}
document.addEventListener('DOMContentLoaded', ()=>{
  refreshStatusBanner();
  setInterval(refreshStatusBanner, 60000); // раз в минуту
});
