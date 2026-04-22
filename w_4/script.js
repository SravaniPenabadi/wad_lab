const apiKey = "fa1afedfb550ee7b9439a11ff18951f4"; 
// Arrow Function 
const getWeather = async () => { 
const city = document.getElementById("cityInput").value; 
if (!city) { 
alert("Please enter a city name"); 
return; 
} 
try { 
//  Async/Await + Fetch (Promise based) 
const response = await fetch( 
`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=
metric`); 
const data = await response.json(); 
processWeatherData(data); 
} catch (error) { 
console.log("Error:", error); 
}}; 
//  Callback Function Example 
const processWeatherData = (data) => { 
const labels = []; 
const temperatures = []; 
// Taking first 8 readings (24 hours) 
data.list.slice(0, 8).forEach(item => { 
labels.push(item.dt_txt); 
temperatures.push(item.main.temp); 
}); 
displayChart(labels, temperatures); 
}; 
// Arrow Function + Chart Rendering 
const displayChart = (labels, temperatures) => { 
const ctx = document.getElementById("weatherChart").getContext("2d"); 
new Chart(ctx, { 
type: "line", 
data: { 
labels: labels, 
datasets: [{ 
label: "Temperature (°C)", 
data: temperatures, 
borderColor: "blue", 
fill: false 
}
]
 }, 
options: { 
responsive: true, 
maintainAspectRatio: false,  
}
}
);
};