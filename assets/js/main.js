
(function(){
  const root = document.documentElement;
  const btn = document.getElementById('themeToggle');
  const pref = localStorage.getItem('theme');
  if(pref==='light') root.classList.add('light');
  btn && btn.addEventListener('click',()=>{
    root.classList.toggle('light');
    localStorage.setItem('theme', root.classList.contains('light') ? 'light' : 'dark');
  });
})();
