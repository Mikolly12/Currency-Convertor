const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const res = document.querySelector(".msg");

window.addEventListener("load", ()=>{
    updateExchange();
})


for(let select of dropdowns)
{
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;

        if(select.name == "from" && currCode == "USD")
        {
            newOption.selected = "selected";
        }
        if(select.name == "to" && currCode == "INR")
        {
            newOption.selected = "selected";
        }

        select.append(newOption);
    }

    select.addEventListener("change", (evt)=>{
        updateFlg(evt.target);
    })
    
}


const updateFlg = (event)=>{
    let currCode = event.value;
    let countCode = countryList[currCode];
    let srcCode = `https://flagsapi.com/${countCode}/flat/64.png`
    let img = event.parentElement.querySelector("img");
    img.src = srcCode;
}


btn.addEventListener("click", (evt)=>{

    evt.preventDefault();
    updateExchange();
    
})

const updateExchange = async()=>{
    let inpV = document.querySelector(".amount input");
    
    let amtVal = inpV.value;
    //console.log(amtVal); 

    if(amtVal == 0 || amtVal<0)
    {
        amtVal =1;
        inpV.value = "1";
    }

    const url = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    //console.log(fromCurr.value, toCurr.value);

    let response = await fetch(url);
    //console.log(response);
    let data = await response.json();
    let val = data[toCurr.value.toLowerCase()];
    //console.log(toCurr.value.toLowerCase()," : ",val);

    let cal = amtVal*val;
    console.log(cal);

    res.innerText = `${amtVal} ${fromCurr.value} = ${cal} ${toCurr.value}`;
}