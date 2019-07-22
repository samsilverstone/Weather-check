weatherform=document.querySelector('form')
weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()
    const loc=e.target.input.value
    fetch(`http://localhost:3000/weather?address=${loc}`).then((res)=>res.json()).then((data)=>{
    const x=document.getElementById('data')
    if(data.forecast){
        x.innerHTML=`<p>Forecast:  ${data.forecast}</p><p>Location:  ${data.location}`  
    }else if(data.error){
        x.innerHTML=`<p>Error:  ${data.error}`  
    }
})
})