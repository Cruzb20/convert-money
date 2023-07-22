// Get references to the select elements
const fromDropDown = document.getElementById("from");
const toDropDown = document.getElementById("to");
const convertButton = document.querySelector(".bg-primary");
const resultDiv = document.getElementById("result");

// Populate the select elements with currency options
currencies.forEach((currency) => {
  const option1 = document.createElement("option");
  option1.value = currency;
  option1.text = currency;
  fromDropDown.appendChild(option1);

  const option2 = document.createElement("option");
  option2.value = currency;
  option2.text = currency;
  toDropDown.appendChild(option2);
});

// Define your ExchangeRate-API API key
const apiKey = "ac5048b43cb750f21d69511a";

// Add event listener to the convert button
convertButton.addEventListener("click", convertCurrency);

// Function to handle currency conversion
function convertCurrency() {
  const fromCurrency = fromDropDown.value;
  const toCurrency = toDropDown.value;

  // Make API request to get the conversion rate
  fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.result === "success") {
        const convertedValue = data.conversion_rate;
        const amount = parseFloat(document.getElementById("amount").value);

        // Calculate the converted amount
        const convertedAmount = amount * convertedValue;

        // Display the result
        resultDiv.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
      } else {
        resultDiv.textContent = "An error occurred during conversion.";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      resultDiv.textContent = "An error occurred during conversion.";
    });
}

