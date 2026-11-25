'use strict';
const copyButton=document.getElementById('copy-citation');
const citation=document.getElementById('bibtex');
const copyStatus=document.getElementById('copy-status');
if(copyButton&&citation&&copyStatus){
  copyButton.hidden=false;
  copyButton.addEventListener('click',async()=>{
    try{
      if(!navigator.clipboard?.writeText)throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(citation.textContent.trim());
      copyStatus.textContent='BibTeX copied.';
    }catch{
      const selection=window.getSelection();
      const range=document.createRange();
      range.selectNodeContents(citation);
      selection.removeAllRanges();selection.addRange(range);
      copyStatus.textContent='Citation selected. Use your browser’s Copy command.';
    }
  });
}

const tabs=[...document.querySelectorAll('.stage-tabs [role="tab"]')];
const tabList=document.querySelector('.stage-tabs');
const panels=tabs.map(tab=>document.getElementById(tab.getAttribute('aria-controls')));
if(tabList&&tabs.length&&panels.every(Boolean)){
  const activate=index=>{
    tabs.forEach((tab,i)=>{tab.setAttribute('aria-selected',String(i===index));tab.tabIndex=i===index?0:-1;panels[i].hidden=i!==index;panels[i].setAttribute('role','tabpanel');panels[i].setAttribute('aria-labelledby',tab.id);});
  };
  tabList.hidden=false;activate(0);
  tabs.forEach((tab,i)=>{
    tab.addEventListener('click',()=>activate(i));
    tab.addEventListener('keydown',event=>{
      let next=i;
      if(event.key==='ArrowRight')next=(i+1)%tabs.length;
      else if(event.key==='ArrowLeft')next=(i+tabs.length-1)%tabs.length;
      else if(event.key==='Home')next=0;
      else if(event.key==='End')next=tabs.length-1;
      else return;
      event.preventDefault();activate(next);tabs[next].focus();
    });
  });
}
const figureDialog=document.getElementById('figure-dialog');
const zoomContent=document.getElementById('zoom-content');
const closeFigure=document.getElementById('close-figure');
if(figureDialog&&zoomContent&&closeFigure&&typeof figureDialog.showModal==='function'){
  let returnFocus=null;
  document.querySelectorAll('[data-enlarge]').forEach(button=>{
    const figure=document.getElementById(button.dataset.enlarge);if(!figure)return;
    button.hidden=false;
    button.addEventListener('click',()=>{
      returnFocus=button;const clone=figure.cloneNode(true);clone.removeAttribute('id');clone.querySelectorAll('[id]').forEach(e=>e.removeAttribute('id'));
      zoomContent.replaceChildren(clone);document.body.classList.add('figure-open');figureDialog.showModal();closeFigure.focus();
    });
  });
  closeFigure.addEventListener('click',()=>figureDialog.close());
  figureDialog.addEventListener('close',()=>{document.body.classList.remove('figure-open');zoomContent.replaceChildren();returnFocus?.focus();});
}
