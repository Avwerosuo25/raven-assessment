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

$(function () {
    var burl = "https://api.binance.com";
    var query = '/api/v3/exchangeInfo';
    var url = burl + query;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        // Extract the symbols array from the API response
        const symbols = data.symbols;
  
        // Define the number of trading pairs to display
        const numPairs = 10;
  
        // Get the first 'numPairs' symbols
        const selectedSymbols = symbols.slice(0, numPairs);
  
        // Create a table with trading pairs
        const table = document.createElement('table');
  
        // Create the table header
        const thead = document.createElement('thead');
        const tr = document.createElement('tr');
        const th = document.createElement('th');
        th.textContent = 'Trading Pairs';
        tr.appendChild(th);
        thead.appendChild(tr);
        table.appendChild(thead);
  
        // Create the table body with trading pairs
        const tbody = document.createElement('tbody');
        selectedSymbols.forEach(symbol => {
          const tr = document.createElement('tr');
          const td = document.createElement('td');
          td.textContent = symbol.symbol;
          tr.appendChild(td);
          tbody.appendChild(tr);
        });
        table.appendChild(tbody);
  
        // Clear the existing trading pair list
        const tradingPairList = document.getElementById('trading-pair-list');
        tradingPairList.innerHTML = '';
  
        // Append the table to the trading-pair-list div
        tradingPairList.appendChild(table);
      })
      .catch(error => {
        console.error('Error fetching trading pair list:', error);
      });
  });
  
  $(function () {
    var book = "https://api.binance.com";
    var quest = '/api/v3/depth';
    quest += '?symbol=BTCUSDT&limit=5'; // Specify the symbol and limit
    var url = book + quest;
    var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', url, true);
    ourRequest.onload = function() {
        if (ourRequest.status === 200) {
            var data = JSON.parse(ourRequest.responseText);
            var tradingPairs = data.bids.concat(data.asks);
            var tableBody = document.querySelector("#order-book tbody");
            tableBody.innerHTML = ""; // Clear the table body before populating new data
            tradingPairs.forEach(function(pair) {
                var row = document.createElement("tr");
                var bidCell = document.createElement("td");
                bidCell.textContent = pair[0];
                var askCell = document.createElement("td");
                askCell.textContent = pair[1];
                row.appendChild(bidCell);
                row.appendChild(askCell);
                tableBody.appendChild(row);
            });
        }
    };
    ourRequest.send();
});

// Retrieve the input fields for price, amount, and total value
const priceInput = document.getElementById('price');
const amountInput = document.getElementById('amount');
const totalValueInput = document.getElementById('total-value');

// Add event listeners to the price and amount input fields
priceInput.addEventListener('input', updateTotalValue);
amountInput.addEventListener('input', updateTotalValue);

// Function to update the total value based on the price and amount inputs
function updateTotalValue() {
  const price = parseFloat(priceInput.value);
  const amount = parseFloat(amountInput.value);

  // Calculate the total value of the order
  const totalValue = price * amount;

  // Update the total value input field
  totalValueInput.value = totalValue.toFixed(2); // Assuming you want to display the total value with 2 decimal places
}

document.getElementById('auth-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission

  var email = document.getElementById('email').value;
  var gravatarUrl = 'https://www.gravatar.com/avatar/' + md5(email);
  
  var gravatarImg = document.createElement('img');
  gravatarImg.src = gravatarUrl;
  
  document.getElementById('gravatar').innerHTML = '';
  document.getElementById('gravatar').appendChild(gravatarImg);
});

// MD5 Hash function
function md5(str) {
  var md5Hash = CryptoJS.MD5(str);
  return md5Hash.toString();
}
