var https = require('https');

var stockCode = process.argv[2];

try {
    https.get(`https://api.iextrading.com/1.0/stock/${stockCode}/stats`, (response) => {
    var responseBody = "";
    response.on('data', data => {
        responseBody+=data;
    })
    response.on('end', () => {
        try {
            responseBody = responseBody.toString();
            var jsonData = JSON.parse(responseBody);
            console.log(`${jsonData.companyName}'s stock price:\nhigh: ${jsonData.week52high}\nlow: ${jsonData.week52low}`)
        } catch {
            console.log('Unknown symbol');
        }
    })
});
} catch (error) {
    console.log('get request error.');
}
