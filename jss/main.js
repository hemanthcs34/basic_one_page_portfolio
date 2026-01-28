const themeToggle = document.querySelector("#theme-toggle");
console.log(themeToggle);
const htmlElement = document.documentElement;
themeToggle.addEventListener('click', ()=>{
    const newTheme =  themeToggle.checked?'dark':'light';
    htmlElement.setAttribute('data-theme',newTheme);
    localStorage.setItem('theme', newTheme);
});

(()=>{
   const savedTheme = localStorage.getItem('theme');

   if(savedTheme){

    htmlElement.setAttribute('data-theme', savedTheme);

   }

   if(savedTheme === 'dark'){
    themeToggle.checked = true;
   }
})();
