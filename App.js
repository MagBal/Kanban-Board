var baseUrl = 'https://kodilla.com/pl/bootcamp-api';
var myHeaders = {
    'X-Client-Id': '2546',
    'X-Auth-Token': 'c206d11ff1ff493ed37c7579c3212d37'
};

$.ajaxSetup({
    headers: myHeaders
});

$.ajax({
    url: baseUrl + '/board',
    method: 'GET',
    success: function(response) {
        setupColumns(response.columns);
    }
});

function setupColumns(columns) {
    columns.forEach(function(column) {
        var col = new Column(column.id, column.name);
        board.createColumn(col);
        setupCards(col, column.cards);
    });
}

function setupCards(col, cards) {
    cards.forEach(function(card) {
        var isImportant = card.name.includes('[I]');
        var cardName = card.name;
        if (isImportant) {
            cardName = cardName.replace('[I]', '');
        }

        var card = new Card(card.id, cardName, isImportant);
        col.createCard(card);
    })
}