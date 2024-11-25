goToStep = (step) => {
    document.querySelectorAll('.step').forEach((element) => {
        element.classList.add('hidden');
    });
    document.getElementById(`step${step}`).classList.remove('hidden');
}

addRow = (tableId, step) => {
    const table = document.getElementById(tableId).querySelector('tbody');
    const newRow = document.createElement('tr');

    newRow.innerHTML = `
        <td contenteditable="true" class="step${step}Category">New Category</td>
        <td><input type="number" placeholder="Amount($)" class="number-input step${step}Number"></td>
    `;
    table.appendChild(newRow);
    
}

//step 1 
const step1 = document.querySelector('#step1');
const companyName = document.querySelector('#companyName');
const address = document.querySelector('#address');
const dateCreated = document.querySelector('#dateCreated');
const dateIssued = document.querySelector('#dateIssued');
const firstStepRequired = document.querySelectorAll('.firstStepRequired');
const dateIssuedLabel = document.querySelector('#dateIssuedLabel');

const data = {};
step1.addEventListener('submit', (e)=>{
    e.preventDefault();
    let isValidStep1 = true;

    if (!companyName.value) {
        firstStepRequired[0].style.display = "inline";
        isValidStep1 = false;
    };

    if (!address.value) {
        firstStepRequired[1].style.display = "inline";
        isValidStep1 = false;
    };

    if (!dateCreated.value) {
        dateIssuedLabel.style.marginLeft = "53px";
        firstStepRequired[2].style.display = "inline";
        isValidStep1 = false;
    };

    if (!dateIssued.value) {
        firstStepRequired[3].style.display = "inline";
        isValidStep1 = false;
    };
    if (isValidStep1) {
        data.companyName = companyName.value;
        data.address = address.value;
        data.dateCreated = dateCreated.value;
        data.dateIssued = dateIssued.value;

        firstStepRequired[0].style.display = "none";
        firstStepRequired[1].style.display = "none";
        firstStepRequired[2].style.display = "none";
        firstStepRequired[3].style.display = "none";

        goToStep(2);
        
        //step 2
        const step2 = document.querySelector('#step2');
        

        step2.addEventListener('submit', (e) => {
            e.preventDefault();
            const step2Category = document.querySelectorAll('.step2Category');
            const step2Number = document.querySelectorAll('.step2Number');
            const secondStepRequiredAmount = document.querySelector('.secondStepRequiredAmount');

            let isValid = true;

            step2Number.forEach((input) => {
                if (!input.value) {
                    secondStepRequiredAmount.style.display = "inline";
                    isValid = false;
                } 

            });

            step2Category.forEach((input) => {
                if (input.textContent == "New Category" || !input.textContent) {
                    input.textContent = "Please input valid value";
                    input.style.color = "red";
                    input.addEventListener(('input'), (e)=>{
                        input.style.color = "#2c2c5f";
                    })
                    isValid = false;
                }
            });

            console.log(step2Number);
            
            if(isValid) {
                let step2Items = [];
                //save every input
                for (let i = 0; i < step2Number.length; i++){
                    item = {
                        number: step2Number[i].value,
                        category: step2Category[i].textContent
                    }
                    step2Items.push(item);
                    
                } 
                data.step2Items = step2Items;
                

                goToStep(3);


                //step 3
                const step3 = document.querySelector('#step3');

                step3.addEventListener('submit', (e) =>{
                    e.preventDefault();

                    const step3Category = document.querySelectorAll('.step3Category');
                    const step3Number = document.querySelectorAll('.step3Number');
                    const thirdStepRequiredAmount = document.querySelector('.thirdStepRequiredAmount');

                    //set isValid = false if there's blank cell
                    step3Number.forEach((input) => {
                        if(!input.value){
                            thirdStepRequiredAmount.style.display = "inline";
                            isValid = false;
                        }
                    });
                    step3Category.forEach((input) => {
                        if(input.textContent == "New Category" || !input.textContent){
                            input.textContent = "Please input valid value";
                            input.style.color = "red";
                            input.addEventListener(('input'), (e)=>{
                                input.style.color = "#2c2c5f";
                            })
                            isValid = false;
                        }
                    })
                    if (isValid){
                        let step3Items = [];
                        //save every input
                        for (let i = 0; i < step2Number.length; i++){
                            item = {
                                number: step3Number[i].value,
                                category: step3Category[i].textContent
                            }
                            step3Items.push(item);
                            
                        } 
                        data.step3Items = step3Items;

                        window.location.href = "../html/financialReport.html";
                    }

                    localStorage.setItem("financialData", JSON.stringify(data));
                });
            }
        });
    }
    
});


