document.addEventListener("DOMContentLoaded", function() {
    const rateElement = document.getElementById("rate");
    let exchangeRate = 0;

    fetch("https://www.cbr-xml-daily.ru/daily_json.js")
        .then(response => response.json())
        .then(data => {
            exchangeRate = data.Valute.MDL.Value;
            rateElement.textContent = `Текущий курс: 1 MDL = ${exchangeRate.toFixed(2)} RUB`;
        })
        .catch(error => {
            console.error("Error fetching exchange rate:", error);
            rateElement.textContent = "Не удалось загрузить курс.";
        });

    window.convertToMDL = function() {
        const rubles = document.getElementById("rubles").value;
        const mdl = rubles / exchangeRate;
        document.getElementById("mdl").value = mdl.toFixed(2);
    };

    window.convertToRUB = function() {
        const mdl = document.getElementById("mdl").value;
        const rubles = mdl * exchangeRate;
        document.getElementById("rubles").value = rubles.toFixed(2);
    };
});