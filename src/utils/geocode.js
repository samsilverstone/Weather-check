const request=require('request')

const geocode=(location,callback)=>{
    url2=`https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1Ijoic2Ftc2lsdmVyc3RvbmUiLCJhIjoiY2p5YTg5YTBwMGM3eTNuc2F5eXBvcHB0diJ9.iRJBt-II5z6NFno2apIqxQ&autocomplete=false&limit=1`
    request({url:url2,json:true},(error,response)=>{
    if(error){
        callback('Unable to connect to location services',undefined) 
    }else if(response.body.features==false){
        callback('No response from the server',undefined)
    }
    else{
        let data={
            latitude:response.body.features[0].center[1],
            longitude:response.body.features[0].center[0],
            location:response.body.features[0].place_name
        }
        callback(undefined,data)
    }
})
}


module.exports=geocode