document.addEventListener("DOMContentLoaded", () => {
    let currencyDropdowns = document.querySelectorAll("select")
    let form = document.querySelector("form");
    let defaultCurrency = "USD";

    // fetch all possible usable currencies from API
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

    

    form.addEventListener("submit", e => {
        e.preventDefault();

        let currencyFrom = currencyDropdowns[0].value
        let currencyTo = currencyDropdowns[1].value
        let amount = document.querySelector("input[name='amount']")

        https://v6.exchangerate-api.com/v6/YOUR-API-KEY/pair/EUR/GBP/AMOUNT

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
        ).then(data => showConversionResult(data.conversion_rate, data.conversion_result))
         .catch(error => console.log(error))
    

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
    function showConversionResult(rate,result) {
        console.log(rate)
        console.log(result)
    }
});
  
