const loadData = (city = 'dhaka') =>{
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b468abc952e3451ab3229b06c2bf7e0a&units=metric`
    fetch(url).then(response => response.json())
    .then(data => displayData(data))
    .catch(error => {
        document.getElementById('warning').classList.remove('d-none');
        console.log(error)
    })
};
const resetHTML = () =>{
    document.getElementById('city-name').innerHTML = '';
    document.getElementById('temp-main').innerHTML = '';
    document.getElementById('min-max').innerHTML = '';
    document.getElementById('status').innerHTML = '';
    document.getElementById('icon').setAttribute('src','');
    document.getElementById('wind').innerHTML = '';
    document.getElementById('sun').innerHTML = '';
};
const displayData = weather =>{
    resetHTML();
    let sunrise = new Date(weather.sys.sunrise * 1000).toLocaleTimeString();
    let sunset = new Date(weather.sys.sunset*1000).toLocaleTimeString();
    const cityName = document.getElementById('city-name');
    cityName.innerHTML = `
        ${weather.name}, ${weather.sys.country}
    `;
    const temperature = document.getElementById('temp-main');
    temperature.innerHTML = `
        ${weather.main.temp} &deg;C
    `
    const tempMinMax = document.getElementById('min-max');
    tempMinMax.innerHTML = `
        Min: ${weather.main.temp_min}&deg;C &nbsp; |  &nbsp; Max: ${weather.main.temp_max}&deg;C &nbsp;   | &nbsp; Feels Like: ${weather.main.feels_like}&deg;C
    `;
    const status = document.getElementById('status');
    status.innerHTML = `
        ${weather.weather[0].main}
    `
    const icon = document.getElementById('icon');
    icon.setAttribute('src',`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
    const wind = document.getElementById('wind');
    wind.innerHTML =`
        humidity: ${weather.main.humidity} &nbsp;  | &nbsp;  wind: ${weather.wind.speed}
    `
    const sun = document.getElementById('sun');
    sun.innerHTML =`
        Sunrise : ${sunrise} &nbsp; | &nbsp; Sunset : ${sunset}
    `
};
document.getElementById('search-btn').addEventListener('click',()=>{
    document.getElementById('warning').classList.add('d-none');
    const input = document.getElementById('input');
    if(input.value == '') return
    loadData(input.value);
    input.value = '';
});
document.getElementById('input').addEventListener('keyup',function(e){
    if(e.keyCode === 13){
        document.getElementById('warning').classList.add('d-none');
        const input = document.getElementById('input');
        if(input.value == '') return
        loadData(input.value);
        input.value = ''; 
    }
    
})
loadData();