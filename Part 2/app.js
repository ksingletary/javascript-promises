$(function(){
    let baseUrl = 'https://deckofcardsapi.com/api/deck'

    $.getJSON(`${baseUrl}/new/draw/`).then(data => {
        let {suit, value} = data.cards[0];
        console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
    })

    let first = null;
    $.getJSON(`${baseUrl}/new/draw/`).then(data => {
        first = data.cards[0];
        let deckID = data.deck_id;
        return $.getJSON(`${baseUrl}/${deckID}/draw/`);
    }).then(data => {
        let second = data.cards[0]
        [first, second].forEach(card => {
            console.log(`${card.value.toLowerCase} of ${card.suit.toLowerCase}`);
        });
    });

    let deckID = null;
    let $button = $('button');
    let $cardArea = $('#card-area');

    $.getJSON(`${baseUrl}/new/shuffle/`).then(data => {
        deckID = data.deck_id;
        $button.show();
    });

    $button.on('click', function() {
        $.getJSON(`${baseUrl}/${deckID}/draw/`).then(data => {
            let cardSRC = data.cards[0].image;
            let angle = Math.random() * 90 -45;
            let randX = Math.random() * 40- 20;
            let randY = Math.random() * 40 -20;
            $cardArea.append(
                $('<img>', {
                    src: cardSRC,
                    css: {
                        transofrm: `translate(${randX}px, ${randY}px) rotate(${angle}deg)`
                    }
                })
            );
            if (data.remaining === 0) $button.remove();
        });
    });
});