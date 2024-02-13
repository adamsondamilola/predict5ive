import React, { Component } from 'react'; 
const ConvertToRate = (country, x) => {
    let currencySymbol = "USD";

    //rate per usd
    let rates = [
        {id: 1, country: "Kenya", rate: 150, symbol: "KSH"}, 
        {id: 2, country: "Namibia", rate: 20, symbol: "N$"},
        {id: 3, country: "Nigeria", rate: 500, symbol: "NGN"},
        {id: 3, country: "South Africa", rate: 20, symbol: "ZAR"},
        {id: 3, country: "Zambia", rate: 20, symbol: "ZK"}]
    try {
        if (x == '' || x == null) x = 0;
        if (isNaN(x) === true) x = 0;
//            const getPackages = () => {
    /*
                fetch(process.env.REACT_APP_MAIN_API +'settings/'+country+'/currency_rates')
                            .then((response) => response.json())
                            .then((json) => {
                                if (json.status == 1) {
                                    currencySymbol = json.message.symbol;
                                    let conv = parseFloat(x) * parseFloat(json.message.rate);
                                    x = conv;
                                    let z = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");//x.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                    return z +" " +json.message.symbol; 
                                }
                            })
                            .catch((error) => console.error(error))
                            .finally(() => console.log("")); */
//          }
let result = rates.filter(x => x.country == country)[0]            
let conv = parseFloat(x) * parseFloat(result.rate);
x = conv;
let z = 
//x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
x.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
return z +" " +result.symbol; 

    } catch {
        let y = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        if(y) return y +" " +currencySymbol;
        else return 0;
    }
}
export default  ConvertToRate