/* global TrelloPowerUp */

var Promise = TrelloPowerUp.Promise;

window.TrelloPowerUp.initialize({
    "card-badges": function (t, opts) {
        return t.card("idShort").get("idShort").then(function (cardIdShort) {
            return [
                {
                    text: "#" + cardIdShort,
                    icon: "./images/ticket-svgrepo-com.svg",
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
                    icon: "./images/ticket-svgrepo-com.svg",
                    color: "green",
                },
            ];
        });
    },
});
