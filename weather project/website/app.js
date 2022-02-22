/* Global Variables */
let baseUrl="api.openweathermap.org/data/2.5/weather?zip="

let apiKey="&appid=8ce50d7178e36bcf09d5267cebd93216";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

const postData = async ( url = '', data = {})=>{
	
    console.log(data);

    const response = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
    },
           
        body: JSON.stringify(data), 
    });

    try {
      const newData = await response.json();
      console.log(newData);
      return newData;
    }catch(error) {
    console.log("error", error);
    }


}


document.getElementById('generate').addEventListener('click', generateFunc);


function generateFunc(){

  const newZip =  document.getElementById('zip').value;
  const userInput = document.getElementById('feelings').value;

  getWeatherInfo(baseUrl,newZip, apiKey)

  .then(function (data){
      console.log(data);
      postData('/add', {temp: data.main.temp, date: newDate, content: userInput});
  })

  .then(function (newData){
      updateUI();
  })
  
}


//get request.
const getWeatherInfo = async (baseUrl, newZip, apiKey)=>{

const response = await fetch(baseUrl+newZip+apiKey)
try {
    const data= await response.json()
    console.log(data);
    return data
}catch(error) {

   console.log("error", error);
}
};


//update the UI.
const updateUI = async () => {

const response = await fetch('/all');
try{
  const data = await response.json();
  document.getElementById('temp').innerHTML = data[0].temp;
  document.getElementById('date').innerHTML = data[0].date;
  document.getElementById('content').innerHTML = data[0].content;

}catch(error){
  console.log("error", error);
}
}