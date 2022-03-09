// var john = {
//     firstName: 'obolo',
//     lastName:'prince',
//     job: 'teacher',
//     birthYear: 1990,
//     likes:['football', 'writing', 'swinning'],
//     blood: 'AB',
//     calcAge:function (year) {
//         return year - this.birthYear
//     },

//     yearRetirement:function (name, years) {
//         var yearOld = years - this.birthYear;
//         john.workAge = yearOld;

//         return document.write(name +' ' + ' ' + this.workAge + ' ' + 'has to leave tomorrow')
//     },
    
//     bloodType:function(normal , middle){
//         if (this.blood === normal) {
//             return `${this.lastName}  is safe`
//         }else if(this.blood === middle){
//             return `${this.lastName} is partially safe`
//         }else{
//             return `${this.lstName} is not safe`
//         }
//     }
// }

// console.log(john.bloodType('AA', 'AB'));


// // document.write(john.calcAge(2022)) 
// document.write(john.firstName  + ' '+ 'is a' + ' '  + john.job +'.') ;

// john.yearRetirement(' ' +'Peter', 2008) ;


var budgetControl = (function () {

    var Expense = function(id ,description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function(id ,description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        allItems:{
            exp:[],
            inc:[]
        },

        totals:{
            exp:0,
            inc:0
        }
    };

    return {
        addItems:function(type, des, val){
            var newItem ,ID;
             
            //create ID
            
            if (data.allItems[type].length > 0 ) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            }else{
                ID = 0
            }
           
                
            //create items based on exp and inc

            if (type === 'exp') {
                newItem =new Expense(ID, des, val);
            }else if (type === 'inc'){
                newItem =new Income(ID, des, val);
            }


            //push newitems into either exp[] or inc[]
            data.allItems[type]?.push(newItem);

            //return newitem
            return newItem;
        },

        test:function(){
            console.log(data);
        }
    }
    
})();
    

var UIcontrol = (function (){

    var DOMinput = {
        inputSelect:'.nav-base__select',
        inputDes:'.nav-base__des',
        inputValue:'.nav-base__value',
        inputCheck:'nav-base__check'
    }

    return {
        getInput: function (){
            
            return {
                select: document.querySelector(DOMinput.inputSelect).value,
                des: document.querySelector(DOMinput.inputDes).value,
                value: document.querySelector(DOMinput.inputValue).value
            }

        },

        getDOM:function(){
            return DOMinput
        }
    }

})();


var nextControl = (function (budCtrl, uiCtrl) {

    var getEventListener = function(){

        var DOM = uiCtrl.getDOM();
       
        document.getElementById(DOM.inputCheck).addEventListener('click', eventsAll);
    
        document.addEventListener('keypress', function(event) {
        
        if (event.keycode === 13  || event.which === 13) {

           eventsAll();

        }

        });

    }

    var eventsAll = function() {
        var input, newLine;
        //get the field input data
        input = uiCtrl.getInput(); 

        //addthe item to the budget controller
        newLine = budCtrl.addItems(input.type, input.description, input.value);

        //add the item to the the ui 

        //calculate the budget 

        //display the budget on the ui

    }

    return {
        init : function(){
            getEventListener();
            console.log('application has started');   
        }
    }

})(budgetControl,  UIcontrol);

nextControl.init();