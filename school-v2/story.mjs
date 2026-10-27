const original=document.querySelector('.original-details');
function reveal(){if(location.hash==='#story-original')original.open=true;}
document.querySelector('a[href="#story-original"]')?.addEventListener('click',()=>{original.open=true;});
addEventListener('hashchange',reveal);reveal();
