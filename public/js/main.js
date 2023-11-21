const cityName = document.getElementById('cityName');
const submitBtn = document.getElementById('submitBtn');

const city_name = document.getElementById('city_name');
const temp_real_val = document.getElementById('temp_real_val');
const temp_status = document.getElementById('temp_status');
const datahide = document.querySelector('.middle_layer');

const getInfo = async(event) => {
    event.preventDefault();

    let cityVal = cityName.value;

    if(cityVal === ""){
        city_name.innerText = `Plz write the name before search`;
        datahide.classList.add("data_hide");
    }else{

        try{
           

            let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=0334280fd91169232e9e1a2fb81a0c4c`
            const response = await fetch(url);

            const data = await response.json();
            const arrData = [data];

            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
            temp_real_val.innerText = arrData[0].main.temp;
            const tempMood = arrData[0].weather[0].main;
            console.log(tempMood);

            //condition to check sunny or cloudy
            if (tempMood == "Clear") {
            temp_status.innerHTML =
                "<i class='fa-regular fa-sun' style='color: #fdae26;'></i>";
            } else if (tempMood == "Clouds") {
            temp_status.innerHTML =
                "<i class='fa-solid fa-sm fa-cloud' style='color: #faf2ef'></i>";
            } else if (tempMood == "Rain") {
            temp_status.innerHTML =
                "<i class='fa-solid fa-cloud-rain' style='color: #2974f5;'></i>";
            } else {
            temp_status.innerHTML =
                "<i class='fa-solid fa-cloud-sun' style='color: #f2b140;'></i>";

            }
            datahide.classList.remove('data_hide');
            cityVal = "";
           
       
        }catch{
            cityVal = " ";
            datahide.classList.add("data_hide");
            city_name.innerText =  `please enter the proper city name`;
            console.log('please add the proper city name');
        }
        
    }
}

const getCurrentDay = () => {
    let weekday = new Array(7)
    weekday[0] = 'Sunday'
    weekday[1] = 'Monday'
    weekday[2] = 'Tuesday'
    weekday[3] = 'Wednesday'
    weekday[4] = 'Thursday'
    weekday[5] = 'Friday'
    weekday[6] = 'Saturday'

    let currentTime = new Date()
    let day = weekday[currentTime.getDay()]

    return day 
}

const getCurrentDate = () => {
    var months = [ 
        "Jan" , 
        "Feb" , 
        "Mar" , 
        "Apr" , 
        "May" , 
        "Jun" , 
        "Jul" , 
        "Aug" , 
        "Sep" ,
        "Oct" ,
        "Nov" ,
        "Dec"
    ] 

    var now = new Date()

    var month = months[now.getMonth()] 
    var date = now.getDate()

    return `${month} ${date}` 
}

document.getElementById('day').innerText = getCurrentDay()
document.getElementById('today_date').innerText = getCurrentDate()

submitBtn.addEventListener('click', getInfo);