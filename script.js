import { wasiatcomp, totalcomp, warisan } from './rumus.js'

//i can make a function here so no need to wrting same old shit

/*
function waitholup(elem, target, elemclass, targetclass, goback, SOLDIER) {
    
    document.getElementById(elem).addEventListener("click", function (event) {
        const required = document.querySelectorAll("input[required]");
        let option = document.getElementById("gender")
        required.forEach((require) => {


if(event.target.classList.contains("next") && require.value && (option.value === "laki" || option.value === "perempuan")) {
        document.getElementById(elem).classList.remove(elemclass); 
        document.getElementById(target).classList.add(targetclass)
            
        } else if (event.target.classList.contains("back")) {
         document.getElementById(goback).classList.add(elemclass);
         document.getElementById(SOLDIER).classList.remove(targetclass)
        }
    })
        })
        
       
    } 
*/

/* ihave no fkinh clue why using var for harta not working i have to use the document method instead */

document.addEventListener("DOMContentLoaded", () => {
   
console.log("script");
    let wasiat = document.getElementById("wasiat");
let ahliwaris = document.getElementById("ahliwaris");
let kotor = document.getElementById("kotor");
let pilihan = document.getElementById("pilihan");
let jumlah = document.getElementById("jumlah");
let option = document.getElementById("gender");
let result1 = document.getElementById("result1");
let result2 = document.getElementById("result2");
let result3 = document.getElementById("result3");
let lastresult = document.getElementById("lastresult");

   console.log(document.getElementById("harta"))
document.getElementById("harta").addEventListener("click", function (event) {
    let hartavalue = Number(jumlah.value)
        
if(event.target.classList.contains("next") && hartavalue && (option.value === "laki" || option.value === "perempuan")) {
        document.getElementById("harta").classList.add("kill-harta"); 
        document.getElementById("kotor").classList.add("active-kotor"); 
        

  }
    
  }
)


kotor.addEventListener("click", function(event) {
        let harta = Number(document.getElementById("jumlah").value);
        let jenazahvalue = Number(document.getElementById("jenazah").value);
        let hutangvalue = Number(document.getElementById("hutang").value)

        if(event.target.classList.contains("next") && jenazahvalue) {
            kotor.classList.add("kill-kotor");
            wasiat.classList.add("active-wasiat");

            let total2 = Number(harta - (jenazahvalue + hutangvalue));

            
            let maxwasiat = 0
            // check whether max > 0 if true pass if not maxwasiat stays 0 (the false 0 isnt doing anything tbh)
            total2 /3 > 0? maxwasiat = total2/3 : 0

            let wasiattext = [{text:"Isi bila Muwaris memiliki Wasiat", class:"delete"}, {text: `Jumlah maksimum wasiat adalah ${maxwasiat.toLocaleString("id-ID", {style: "currency", currency: "IDR", minimumFractionDigits: 0})}`, class: "delete"}]


            //make a nodelist and remove each of that list if exist
            wasiat.querySelectorAll(".delete").forEach(classes => {
                classes.remove();
            });

        
            for (const key of wasiattext) {
                let p = document.createElement("p");
                p.textContent = key.text;

                if(key.class) p.className = key.class


                wasiat.insertBefore(p, wasiat.querySelector("span"))


            }
            
            
            


        } else if(event.target.classList.contains("back")) {
            kotor.classList.remove("active-kotor");
            document.getElementById("harta").classList.remove("kill-harta")
        }
    })




wasiat.addEventListener("click", function(event) {

    
    
    let wasiatlol = Number(document.getElementById("wasiatinput").value);
let biayajenazah = Number(document.getElementById("jenazah").value);
let hutang = Number(document.getElementById("hutang").value);
let harta = Number(document.getElementById("jumlah").value);

let totalbusted = totalcomp(harta, biayajenazah, hutang, wasiatlol);

if(event.target.classList.contains("next")) {

    const display2 = {
        Harta : Number(document.getElementById("jumlah").value) || 0,
        Wasiat :Number(document.getElementById("wasiatinput").value) || 0,
        Hutang : Number(document.getElementById("hutang").value) || 0,
        Jenazah : Number(document.getElementById("jenazah").value) || 0

    }
    let alerting = display2.Harta - (display2.Hutang + display2.Jenazah)
    if(wasiatcomp(wasiatlol, harta)) {
        alert(`Rp. ${wasiatlol} melebihi 1/3, (${alerting/3})`);
    } else if(totalbusted < 0) {
        result1.classList.add("active-result1");
        wasiat.classList.add("kill-wasiat");
        lastresult.style.display = "block";
        document.getElementById("resultwaris").style.display = "none"
        

        for(const key in display2) {
            let finaldisplay = display2[key].toLocaleString("id-ID", {style: "currency", currency: "IDR", minimumFractionDigits: 0});
            let p = document.createElement("p");
            p.textContent = `${key}: ${finaldisplay}`;
            
            result1.appendChild(p)
            
        }
result1.appendChild(document.createElement("hr"))

let ptotal = document.createElement("p");
ptotal.classList.add("total")
ptotal.textContent = `Total ${totalbusted.toLocaleString("id-ID", {style: "currency", currency: "IDR", minimumFractionDigits: 0})}`        
result1.appendChild(ptotal)
    
     } else  {
        const optionvalue = option.value
        wasiat.classList.add("kill-wasiat");
        ahliwaris.classList.add("active-ahliwaris");

        (optionvalue === "laki" ? document.getElementById("containersuami") : document.getElementById("containeristri")).remove();

        totalcomp(harta, biayajenazah, hutang, wasiatlol);
        
        console.log(totalcomp(harta, biayajenazah, hutang, wasiatlol))
        console.log (wasiatlol, biayajenazah, hutang, harta)
    
     }
    
    
    }  else if(event.target.classList.contains("back")) {
        wasiat.classList.remove("active-wasiat");
        kotor.classList.remove("kill-kotor");

    
    }
})

ahliwaris.addEventListener("click", function(event) {

//ok so i found interisting bug here so i do know that i use muktiple
//eventlistener that has the same condition if(event.target.classList.contains("next"))
//now that listener run my div createing shit even when outside of ahliwaris listener
//reason because js dont give a damn about the eventlistener, take this with example
// 1. i load the page, i click next > creates 1 div in result4
// 2. i click next again it creates another div
// 3. and so on until it multiplying on the lastresult
// the reason? well simply becuase js dont care about where the event
// listener fires and IF the condition same like here classlist next
// it will always maing that div on-demand, after i click the ahliwaris
// button next it multplying, the fix? either add a condition on the div create that if the div already
// created the second listener dont create it no more so it only create once
// (its purposefully creating on the first click so i can make a condition if the div already exist
// with !element) so the 2 listener knows the div already created so it doesnt create no more
// 2nd fix is make the condition classlist for creating div different with the rest, i prefer this solution 

    if(event.target.classList.contains("next")) {

        let existheir = Object.keys(warisan).some(key => warisan[key].checked || Number(warisan[key].value) > 0);
        //check if there are no heirs
        //looping through warisan[key] = the value of the key or label which contain
        //dom and add condition .checked and .value
        
        let existdiv = document.getElementById("result4")
        if(!existheir && !existdiv) {
            console.log("you got here")
            result1.classList.add("active-result1")
            lastresult.style.display = "block";
            document.getElementById("resultwaris").style.display = "none"
            ahliwaris.classList.add("kill-ahliwaris");
        
        
        
            let people = [
                {text: "Karena tidak ada ahli waris/ashabah hartanya diberikan kepada kerabat seperti Paman, Bibi, atau sepupu", classnt:"people p1"},
                {text: "Tapi bila Muwaris tidak memiliki keluarga/kerabat hartanya harus diberikan ke Maitul Baal", classnt:"people p2"},
                {text: "Wait for the next feature :)"}
            ]

            let div = document.createElement("div");
            let h3 = document.createElement("h3");
            h3.textContent = "Tidak ada Ahli Waris/Ashabah"
            div.id = "result4"

            
            lastresult.insertBefore(div, document.getElementById("refresh"))
            div.appendChild(h3);
            div.appendChild(document.createElement("hr"));

            //we looping through people and key directly access the properties of the object
            //so key = {} and if we do like key.text we get the value of that 
            //text on each key
            for(const key of people) {
                let p = document.createElement("p")
                p.textContent = key.text

                if(key.classnt) p.className = key.classnt
                
                div.appendChild(p)
            }

            div.lastElementChild.style.fontSize = "13px"
            
        
            
        } else {
        
    result1.classList.add("active-result1");
    result2.classList.add("active-result2");
    result3.style.display = "block"

    lastresult.style.display = "block"
    ahliwaris.classList.add("kill-ahliwaris");
        }
            
    } else if(event.target.classList.contains("back")) {
        ahliwaris.classList.remove("active-ahliwaris");
        wasiat.classList.remove("kill-wasiat");
    }
})

})




    








