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
