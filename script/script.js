
$(document).ready(()=>{
    const monthText = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", " November", "December"];
    const date = new Date();
    const month = date.getMonth();
    const year = date.getFullYear();
    $("#month").text(monthText[month]);
    $("#year").text(year);
})
 
let incomeVal = 0;
let outcomeVal = 0;
let totalVal = 0;

$("#cb-btn").on("click", ()=>{
    const sign = $(".select-box__input[name='Ben']:checked").val();
    const description = $("#description").val();
    const value = $("#value").val();
    
    if(description && value){
        if(sign === "+"){
            incomeVal += Number(value);
            formatIncome(sign);
            $("#income-list").append(`<li>${description} <span class="span-income"><span class="span-value"><span>${sign}</span> ${value}</span><i class="far fa-times-circle"></i></span></li> `)
        }else{
            outcomeVal += Number(value);
            formatIncome(sign);
            $("#outcome-list").append(`<li>${description} <span class="span-outcome"><span class="span-value"><span>${sign}</span> ${value}</span><i class="far fa-times-circle"></i></span></li> `)
        }
    }
    getBalance();
})

$(".list-container").on("click", "i", function(){
    const lateValue = $(this).parent().text().replace(/\D/g, "");
    const listSign = $(this).parent().text()[0];
    if(listSign === "+"){
        incomeVal -= lateValue;
        formatIncome(listSign);
    }else{
        outcomeVal -= lateValue;
        formatIncome(listSign);
    }
    $(this).parent().parent().remove(); 
    getBalance();
})

/* Balance Function */ 
function getBalance(){
    const balance = $("#balance");
    totalVal = incomeVal - outcomeVal;

    if(totalVal > 0){
        balance.text(`+ ${totalVal}`);
    }else if(totalVal === 0){
        balance.text(totalVal);
    }else{
        totalVal = totalVal * (-1);
        balance.text(`- ${totalVal}`);
    }
    balance.digits();
}

/* Format numbers COMA */ 

$.fn.digits = function(){ 
    return this.each(function(){ 
        $(this).text( $(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") ); 
    })
}

/* Income and Outcome Format Function */

function formatIncome(sign){
    if(sign === "+"){
        if(incomeVal !== 0){
            $("#income-val").text(`+ ${incomeVal}`);
            $("#income-val").digits();
        }else{
            $("#income-val").text(`${incomeVal}`);
        }
    }else{
        if(outcomeVal !== 0){
            $("#outcome-val").text(`- ${outcomeVal}`);
            $("#outcome-val").digits();
        }else{
            $("#outcome-val").text(`${outcomeVal}`);
        }
    }
}