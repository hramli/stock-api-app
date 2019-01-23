var https = require('https');

var stockCode = process.argv[2];

try {
    https.get(`https://api.iextrading.com/1.0/stock/${stockCode}/stats`, (response) => {
    var stockStats = "";
    var stockPrice = "";
    response.on('data', data => {
        stockStats+=data;
    })
    response.on('end', () => {
        try {
            stockStats = stockStats.toString();
            var jsonStockData = JSON.parse(stockStats);
            https.get(`https://api.iextrading.com/1.0/stock/${stockCode}/price`, (response)=>{
                response.on('data',data=> {
                    stockPrice+=data;
                })
                response.on('end', ()=>{
                    try{
                        stockPrice = stockPrice.toString();
                        var jsonPriceData = JSON.parse(stockPrice);
                        console.log(`${jsonStockData.companyName}: ${stockPrice}\nHigh: ${jsonStockData.week52high}\nLow: ${jsonStockData.week52low}`)
                    }
                    catch (error) {
                        console.log(error.message);
                    }
                })
            });
        
        } catch (error) {
            if(error.code != undefined)
                console.log('HTTP request error.');
            else 
                console.log('Unknown symbol');
        }
    })
});
} catch (error) {
    console.log('get request error.');
}
