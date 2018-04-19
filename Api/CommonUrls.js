let CommonUrls = {
    Globalurl: (endPoint)=> {
        return `https://smarttransit-dev-api.herokuapp.com/api/v1/passenger-identifier/${endPoint}`;
    }
};
module.exports = CommonUrls;
