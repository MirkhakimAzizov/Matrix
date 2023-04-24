"use strict";

let elCalsForm = document.querySelector('.cals-form');
let elList = document.querySelector('.cals-list');
let elInput = document.querySelectorAll('.cals-input');
let elBtn = document.querySelector('.cals-btn');
let elDelete = document.querySelector('.cals-delete');
let Resalt = document.querySelector('.cals-count');
const arrNum = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
let C1 = [],
    C2 = [],
    C3 = [],
    C = [];
let X1, X2, X3;

elCalsForm.addEventListener("click", (evt) => {
    evt.preventDefault();
    let value = evt.target;
    let element = '';
    if (value != element) {
        element = value;
        element.classList.add('active');
    }
    elInput.forEach(el => {
        if (value != el) {
            el.classList.remove('active');
        }
    })
});

elList.addEventListener('click', (evt) => {
    evt.preventDefault();
    let elActive = document.querySelector('.active');
    if (elActive) {
        let value = evt.target.textContent.trim();
        let endValue;
        let endTwoValue = elActive.value.charAt(elActive.value.length - 2) + elActive.value.charAt(elActive.value.length - 1);
        if (value.length == 1) {
            endValue = elActive.value.charAt(elActive.value.length - 1);
        } else if (value.length == 2) {
            endValue = elActive.value.charAt(elActive.value.length - 2) + elActive.value.charAt(elActive.value.length - 1);
        }
        if (arrNum.includes(value) && (endTwoValue == 'X3' || endTwoValue == 'X2' || endTwoValue == 'X1')) {
            false
        } else {
            if (value == '+' || value == '-' || value == '=' || value == 'X3' || value == 'X2' || value == 'X1') {
                if (endValue != '+' && endValue != '-' && endValue != '=' && endValue != 'X3' && endValue != 'X2' && endValue != 'X1') {
                    if (value == '=' && elActive.value.includes('=')) { false } else {
                        elActive.value = elActive.value + value;
                    }
                } else if (value == '-' && endValue == '=') {
                    elActive.value = elActive.value + value;
                }
            } else if (value == '-' && endValue == '=') {
                elActive.value = elActive.value + value;
            } else {
                elActive.value = elActive.value + value;
            }
        }
    }
})

elCalsForm.addEventListener('keydown', (evt) => {
    evt.preventDefault();
});

elDelete.addEventListener("click", (evt) => {
    evt.preventDefault();
    let elActive = document.querySelector('.active');
    if (elActive.value) {
        elActive.value = elActive.value.substring(0, elActive.value.length - 1);
    }
})

elBtn.addEventListener('click', (evt) => {
    evt.preventDefault();
    let arrInput = [];
    elInput.forEach(input => {
        if (input.value && input.value.length) {
            if (input.value.includes('=') && input.value.indexOf(input.value.indexOf('=') + 1)) {
                arrInput.push(input.value);
            }
        }
    });
    let arrValue = [];

    if (arrInput && arrInput.length) {
        arrInput.forEach(input => {
            let index1 = input.indexOf('X1');
            let index2 = input.indexOf('X2');
            let index3 = input.indexOf('X3');
            let index4 = input.indexOf('=');
            index1 >= 0 ? arrValue.push(input.substring(0, index1)) : arrValue.push(0);
            index2 >= 0 ? arrValue.push(input.substring(index1 + 2, index2)) : arrValue.push(0);
            index3 >= 0 ? arrValue.push(input.substring(index2 + 2, index3)) : arrValue.push(0);
            index4 >= 0 ? arrValue.push(input.substring(index4 + 1, input.length)) : arrValue.push(0);
        });

    } else {
        alert('Fill in all the fields correctly');
    }

    C1.push(arrValue[0], arrValue[4], arrValue[8]);
    C2.push(arrValue[1], arrValue[5], arrValue[9]);
    C3.push(arrValue[2], arrValue[6], arrValue[10]);
    C.push(arrValue[3], arrValue[7], arrValue[11]);
    console.log(C1);
    console.log(C2);
    console.log(C3);
    console.log(C);

    function Matrix(arr1, arr2, arr3) {
        let H = [...arr1, ...arr2, ...arr3];
        // console.log(H);
        let Y = (H[0] * H[4] * H[8]) + (H[2] * H[7] * H[3]) + (H[1] * H[5] * H[6]) - (H[6] * H[4] * H[2]) - (H[3] * H[8] * H[1]) - (H[7] * H[5] * H[0]);
        // console.log(Y);
        return Y;
    }

    let D = Matrix(C1, C2, C3);
    let D1 = Matrix(C, C2, C3);
    let D2 = Matrix(C1, C, C3);
    let D3 = Matrix(C1, C2, C);


    if (D == 0) {
        if (D1 == 0 && D2 == 0 && D3 == 0) {
            Resalt.innerHTML = 'Result: Infinitely many solutions';
        } else {
            Resalt.innerHTML = 'Result: Has no solution';
        }
    } else {
        console.log(D, D1, D2, D3);
        X1 = D1 / D;
        X2 = D2 / D;
        X3 = D3 / D;
        Resalt.innerHTML = `
                Result: X<sub>1</sub>=${X1}, X<sub>2</sub>=${X2}, X<sub>3</sub>=${X3}
            `
    }
})