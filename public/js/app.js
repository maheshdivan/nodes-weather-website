
const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')



weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    // http is commented to run on heroku, because it won't be running on local host any more
    //fetch('http://localhost:3000/weather/?address='+location).then((response)=>{
    fetch('/weather/?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent=data.error
        }else{
            messageOne.textContent=data.location
            messageTwo.textContent=data.forecast.temp
            console.log(data.location)
            console.log(data.forecast)
        }
    })
}) 
})

