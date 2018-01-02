function Card(id, name, isImportant) {
    var self = this;
    this.id = id;
    this.isImportant = isImportant;
    this.name = name || 'Card';
    this.element = createCard();

    function createCard() {
        var card = $('<li class="card"></li>');
        if (isImportant) {
            var card = $('<li class="important"></li>');
        }
        var cardDescription = $('<p class="card-description"></p>');
        var cardDeleteBtn = $('<button class="btn-delete">x</button>');
        cardDeleteBtn.click(function() {
            self.removeCard();
        });

        card.append(cardDeleteBtn);
        cardDescription.text(self.name);
        card.append(cardDescription)
        return card;
    }
}

Card.prototype = {
    removeCard: function() {
        var self = this;
        $.ajax({
            url: baseUrl + '/card/' + self.id,
            method: 'DELETE',
            success: function() {
                self.element.remove();
            }
        });
    }
}