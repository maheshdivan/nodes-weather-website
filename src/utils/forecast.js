const request = require('request')

const forecast = (lat,long,callback) =>{
    const url = 'https://api.darksky.net/forecast/50bb1ad6f32f9c250400f0633549e117/'+lat+','+long+'/?units=us&lang=en'

    request({url:url,json: true}, (error,response) => {
        //console.log(response)
        if (error){
            callback('Uanble to connect to Weather service',undefined)

        }else if(response.body.error){
            callback('Unable to find location',undefined)

        }else{
            callback(undefined,{temp: response.body.daily.summary + "it is currently "+ response.body.daily.icon +' Temperature is '+ response.body.currently.temperature})
            
        }
    })

}

module.exports = forecast