/* global TrelloPowerUp */

var Promise = TrelloPowerUp.Promise;

var NUMBER_SIGN_ICONS = {
    light: window.TrelloPowerUp.util.relativeUrl('images/number-sign-110-svgrepo-com.light.svg'),
    dark: window.TrelloPowerUp.util.relativeUrl('images/number-sign-110-svgrepo-com.dark.svg')
}

var TICKET_ICON = './images/ticket-svgrepo-com.svg';

var findCardsByOptionalIdPrefix = function (t, opts) {
    return t.cards("all").filter(function (card) {
        return card.idShort.toString().startsWith(opts.search);
    });
};

var btnCallback = function (t, opts) {
    return t.popup({
        title: 'Get card by Card Number',
        items: function (t, options) {
            return new Promise(function (resolve) {
                findCardsByOptionalIdPrefix(t, options).then(function (cards) {
                    if (cards.length === 0) {
                        resolve([]);
                    }

                    var items = cards.map(function (card) {
                        return {
                            text: "#" + card.idShort + " - " + card.name,
                            callback: function (t, opts) {
                                t.closePopup().then(function () {
                                    if (card.closed) {
                                        // I can't work out how to get the URL of a closed card, so this will never be called.
                                        // TODO: find a way to get the URL of a closed card
                                        return t.navigate({
                                            url: card.url,
                                        });
                                    }
                                    return t.showCard(card.shortLink);
                                });
                            },
                        };
                    });
                    resolve(items);
                });
            });
        },
        search: {
            debounce: 300,
            count: 10,
            placeholder: 'Search card numbers',
            empty: 'No cards found',
            searching: 'Searching Trello...'
        }
    });
};

window.TrelloPowerUp.initialize({
    "card-badges": function (t, opts) {
        return t.card("idShort").get("idShort").then(function (cardIdShort) {
            return [
                {
                    text: "#" + cardIdShort,
                    icon: TICKET_ICON,
                    color: "green",
                },
            ];
        });
    },
    "card-detail-badges": function (t, opts) {
        return t.card("idShort").get("idShort").then(function (cardIdShort) {
            return [
                {
                    text: "#" + cardIdShort,
                    icon: TICKET_ICON,
                    color: "green",
                },
            ];
        });
    },
    "board-buttons": function (t, opts) {
        return [{
            icon: NUMBER_SIGN_ICONS,
            text: 'Callback',
            callback: btnCallback,
            condition: 'always'
        }];
    }
});
