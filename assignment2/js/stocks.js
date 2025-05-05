document.addEventListener('DOMContentLoaded', function() {
    fetchRedditStocks();
});

function fetchStockData() {
    const ticker = document.getElementById('tickerInput').value.toUpperCase();
    const days = document.getElementById('daysSelect').value;
    const apiKey = "OfFSoCVIdqJJR8caf3y4xoU4IEVYlUtm";
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - days);

    const formatDate = (date) => {
        return date.toISOString().split('T')[0];
    };

    const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${formatDate(startDate)}/${formatDate(endDate)}?adjusted=true&sort=asc&limit=120&apiKey=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const labels = data.results.map(item => new Date(item.t).toLocaleDateString());
            const prices = data.results.map(item => item.c);

            const ctx = document.getElementById('stockChart').getContext('2d');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: `${ticker} Closing Prices`,
                        data: prices,
                        borderColor: '#d50000',
                        backgroundColor: 'rgba(213,0,0,0.2)',
                        fill: true
                    }]
                },
                options: {
                    responsive: true
                }
            });
        })
        .catch(error => {
            console.error('Error fetching stock data:', error);
        });
}

function fetchRedditStocks() {
    fetch('https://tradestie.com/api/v1/apps/reddit?date=2022-04-03')
        .then(response => response.json())
        .then(data => {
            const top5 = data.slice(0, 5);
            const tableBody = document.getElementById('redditStocksTable').querySelector('tbody');
            top5.forEach(stock => {
                const row = document.createElement('tr');

                const tickerCell = document.createElement('td');
                const link = document.createElement('a');
                link.href = `https://finance.yahoo.com/quote/${stock.ticker}`;
                link.target = "_blank";
                link.innerText = stock.ticker;
                tickerCell.appendChild(link);

                const commentsCell = document.createElement('td');
                commentsCell.innerText = stock.no_of_comments;

                const sentimentCell = document.createElement('td');
                const sentimentImg = document.createElement('img');
                sentimentImg.src = stock.sentiment === 'Bullish' ? 'assets/icons/bullish.png' : 'assets/icons/bearish.png';
                sentimentImg.alt = stock.sentiment;
                sentimentImg.style.width = "25px";
                sentimentCell.appendChild(sentimentImg);

                row.appendChild(tickerCell);
                row.appendChild(commentsCell);
                row.appendChild(sentimentCell);
                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error fetching reddit stocks:', error);
        });
}

if (annyang) {
    annyang.addCommands({
        'lookup *ticker': function(ticker) {
            document.getElementById('tickerInput').value = ticker.toUpperCase();
            document.getElementById('daysSelect').value = "30";
            fetchStockData();
        }
    });
}