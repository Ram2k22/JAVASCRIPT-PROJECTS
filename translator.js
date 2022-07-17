const selectTag = document.querySelectorAll("select");
const translateBtn = document.querySelector("button");
const inputText = document.querySelector(".from-text");
const outputText = document.querySelector(".to-text");
const exchange = document.querySelector(".exchange");
const icons = document.querySelectorAll(".icons i")

selectTag.forEach((sel,id) => {
    for(const country_code in countries){
        let selected;
        if(id==0 && country_code=="en-GB"){
            selected = "selected";
        }else if(id == 1 && country_code=="te-IN"){
            selected = "selected";
        }
        let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
        sel.insertAdjacentHTML("afterbegin",option);
    }
})

translateBtn.addEventListener('click',()=>{
    let text = inputText.value,
    fromLang = selectTag[0].value,
    toLang = selectTag[1].value,
    apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${fromLang}|${toLang}`;
    fetch(apiUrl).then(res => res.json()).then(data =>{
        outputText.value = data.responseData.translatedText;
    })
})

exchange.addEventListener("click",()=>{
    let tempLang = selectTag[0].value,
    tempText = inputText.value;
    selectTag[0].value=selectTag[1].value;
    selectTag[1].value=tempLang;
    inputText.value=outputText.value;
    outputText.value=tempText;

})

icons.forEach(icon => {
    icon.addEventListener("click", ({target})=> {
        if(target.classList.contains("fa-clipboard")){
            if(target.id=="from"){
                navigator.clipboard.writeText(inputText.value);
            }
            else{
                navigator.clipboard.writeText(outputText.value);
            }

        }
        else{
            let utterance;
            if(target.id=="from"){
                utterance = new SpeechSynthesisUtterance(inputText.value);
                utterance.lang=selectTag[0].value;
                speechSynthesis.speak(utterance);
            }else{
                utterance = new SpeechSynthesisUtterance(outputText.value);
                utterance.lang=selectTag[1].value;
                speechSynthesis.speak(utterance);
            }
            
        }
    })
})