import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

class All
{
    constructor(link)
    {
        this.link = link;
    }

    notification(iconChoice, text)
    {
        let icon = ""

        if(iconChoice === "negative")
        {
             icon = `            
            <svg class="negativeIcon" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
            </svg>`
        }
        else
        {
             icon = `
            <svg class="positiveIcon" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
            </svg>
            `
        }

        let containerNotification = document.createElement('div');
        containerNotification.innerHTML = `
        <div class="cont shadow" id="cont">
            <div class="notificationSpace">    
                ${icon}
                <p>${text}</p>
            </div>
        <div class="bar"></div>`
        
        document.getElementById('notification').appendChild(containerNotification);
    
        setTimeout(() => {document.getElementById('notification').removeChild(containerNotification)}, 2000)

    }

    graphic(currency, firtRate, secondRate, thirdRate, lastRate, currentRate)
    {
        const monthNames = [
            "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
            "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
          ];
          
          let date = new Date()
          let month = date.getMonth()
          let year = date.getFullYear()
          
          let monthStats = []
          
          for(let i = 4; i>=0; i--)
          {
        
            if((month - i) >= 0)
            {
                monthStats.push(`${monthNames[month - i]}`)
            }
            else
            {
                monthStats.push(`${(month + 13) - i}-${year - 1}`)
            }
          }
        
              const data = {
                labels: [`${monthStats[0]}`, `${monthStats[1]}`, `${monthStats[2]}`, `${monthStats[3]}`, `${monthStats[4]}`],
                datasets: [{
                  label: `${currency}`,
                  data: [firtRate, secondRate, thirdRate, lastRate, currentRate],
                  backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 206, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(153, 102, 255)'
                  ],
                  borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 206, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(153, 102, 255)'
                  ],
                  borderWidth: 2
                }]
              };
          
             return <Line data={data}/>
    }
}

// let all = new All("http://localhost:3000")
let all = new All("")

export default all;
  