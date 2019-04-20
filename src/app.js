const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()

//Define paths for express config
const publicDir= path.join(__dirname,'../public')
const viewsPath= path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

// set-up handle bars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//set-up static directory to serve
app.use(express.static(publicDir))


app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Mahesh'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About',
        name: 'Mahesh'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        message:'I am here to help',
        title: 'Help',
        name: 'Mahesh'
    })
})
//Root URL always serves the index.html
// app.get('',(req,res)=>{
//     res.send('<h1>Welcome</h1>')
// })

// app.get('/help',(req,res)=>{
//     res.send(help.html)
// })

// app.get('/about',(req,res)=>{
//     res.send(about.html)
// })

app.get('/weather',(req,res)=>{
    
    if (!req.query.address){
        return res.send({
            error: "No address provided!!!"
        })
    }   

//   geocode(req.query.address, (error,data) => {
     geocode(req.query.address, (error,{latitude,longitude,location}={}) => {
// Return will stop the loop and will exit
        if (error){
         return res.send({
                error: 'Address is in correct'
            })
        }
    //console.log('error ' , error)
    //console.log('data ', data)

    forecast(latitude,longitude,(error, forecastdata) => {

       if (error){
           return res.send({
               error: 'Wrong location'
           })
       }
       
       res.send({
           location,
           forecast: forecastdata,
           address: req.query.address
       })
    })

    })

})

app.get('/products',(req,res)=>{
    if (!req.query.search){
        return res.send({
            error: 'You must provide a location in search term'
        })
    }
    
    res.send({
        products: []
    })
})



app.get('/help/*',(req,res)=>{
    res.render('404',{
        error: 'Help page not found',
        name: 'Mahesh'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        error: 'Page not found',
        name: 'Mahesh'
    })
})
//console message for the operator to know
app.listen(3000,()=>{
    console.log("Server is up on port 3000")
})

