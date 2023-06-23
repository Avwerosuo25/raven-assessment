new TradingView.widget({
  "autosize": true,
  "symbol": "BINANCE:BTCUSDT",
  "interval": "240",
  "timezone": "Africa/Lagos",
  "theme": "dark",
  "style": "1",
  "locale": "en",
  "toolbar_bg": "#f1f3f6",
  "enable_publishing": false,
  "withdateranges": true,
  "hide_side_toolbar": false,
  "allow_symbol_change": true,
  "container_id": "tradingview_1bf9d"
});

// Make an HTTP request to the Binance API endpoint
fetch('https://api.binance.com/api/v3/exchangeInfo')
    .then(response => response.json())
    .then(data => {
        // Extract the symbols array from the API response
        const symbols = data.symbols;

        // Define the desired currency pairs
        const desiredCurrencyPairs = ["BTCUSDT", "ETHBTC", "LTCUSDT", "EURUSD", "GBPUSD", "USDJPY", "AUDUSD", "USDCAD", "USDCHF"]; // Add 7 more currency pairs here

        // Filter the symbols array to include only the desired currency pairs
        const filteredSymbols = symbols.filter(symbol => desiredCurrencyPairs.includes(symbol.symbol));

        // Create a table for trading pairs
        const tradingPairList = document.getElementById('trading-pair-list');
        const table = document.createElement('table');
        table.classList.add('trading-pair-table');

        // Create table headers
        const tableHead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        const headerTradingPairs = document.createElement('th');
        headerTradingPairs.textContent = 'Trading Pairs'; // Update the header text
        headerRow.appendChild(headerTradingPairs);
        tableHead.appendChild(headerRow);
        table.appendChild(tableHead);

        // Create table rows for each trading pair
        const tableBody = document.createElement('tbody');
        filteredSymbols.forEach(symbol => {
            const row = document.createElement('tr');
            const symbolCell = document.createElement('td');
            symbolCell.textContent = symbol.baseAsset + "/" + symbol.quoteAsset; // Display the base asset and quote asset as the trading pair
            row.appendChild(symbolCell);
            tableBody.appendChild(row);
        });
        table.appendChild(tableBody);

        // Append the table to the trading-pair-list div
        tradingPairList.appendChild(table);
    })
    .catch(error => {
        console.error('Error fetching trading pair list:', error);
    });
