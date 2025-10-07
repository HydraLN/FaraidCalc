
    let containerahli = document.querySelectorAll("input[type='number']");
let jumlahcontainer = document.getElementById("harta");
let jenazahcontainer = document.getElementById("kotor");

let inputvaluestring = "";
let inputvaluenum = 0

/* guarding if theres any weird input*
* it runs every single time and gonna hog 
*your memory >:)*/
containerahli.forEach((input) =>{
    input.addEventListener("input", function() {

        /*have to put more work here cux using
        *type number was a big mistake thankfully
        *theres a fix for it, exepct for decimal */

        input.value = input.value.slice(0, 16);

       inputvaluestring = !/^\d*$/g.test(input.value) ? input.value.replace(/\D/g, "") : input.value;
       inputvaluenum = input.value = "" ? 0 : Number(input.value); 

       input.value = inputvaluestring;
       input.value = inputvaluenum
       
       console.log(/[-+,.]/g.test(input.value));

    })
})


    jumlahcontainer.addEventListener("click", function(event) {
        console.log(event.target)
        if(event.target.classList.contains("next")) {
            console.log(Number(document.getElementById("jumlah").value) === 0)
                
            if (Number(document.getElementById("jumlah").value) === 0) {
                alert("Harta tidak boleh "+ Number(document.getElementById("jumlah").value));
            }
            if (!["laki", "perempuan"].includes(document.getElementById("gender").value))
                alert("Pilih jenis kelamin Muwaris")
            
        }})
    jenazahcontainer.addEventListener("click", function(event) {
        if(event.target.classList.contains("next")) {
            if(Number(document.getElementById("jenazah").value) === 0)
            alert("Isi biaya pengurusan jenazah")
        }
    })





            




