const request=require('request')

forecast=({latitude,longitude},callback)=>{
    const forecastUrl=`https://api.darksky.net/forecast/56d0d818d4190e0d9895b0d95874bf21/${latitude},${longitude}?units=si`
    request({url:forecastUrl,json:true},(error,response)=>{
    if(error){
        callback('Unable to connect to forecast services',undefined)
    }else if(response.body.error){
        callback("Unable to find the location",undefined)
    }else{
        callback(undefined,{
            summary:`${response.body.daily.data[0].summary}It is currently ${response.body.currently.temperature} degrees outside.There is a ${response.body.currently.precipProbability}% chance of rain.`
        })
    }
})
}

module.exports=forecast

