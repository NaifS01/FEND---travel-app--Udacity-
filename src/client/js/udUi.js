const UpdateUI = (data) => {
    console.log("this data is in Udpate ui " + data);
    document.getElementById("dest").innerHTML = "Country name : " + data.name
    document.getElementById("daysUntil").innerHTML = "How many days till?: " + data.daysuntil + " days"
    document.getElementById("currentTemp").innerHTML = "current temp in riyadh: " + data.temp
    document.getElementById("countryCode").innerHTML = "whcih country region? : " + data.countryCode
    document.getElementById("imgOfCity").setAttribute('src', data.imageUrl);
}

export { UpdateUI }