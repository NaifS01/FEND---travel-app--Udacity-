import { UpdateUI } from "./udUi";

function formHnadler() {
    let projectData = {};
    console.log("im in the function")
    const cityName = document.getElementById("input").value
    const date = document.getElementById("input2").value
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






