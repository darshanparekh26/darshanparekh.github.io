
// Blog index loader
async function loadBlogList(){
  const el=document.getElementById('blog-list'); if(!el) return;
  const posts=await (await fetch('posts/posts.json')).json();
  el.innerHTML=posts.map(p=>`<li><a href="post.html?slug=${p.slug}">${p.title}</a> <span class='muted'>· ${p.date}</span></li>`).join('');
}
// Post loader (markdown lite)
function mdToHtml(md){
  md = md.replace(/```([\s\S]*?)```/g,(m,p)=>'<pre><code>'+p.replace(/[&<>]/g,s=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[s]))+'</code></pre>');
  md = md.replace(/^###\s?(.*)$/gm,'<h3>$1</h3>');
  md = md.replace/^##\s?(.*)$/gm,'<h2>$1</h2>');
  md = md.replace(/^#\s?(.*)$/gm,'<h1>$1</h1>');
  md = md.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>');
  md = md.replace(/\*(.*?)\*/g,'<em>$1</em>');
  md = md.replace(/\n\n/g,'</p><p>');
  return '<p>'+md+'</p>';
}
async function loadPost(){
  const root=document.getElementById('post-root'); if(!root) return;
  const slug=new URLSearchParams(location.search).get('slug');
  if(!slug){ root.innerHTML='<div class="error">No post specified.</div>'; return; }
  const md=await (await fetch('posts/'+slug+'.md')).text();
  root.innerHTML=mdToHtml(md);
}
// Contact form AJAX (Formspree)
async function initContact(){
  const form=document.querySelector('form[data-js="contact"]'); if(!form) return;
  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const data=new FormData(form);
    const res=await fetch(form.action,{method:'POST',body:data,headers:{'Accept':'application/json'}});
    document.getElementById('contact-status').innerHTML = res.ok ? '<div class="success">Thanks! I\'ll get back to you soon.</div>' : '<div class="error">Please try again later.</div>';
    if(res.ok) form.reset();
  });
}
window.addEventListener('DOMContentLoaded',()=>{loadBlogList();loadPost();initContact();});
