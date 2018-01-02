var board = {
    name: 'Kanban Board',
    createColumn: function(column) {
        this.element.append(column.element);
        initSortable();
    },
    element: $('#board .column-container')
};

$('.create-column')
    .click(function() {
        var columnName = prompt('Enter the column name');
        $.ajax({
            url: baseUrl + '/column',
            method: 'POST',
            data: {
                name: columnName
            },
            success: function(response) {
                var column = new Column(response.id, columnName);

                if (columnName != null) {
                    var column = new Column(response.id, columnName);
                    board.createColumn(column);
                }
            }
        });
    });

function initSortable() {
    $('.card-list').sortable({
        connectWith: '.card-list',
        placeholder: 'card-placeholder'
    }).disableSelection();
}