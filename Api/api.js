// let baseUrl = 'https://smarttransit-dev-api.herokuapp.com/api/v1/passenger-identifier/check';
import CommonUrls from './CommonUrls';
var api = {
    register(contactnumber){
        let details = {
            phone : contactnumber
        };
        let formBody = [];
        for (let property in details) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        }
        return fetch( CommonUrls.Globalurl('check'), config).then((res) => res.json())
    },
    registerSmartTransit(contactnumber, IMEi_number ){
        let details = {
            phone : contactnumber,
            imei : IMEi_number,
            type : "smartPhone",
            connecting_number : contactnumber
        };
        let formBody = [];
        for (let property in details) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        console.log("formBody", formBody);
        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        }
        return fetch(CommonUrls.Globalurl('registration'), config).then((res) => res.json())
    }

};
module.exports = api;
