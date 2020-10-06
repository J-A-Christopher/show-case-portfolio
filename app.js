class TypeWriter {
    constructor(txtElement,words,wait=3000) {
    this.txtElement=txtElement;
    this.words=words;
    this.txt='';
    this.wordIndex=0;
    this.wait=parseInt(wait,10);
    this.type();
    this.isDeleting=false
    }


    type() {
//current index of word
const current=this.wordIndex % this.words.length;

//Get full text of current word

const fullTxt=this.words[current];

//check if deleting
if (this.isDeleting) {
    //Remove a character
    this.txt=fullTxt.substring(0,this.txt.length -1)
} else {
  //Add a character

  this.txt=fullTxt.substring(0,this.txt.length +1)
}

//insert txt into element
this.txtElement.innerHTML=`<span class="txt">${this.txt}</span>`;

//Initial Type speed

let typeSpeed=300;

if (this.isDeleting) {
 typeSpeed/=2; //same as saying typespeed/2
} 

//if word is complete
if (!this.isDeleting && this.txt===fullTxt) {
    //Make pause at end
   typeSpeed=this.wait;
   //set deleting to true
   this.isDeleting=true;
} else if( this.isDeleting && this.txt==='') {
    this.isDeleting=false;
    //Move to the next word
    this.wordIndex++;
    //pause before start typing
    typeSpeed=500
}


    setTimeout(() => this.type(),typeSpeed)
    }
}



//Running it when the dom loads

document.addEventListener('DOMContentLoaded', init);

//init App

function init() {
    const txtElement=document.querySelector('.txt-type');
    const words=JSON.parse(txtElement.getAttribute('data-words'));
    const wait=txtElement.getAttribute('data-wait');

    //Initialising the type writer

    new TypeWriter(txtElement,words,wait);
}