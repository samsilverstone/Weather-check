const path =require('path')
const express=require('express')
const hbs=require('hbs')
const app=express()
const geocode=require("./utils/geocode")
const forecast=require("./utils/forecast")

//express path
const publicDirectory=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

app.use(express.static(publicDirectory))

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.get('',(req,res)=>{
    res.render('index',{
        title:"WEATHER",
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:"ABOUT",
        url:"This app gives the weather related information of the location that you are providing e.g. forecast, temperature, chance of rain."
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'HELP',
        info:'God helps those who helps themselves.'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"You must provide an address"
        })
    }
    geocode(req.query.address,(error,data)=>{
        if(error){
            return res.send({
                error
            })
        }
        forecast(data,(error,response)=>{
            if(error){
                return res.send({
                    error
                })
            }

            res.send({
                forecast:response.summary,
                location:data.location,
                address:req.query.address                
            })
        })
    })

})

app.get('/help/*',(req,res)=>{
    res.render('errorpage',{
        title:"404",
        content:"help article not found"
    })
})


app.get('*',(req,res)=>{
    res.render('errorpage',{
        title:"404",
        content:"Page not found"
    })
})



app.listen(3000,()=>{
    console.log("Express is running at port 3000!")
})


