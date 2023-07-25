document.addEventListener("DOMContentLoaded", function() {
  var currencySelector = document.getElementById("currencySelector");
  var currencyInfo = document.getElementById("currencyInfo");

  // Получение данных
  fetch("https://www.cbr-xml-daily.ru/daily_json.js")
    .then(response => response.json())
    .then(data => {
      var date = parseDateTime(data.Date);
      var prevDate = parseDateTime(data.PreviousDate);
      var currencies = data.Valute;

      // Добавление дефолтной опции в селектор
      var defaultOption = document.createElement("option");
      defaultOption.value = "";
      defaultOption.disabled = true;
      defaultOption.style.color = "gray";
      defaultOption.selected = true;
      currencySelector.appendChild(defaultOption);

      // Заполнение селектора
      for (var currencyItem in currencies) {
        var option = document.createElement("option");
        option.value = currencyItem;
        option.textContent = currencies[currencyItem].ID + " - " + currencies[currencyItem].Name;
        currencySelector.appendChild(option);
      }

      // Обработка выбора валюты
      currencySelector.addEventListener("change", function() {
        var selectedCurrencyItem = this.value;
        var selectedCurrency = currencies[selectedCurrencyItem];
        console.log(selectedCurrency);
        // Формирование информации о выбранной валюте
        var info = "<strong>" + selectedCurrency.ID + " - " + selectedCurrency.Name +
        " (" + selectedCurrency.CharCode + ")." + "</strong>" + "<br>" +
        date + " - " + selectedCurrency.Value + "<br>" +
        prevDate + " - " + selectedCurrency.Previous;

        // Обновление блока информации
        currencyInfo.innerHTML = info;
      });
    })
    .catch(error => console.log(error));
});

function parseDateTime(dateTimeString) {
  const dateObj = new Date(dateTimeString);
  // Форматирование даты
  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const year = dateObj.getFullYear();
  // Форматирование времени
  const hours = String(dateObj.getHours()).padStart(2, '0');
  const minutes = String(dateObj.getMinutes()).padStart(2, '0');
  const seconds = String(dateObj.getSeconds()).padStart(2, '0');
  return `${day}/${month}/${year}, ${hours}:${minutes}:${seconds}`;
}
