function Column(id, name) {
    var self = this;
    this.id = id;
    this.name = name || 'Column';
    this.element = createColumn();

    function createColumn() {
        var column = $('<div class="column"></div>');
        var columnTitle = $('<h2 class="column-title">' + self.name + '</h2>');
        var columnCardList = $('<ul class="card-list"></ul>');
        var columnDelete = $('<button class="btn-delete">x</button>');
        var columnAddCard = $('<button class="column-add-card">Add card</button>');
        var columnAddImportantCard = $('<button class="column-add-card">Add priority card</button>');

        columnDelete.click(function() {
            self.deleteColumn();
        });

        columnAddCard.click(function(event) {
            var cardName = prompt("Enter the name of the card");
            event.preventDefault();
            $.ajax({
                url: baseUrl + '/card',
                method: 'POST',
                data: {
                    name: cardName,
                    bootcamp_kanban_column_id: self.id
                },
                success: function(response) {
                    var card = new Card(response.id, cardName, false);
                    if (cardName != null) {
                        self.createCard(card);
                    }
                }
            });
        });

        columnAddImportantCard.click(function(event) {
            var cardName = prompt("Enter the name of the card");
            event.preventDefault();
            $.ajax({
                url: baseUrl + '/card',
                method: 'POST',
                data: {
                    name: cardName,
                    bootcamp_kanban_column_id: self.id
                },
                success: function(response) {
                    var card = new Card(response.id, cardName, true);
                    if (cardName != null) {
                        self.createCard(card);
                    }
                }
            });
        });

        column.append(columnTitle)
            .append(columnDelete)
            .append(columnAddCard)
            .append(columnAddImportantCard)
            .append(columnCardList);
        return column;
    }
}
Column.prototype = {
    createCard: function(card) {
        this.element.children('ul').append(card.element);
    },
    deleteColumn: function() {
        var self = this;
        $.ajax({
            url: baseUrl + '/column/' + self.id,
            method: 'DELETE',
            success: function(response) {
                self.element.remove();
            }
        });
    }
};