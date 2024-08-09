const countriesContainer = document.querySelector('.countries');
const filter = document.querySelector('.filter');
const input = document.querySelector('.input-container');


let allCountries;

function api(){
    fetch("https://restcountries.com/v3.1/all")
    .then(res => res.json())
    .then(data => {
        viewCountries(data);
        allCountries = data;
    });

    filter.addEventListener('change', (e) => {
        fetch(`https://restcountries.com/v3.1/region/${filter.value}`)
          .then((res) => res.json())
          .then(viewCountries)
      });
}

api();

input.addEventListener('input',  (e) => {
    const filterCountries = allCountries.filter((country) => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
    viewCountries(filterCountries)
  })

function viewCountries(data) {
    countriesContainer.innerHTML = '';
    data.forEach((country) => {
        const cardCountry = document.createElement('div');
        cardCountry.classList.add('card-country');
        cardCountry.addEventListener('click', () => {
            window.location.href = `/country.html?name=${country.name.common}`; 
        });
        cardCountry.innerHTML = `
            <img src="${country.flags.svg}" alt="${country.name.common} flag"/> 
            <div class="text-card">
                <h3 class="title-card">${country.name.common}</h3>  
                <p><b>Population: </b>${country.population.toLocaleString()}</p> 
                <p><b>Region: </b>${country.region}</p>
                <p><b>Capital: </b>${country.capital ? country.capital[0] : 'N/A'}</p>
            </div>
        `;
        countriesContainer.append(cardCountry);
    });
}

