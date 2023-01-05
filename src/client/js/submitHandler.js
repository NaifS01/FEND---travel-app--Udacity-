import { UpdateUI } from "./udUi";

function formHnadler() {
    // For all the data coming from API
    let projectData = {};
    console.log("im in the function")
    //getting the name of the city by id 
    const cityName = document.getElementById("input").value
    //getting the date entered by the user 
    const date = document.getElementById("input2").value
    
    //transfer date to Date should be yy-mm-dd
    //the getting the dates and calculate the differences between the NOW date and the date INPUTED by the user
    let countDown = Date.parse(date);
    let now = new Date().getTime();
    let distance = countDown - now;
    let daysUntil = Math.floor(distance / (1000 * 60 * 60 * 24));
    console.log(daysUntil);
    console.log(cityName)
    postData('/all', {
        data: cityName, days: daysUntil,
    }).then((res) => {
        UpdateUI(res);
    })

}



//Post function 
const postData = async (url = '', data = {}) => {
    const res = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    try {
        const resData = await res.json();
        console.log(resData);
        return resData;
    } catch (error) {
        console.log('error', error);
    }

}
export { formHnadler, postData }






