function Card(id, name, isImportant) {
    var self = this;
    this.id = id;
    this.name = name;
    this.isImportant = isImportant;
    this.element = createCard();

    function createCard() {
        var card = $('<li>').addClass('card');
        if (self.isImportant) {
            card.addClass('important');
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