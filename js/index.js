document.addEventListener("DOMContentLoaded", () => {
    let currencyDropdowns = document.querySelectorAll("select")
    let switcher = document.querySelector(".switch")
    let amount = document.querySelector("input[name='amount']")
    let form = document.querySelector("form");
    let results = document.querySelector(".results");
    let defaultCurrency = "USD";

    // fetch all possible usable currencies from API so as to populated the field onl;y with valid currencies
    fetch(`https://v6.exchangerate-api.com/v6/5f4ac2b2db62a913579d2dbc/latest/${defaultCurrency}`, {
        method: 'GET',
    })
    .then(res => {
            if (res.ok) {
                return res.json()
            } else {
                console.log("Initial currency fetch failed")
            }
        }
    ).then(data => populateCurrencies(data.conversion_rates))
     .catch(error => console.log(error))

    
    // on form submit fetch data from the API based on currency selected (to and from) and amount
    form.addEventListener("submit", e => {
        e.preventDefault();

        // wipe out screen of previous result
        results.innerHTML = "";

        let currencyFrom = currencyDropdowns[0].value
        let currencyTo = currencyDropdowns[1].value


        fetch(`https://v6.exchangerate-api.com/v6/5f4ac2b2db62a913579d2dbc/pair/${currencyFrom}/${currencyTo}/${amount.value}`, {
            method: 'GET',
        })
        .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    console.log("Initial currency fetch failed")
                }
            }
        ).then(data => showConversionResult(amount.value,data.conversion_rate, data.conversion_result, data.base_code, data.target_code, data.time_last_update_utc))
         .catch(error => console.log(error))
    

    })


    switcher.addEventListener("click", ()=> {
        let temp = currencyDropdowns[0].value 
        currencyDropdowns[0].value = currencyDropdowns[1].value
        currencyDropdowns[1].value = temp
    })

    // populate dropdown fields based on the current currencies the API supports
    function populateCurrencies(obj) {
        let currencies = Object.keys(obj)

        currencies.forEach(currency => {
            currencyDropdowns.forEach(dropdown => {
                let currencyOption = document.createElement("option")
                currencyOption.innerText = currency
                dropdown.append(currencyOption)
            })
        });
    }   


    // show currency conversion results 
    function showConversionResult(amount,rate,result, baseCode, targetCode,timestamp) {

        let date =  new Date(timestamp)
        let month = date.toLocaleString('default', { month: 'short' });

        // let time = `${date.getDay()} ${month} ${date.getFullYear()}, ${date.getHours()} ${date.getMinutes()} UTC+1.0`

        results.innerHTML = `
        <h3>These are the latest conversion results</h3><br>
        <div class="results__base">${amount} ${baseCode} =</div> 
        <div class="results__target">${result} ${targetCode}</div><br>
        <small>The conversion rate is: 1 ${baseCode} = ${rate} ${targetCode}.<br><br> Ratings last updated: <br>${timestamp}</small>
        `;

    }
});
  
