//http://api.weatherapi.com/v1/current.json?key=e0ab9ddf78f44e5e92a165830241206&q=Mumbai&aqi=no

const temperatureField = document.querySelector(".temp p");
const locationField = document.querySelector(".time_location p:first-child");
const dateandTimeField = document.querySelector(".time_location p:last-child");
const conditionField = document.querySelector(".condition p");
const searchField = document.querySelector(".search_area");
const form = document.querySelector("form");

form.addEventListener('submit', searchForLocation);

let target = 'Lucknow';

const fetchResults = async (targetLocation) => {
    let url = `http://api.weatherapi.com/v1/current.json?key=e0ab9ddf78f44e5e92a165830241206&q=${targetLocation}&aqi=no`;

    try {
        const res = await fetch(url);
        const data = await res.json();

        if (res.ok) {
            console.log(data);

            let locationName = data.location.name;
            let localtime = data.location.localtime;
            let temp = data.current.temp_c;
            let condition = data.current.condition.text;

            updateDetails(temp, locationName, localtime, condition);
        } else {
            console.error('Error fetching data:', data.error.message);
        }
    } catch (error) {
        console.error('Network error:', error);
    }
};

function updateDetails(temp, locationName, localtime, condition) {

    let [splitDate, splitTime] = localtime.split(' ');

    
    let date = new Date(localtime);


    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let currentDay = days[date.getDay()];

    
    temperatureField.innerText = `${temp} °C`;
    locationField.innerText = locationName;
    dateandTimeField.innerText = `${splitDate} ${currentDay} ${splitTime}`;
    conditionField.innerText = condition;
}

function searchForLocation(e) {
    e.preventDefault();
    target = searchField.value;
    fetchResults(target);
}


fetchResults(target);