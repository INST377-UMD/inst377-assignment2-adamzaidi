document.addEventListener('DOMContentLoaded', function() {
    fetch('https://zenquotes.io/api/random')
        .then(response => response.json())
        .then(data => {
            const quote = data[0]['q'] + " -" + data[0]['a'];
            document.getElementById('quote-box').innerText = quote;
        })
        .catch(error => {
            console.error('Error fetching quote:', error);
        });
});