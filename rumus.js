export let warisan = {
    suami : document.getElementById("suami"),
    istri : document.getElementById("istri"),
    ayah : document.getElementById("ayah"),
    ibu : document.getElementById("ibu"),
    kakek: document.getElementById("kakek"),
    nenek: document.getElementById("nenek"),
    anakl: document.getElementById("anaklaki"),
    anakp: document.getElementById("anakcewe"),
    cucul: document.getElementById("cuculaki"),
    cucup: document.getElementById("cucuperempuan"),
    saudaral: document.getElementById("saudaralaki"),
    saudarap: document.getElementById("saudaraperempuan")
    
}

const rumus = {
    suami: 1/2,
    istri: 1/4,
    ibu: 1/3,
    ayah: 0,
    kakek: 1/6,
    nenek: 1/6,
    saudaral: 1/6, 
    saudarap: 1/6
    

}
const rumusdengananak = {
    suami: 1/4,
    istri: 1/8,
    ayah: 1/6,
    ibu: 1/6,
    kakek: 0,
    nenek: 0, 
    saudaral: 0, 
    saudarap: 0

} 

/* no fuckif clue why i do this export thing lol just
*show the result on the rumus damnit */

export function wasiatcomp(wasiatlol, harta) {
    return wasiatlol > harta / 3;
}

let total = 0

export function totalcomp(harta, biayajenazah, hutang, wasiatlol) {
    total = harta - (biayajenazah + hutang + wasiatlol)

    
    return total;
}



document.getElementById("wasiat").addEventListener("click", function(event) {

if(event.target.classList.contains("next")) {


    

const gakebagianpart1ygy = ["kakek"];
const sekarangpart2 = ["cucul", "cucup"];
const saudaragadiajak = ["saudaral", "saudarap"]



function hijab() {

    const anakanaklaki = Number(warisan.anakl.value) || 0;
const anakanakcewe = Number(warisan.anakp.value) || 0;
const cucuculaki = Number(warisan.cucul.value) || 0;
const cucucucewe = Number(warisan.cucup.value) || 0;

console.log(anakanaklaki, anakanakcewe);

const exist = !!(warisan.ayah && warisan.ayah.checked);
const cucuman = (cucuculaki + cucucucewe) > 0;
 const hijabanak = (anakanaklaki + anakanakcewe) > 0;
 if(warisan.ibu.checked) {
    console.log(warisan.ibu.checked)
    warisan.nenek.disabled = true;
    warisan.nenek.checked = false;
 } else {
    warisan.nenek.disabled = false
 }


 /*hijab anak, bikin array buat yang di block terus di smaain stringnya
 * sama isi warisan, basicly warisan[key] => warisan[cucul] diambil dah
 * string cucul di warisan dan set .disabled tapi kalau adaanak
 * is true basicly adaanak is boleean kalau value 0 ya false kalau > 0 true
 * insane ball knowledge required */
 

 /* it was originally supposed to be looping lot of guys but
 * after encounting lot of bugs and lot of mess i dont find this
 * looping useful anymore lol just harcoded atp tbh, but i dont car
 * ill be using this anyway, ts funny cuz im looping one guy lol*/

 /* i honestly want to optimize it using parameter but i dont have time*/
  for(const key of gakebagianpart1ygy) {
    console.log("checking1:", key, warisan[key]);
    /* omg ts really broke everthing*/
    if(warisan[key] && exist) {
        console.log("exist:", exist)
        warisan[key].disabled = exist;
        warisan[key].checked = false;
        
    }
  }


  for(const key of sekarangpart2) {
    console.log("checking2:", key, warisan[key]);
    console.log("hijsbsnsk", hijabanak)
    if(warisan[key]) {
        warisan[key].disabled = hijabanak;
        if(hijabanak) warisan[key].value= "0"
    } 
  }



for(const key of saudaragadiajak) {

    if(warisan[key]) {
        if(hijabanak || exist || cucuman) {
            console.log(cucuman)
        warisan[key].disabled = true
        warisan[key].value = "0"
    } else {
        warisan[key].disabled = false
    }
}
}
}


/* need some sauce over here boi*/
warisan.anakl.addEventListener("input", hijab);
warisan.anakp.addEventListener("input", hijab)
warisan.ibu.addEventListener("change", hijab);
warisan.ayah.addEventListener("change", hijab);
warisan.cucul.addEventListener("input", hijab);
warisan.cucup.addEventListener("input", hijab);


    }})


document.getElementById("ahliwaris").addEventListener("click", function(event) {
    if(event.target.classList.contains("next")) {

        
        let hasil = {};
        let sisahasil = {};

        let gender = document.getElementById("gender");

        let anakl = Number(warisan.anakl.value);
        let anakp = Number(warisan.anakp.value);
        let cucul = Number(warisan.cucul.value);
        let cucup = Number(warisan.cucup.value);
        let saudaral = Number(warisan.saudaral.value);
        let saudarap = Number(warisan.saudarap.value);

        /* buath ashabah*/

function pembagian (hasil, total) {
    /* keep this sum inside the function
    * cuz if you put it outside and call
    * the function twice its gonna add up
    * the sum globally making it dirty sum
    * and not fresh one value 0 the 2nd or 3rd
    * you call this function */

    let sum = 0;
    for (const key in hasil) sum += hasil[key]

    /* create an object on return with the key result
    * and sum, cuz the sum already has declared it 
    *automaticly create the key with the name sum
    *and the value isnide that var 
    * its more pratical like this cuz i
    * dont have to declare an object first
    * im putting it right away*/ 
    return total - sum

}



/* buat buletin */

function pembulatan (hasil) {
    
    for (const key in hasil) {
       
        hasil[key] = Math.round(hasil[key]);

    } 

    return hasil;

}


function pembulatansisa (sisahasil) {

    for(const key in sisahasil) {
        
        sisahasil[key] = Math.round(sisahasil[key])
    }

    return sisahasil;

}
    

    function perhitungan() {

        let adaanak= (anakl + anakp) > 0;
        let adacucu =  (cucul + cucup) > 0;
        let adasaudara = (saudaral + saudarap) > 0;
        let bandingkan = adaanak ? rumusdengananak : rumus;

        /* cek ada anak kaga
        * kalau ada, looping key di objek rumusdengananak
        * bikin yang tampung semua hasil looping di inputanak isinya DoM dengan keynya dan isi keynya rumusnya
        * cek isi inputanak kalau ada salah satu properties inputanak ga ke cekbox yang ga ke cekbox di terminate yang di if statement
        * cek gender laki di grouping dengan key dari looping kalau suami skip (di terminate yang di if statement sama continue), juga dengan perempuan
        * karena  kita dah tau siapa aja yang di terminate dalam objek warisan, dan juga keynya(rumusnya)
        * kita jumlah total dengan rumus[key] -> key ini isinya string jadi kalau rumus[key] itu tuh cocokin string dengan rumus supaya perhitungan tidak salah
        * misal nih ya rumus[key] rumus=ayah [key]= (rumus si ayah di objek rumus (1/6))
        * dan kemana hasilnya? ke objek hasil */

        /* hitung buat kalau ada anak */
        
console.log((typeof total)) 
for(const key in warisan) {
        const inputanak = warisan[key]

if(!inputanak || !inputanak.checked) continue;


        if((gender.value === "laki" && key === "suami") || (gender.value === "perempuan" && key === "istri")) {continue;}
        if(key === "ayah" && !adaanak) {continue;}

        hasil[key] = total * bandingkan[key];

        console.log("perhitungan", hasil, key)

}


/*ashabah part*/

/*ill optimize*/

let untukanak = pembagian(hasil, total)


let warisananak = (2*anakl) + (1*anakp)
let warisancucu = (2*cucul) + (1*cucup)
let warisansaudara = (2* saudaral) + (1 * saudarap)

/*ngecek ada anak apa kaga sama cek valuenya ga 0*/

console.log(untukanak)
if(untukanak > 0){
    if(adaanak > 0) {
    let unit = untukanak / warisananak

    let buatanakl = 2 * unit
    let buatanakp = 1 * unit

    console.log(buatanakl, buatanakp)

    if(anakl > 0)sisahasil.anakLaki = buatanakl;
    if(anakp > 0)sisahasil.anakCewe = buatanakp; 

    console.log(sisahasil)



} else if(adacucu && !adaanak) {
    let unit = untukanak / warisancucu

    let buatcucul = 2 * unit
    let buatcucup = 1 * unit

    if(cucul > 0)sisahasil.cucuLaki = buatcucul;
    if(cucup > 0)sisahasil.cucuCewe = buatcucup; 

    

   
} else if(warisan.ayah.checked && !adaanak) {

    sisahasil.ayah = untukanak
    console.log(sisahasil)

}else if(!adacucu && !adaanak) {
    let unit = untukanak / warisansaudara

    let buatsaudaral = 2 * unit
    let buatsaudarap = 1 * unit

    if(saudaral > 0)sisahasil.saudaraLaki = buatsaudaral;
    if(saudarap > 0)sisahasil.saudaraCewe = buatsaudarap; 

    console.log(sisahasil)

   

}
}



}

perhitungan();

/* no idea why i put the rounding here but it works*/
pembulatan(hasil);
pembulatansisa(sisahasil);
console.log(hasil)  

        /* ini bikin lier asli jadi gini misal anakl itu 4 dan anakp 2 kita
        * kali 2 buat l, 1 buat p = 10, nah 10 ini tu di bagi sama ashabah(misal 80jt) = 8jt
        * nah kita kasih ke anak kita semua 1-1 dengan pembagian for l= 2 * 8jt lalu
        * = 4 anak dapet 16jt  for p = 1 * 8jt  = 2 anak dapet 8 jt
        * kalau dikali 4*16 + 2 * 8 = 80jt mereka dapet
        * jadi ashabah dah habis dah

        * tldr: kalau punya anak cewek aja kalau cowo buang aja*/


       if(total > 0) {
        let result1 = document.getElementById("result1");
        let result2 = document.getElementById("result2");
        let result3 = document.getElementById("result3");

        const display1 = {
        Harta : Number(document.getElementById("jumlah").value) || 0,
        Wasiat :Number(document.getElementById("wasiatinput").value) || 0,
        Hutang : Number(document.getElementById("hutang").value) || 0,
        Jenazah : Number(document.getElementById("jenazah").value) || 0,

        }

        const rumushard = {
            suami: "1/2",
    istri: "1/4",
    ibu: "1/3",
    kakek: "1/6",
    nenek: "1/6",
    saudaral: "1/6", 
    saudarap: "1/6"
        }

        const rumusanakhard = {
             suami: "1/4",
    istri: "1/8",
    ayah: "1/6",
    ibu: "1/6",
        }

        /* ok this one interesting so we loop through display1 and we make var 
        * finaldisplay that holds the formatted value of object now we make
        * element p and it makes {key}: finaldisplay
        * at first i was confuse is it working? how is it gonna match the value of
        * key and its value with final display?
        *  but after deep undertanding because i have 
        * caveman logic, it works, why? cuz finaldisplay is on the loop inside the obejct
        * and it get its finaldisplay from the key on that object and they looping thorugh of em
        * so it will always have the same value and match the key because theyare on the same loop
        * i fr thpught was a genius figuring this out */
        

        console.log("sisahasil before loop:", sisahasil, Object.keys(sisahasil));

let beforetext = document.createElement("span");
beforetext.textContent = `sebelum diberikan ke Ahli Waris/Ashabah`

result1.appendChild(beforetext)
let hr = document.createElement("hr");
hr.classList.add("resulthr")
result1.appendChild(hr)

for(const key in display1) {
    let finaldisplay = display1[key].toLocaleString("id-ID", {style: "currency", currency: "IDR", minimumFractionDigits: 0});
    let p = document.createElement("p");
    p.textContent = `${key}: ${finaldisplay}`;
    result1.appendChild(p);
}

let totalsubs = document.createElement("hr");
totalsubs.classList.add("substraction");

result1.appendChild(totalsubs);

let totalp = document.createElement("p");
let totaldisplay = total.toLocaleString("id-ID", {style: "currency", currency: "IDR", minimumFractionDigits: 0});
totalp.textContent = `Total ${totaldisplay}`;
totalp.classList.add("total")
result1.appendChild(totalp)
/* i cant escape this harcoded thing bro
* im so sorry to anyone looking at my code
* this is because of deadline and im still
* newbie and i find this much easier */
 let adaanak= (anakl + anakp) > 0;
 let adacucu= (cucul + cucup) > 0;

 console.log(adaanak) // true not the problem
        

        let bandingkan = adaanak ? rumusanakhard : rumushard

for (const key in hasil) {
    
    let finaldisplay = hasil[key].toLocaleString("id-ID", {style: "currency", currency: "IDR", minimumFractionDigits: 0});
    let p = document.createElement("p");
    p.textContent = `${key.charAt(0).toUpperCase() + key.slice(1)} dapat ${finaldisplay} karena perhitungan ${bandingkan[key]}`;
    p.classList.add("inherit")
    result2.appendChild(p);
    console.log(hasil)
    console.log(sisahasil)
}


for (const key in sisahasil){ 
    
    let finaldisplay = sisahasil[key].toLocaleString("id-ID", {style: "currency", currency: "IDR", minimumFractionDigits: 0});
    let p = document.createElement("p");
    if(key === "ayah" && !(adaanak && adacucu)) {
         p.textContent = `${key.replace(/^./, c => c.toUpperCase()).replace(/([a-z])([A-Z])/, '$1 $2')} menjadi Ashabah karena tidak ada anak dan dapat ${finaldisplay} `;
    p.classList.add("ashabah")
    result3.appendChild(p);
    console.log(sisahasil)
    } else
    p.textContent = `Setiap ${key.replace(/^./, c => c.toUpperCase()).replace(/([a-z])([A-Z])/, '$1 $2')}  dapat ${finaldisplay}`;
    p.classList.add("ashabah")
    result3.appendChild(p);
    console.log(sisahasil)

}
        

       } 
       
        
    }

})


//this shit sucks ass//    