const themeChanger = document.querySelector('.theme-changer')
themeChanger.addEventListener('click', () => {
    let themeSelection = document.body.classList.toggle('dark')
    localStorage.setItem('uiTheme', themeSelection ? 'dark' : 'light')
})

 
function  checkUiTheme(){
    let theme = localStorage.getItem('uiTheme');
    if(theme === 'dark'){
        document.body.classList.add('dark')

    }
    console.log('cheking theme')
}
