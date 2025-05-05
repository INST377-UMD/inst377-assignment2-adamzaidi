function startListening() {
    if (annyang) {
        annyang.start();
    }
}

function stopListening() {
    if (annyang) {
        annyang.abort();
    }
}

if (annyang) {
    var commands = {
        'hello': function() {
            alert('Hello World');
        },
        'change color to *color': function(color) {
            document.body.style.backgroundColor = color;
        },
        'navigate to *page': function(page) {
            page = page.toLowerCase();
            if (page.includes('home')) {
                window.location.href = 'index.html';
            } else if (page.includes('stocks')) {
                window.location.href = 'stocks.html';
            } else if (page.includes('dogs')) {
                window.location.href = 'dogs.html';
            }
        }
    };
    annyang.addCommands(commands);
}