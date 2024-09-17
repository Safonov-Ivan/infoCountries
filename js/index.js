const translations = {
    name: "Название",
    topLevelDomain: "Домен верхнего уровня",
    alpha2Code: "Двузначный код",
    alpha3Code: "Трехзначный код",
    callingCodes: "Код страны телефонного номера",
    capital: "Столица",
    currencies: "Валюты",
    flag: "Флаг"
}

function getCountryInfo() {
    const countryName = document.getElementById('countryInput').value
    const countryInfoElement = document.getElementById('countryInfo')
    const preloader = document.querySelector('.preloader')
    countryInfoElement.innerHTML = ''
    preloader.style.display = 'block'


    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Страна не найдена')
            }
            return response.json()
        })
        .then(data => {
            displayCountryInfo(data[0])
        })
        .catch(error => {
            countryInfoElement.innerHTML = `<li>${error.message}</li>`
        })
        .finally(() => {
            preloader.style.display = 'none'
        });
}

function displayCountryInfo(country) {
    const countryInfoElement = document.getElementById('countryInfo')

    for (const key in country) {
        let value = country[key]
        if (translations[key]) {
            if (key === 'flag') {
                countryInfoElement.innerHTML += `<li>${translations[key]}: <img src="${country.flags.png}" alt="Флаг"></li>`
            } else if (key === 'currencies') {
                const currencies = Object.keys(value).map(curr => `code: ${curr}`).join(', ')
                countryInfoElement.innerHTML += `<li>${translations[key]}: ${currencies}</li>`
            }else if (key === 'name') {
                countryInfoElement.innerHTML += `<li>${translations[key]}: ${value.common}</li>`;
            } else if (Array.isArray(value)) {
                countryInfoElement.innerHTML += `<li>${translations[key]}: ${value.join(', ')}</li>`
            } else {
                countryInfoElement.innerHTML += `<li>${translations[key]}: ${value}</li>`
            }
        }
    }
}

