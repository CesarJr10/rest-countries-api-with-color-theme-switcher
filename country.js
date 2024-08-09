const countryDetails = document.querySelector('.country-details');


const urlParams = new URLSearchParams(window.location.search);
const countryName = urlParams.get('name');

if (countryName) {
    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
        .then(res => {
            if (!res.ok) {
                throw new Error('Error al obtener los datos del país');
            }
            return res.json();
        })
        .then(data => {
            const country = data[0];
            countryDetails.innerHTML = `
                <img src="${country.flags.svg}" alt="${country.name.common} flag"/> 
                <div class="text-card">
                <div class="details-text-container">
                    <h3 class="title-card">${country.name.common}</h3>
                    <div class="details-text">  
                        <p><b>Native Name: </b>${country.name.nativeName ? country.name.nativeName[Object.keys(country.name.nativeName)[0]].common : 'N/A'}</p>
                        <p><b>Population: </b>${country.population.toLocaleString()}</p> 
                        <p><b>Region: </b>${country.region}</p>
                        <p><b>Sub Region: </b>${country.subregion ? country.subregion : 'N/A'}</p>
                        <p><b>Capital: </b>${country.capital ? country.capital[0] : 'N/A'}</p>
                        <p><b>Top Level Domain: </b>${country.tld ? country.tld.join(', ') : 'N/A'}</p>
                        <p><b>Currencies: </b>${country.currencies ? Object.values(country.currencies).map(currency => currency.name).join(', ') : 'N/A'}</p>
                        <p><b>Languages: </b>${country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</p>
                    </div>
                </div>
            <div class="border-countries">
                <p><b>Border Countries: </b>${country.borders ? country.borders.join(', ') : 'None'}</p>
            </div>
            </div>
            `;
        })
        .catch(error => {
            console.error('Error al obtener info del pais', error);
            countryDetailsContainer.innerHTML = '<p>Error al cargar la info del pais.</p>';
        });
}
