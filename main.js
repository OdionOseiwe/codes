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
        this.percentage = -1;
       
        Expense.prototype.calculatePercentage = function(totalIncome) {
            if (totalIncome > 0) {
                this.percentage = Math.round((this.value / totalIncome) * 100)
            }else{
                this.percentage = -1
            }
        }

        Expense.prototype.getCalPercentage = function() {
            return this.percentage
        }
    };

    var Income = function(id ,description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var calculateTotal = function (type) {
        sum = 0;
        data.allItems[type].forEach(function (cur) {
            sum += cur.value   
        });

        data.totals[type] = sum;
    }

    var data = {
        totals :{
            exp:0,
            inc:0
        },

        allItems : {
            exp :[],
            inc :[]
        },

        budget: 0,
        percentage: -1
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
  
            data.allItems[type].push(newItem);

            //return newitem
            return newItem;
        },

        deleteItem:function(type, id) {
            let ids, index;
            ids =  data.allItems[type].map(function(current) {
               return current.id 
            });

            index = ids.indexOf(id)

            if (index !== -1) {
                data.allItems[type].splice(index , 1 )
            }

        },

        calculatepercentages:function() {
            data.allItems.exp.forEach(cur => {
                cur.calculatePercentage( data.totals.inc)
            });
           
        },

        getcalper:function() {
            let allper =  data.allItems.exp.map(function (cur) {
                return cur.getCalPercentage() 
            })

            return allper
        },

        calculateBudget:function() {
            
            //calculate total ic ad exp
            calculateTotal('inc');
            calculateTotal('exp');
            
            //calculate the budget  : ic - exp
            data.budget = data.totals.inc - data.totals.exp

            if (data.totals.inc > 0) {
                //calculate the percetage of i we
                data.percentage =Math.round((data.totals.exp / data.totals.inc) * 100)
                //exp = 100  inc = 200 therefore 100/200 = 0.5*100 = 50% 
            }else{
                data.percentage = -1
            }
            
        },

        returnBudget:function() {
            return {
                totalInc : data.totals.inc,
                totalExp : data.totals.exp,
                budget : data.budget,
                percetage :  data.percentage
            }
        },

        test:function(){
            console.log(data);
        }
    };
    
})();
    

var UIcontrol = (function (){

    var DOMinput = {
        inputType:'.nav-base__select',
        inputDes:'.nav-base__des',
        inputValue:'.nav-base__value',
        inputCheck:'.nav-base__check',
        inputExpense:'.expense-part',
        inputIncome:'.income-part',
        incomeLabel:'.incomes__right',
        expenseLabel:'.expenses__left',
        budgetLabel:'.header__1',
        expensePer:'.expenses__per',
        deleteButon:'.body',
        expperLabel:'.percentage',
        inputMouth: '.Mouth'
    };

    let formantnumber = function(num,type) {
        let splitnum, dec, int ;
        
        num = Math.abs(num);
        num = num.toFixed(2);
        splitnum =  num.split('.');
        int =  splitnum[0];
        if (int.length > 3) {
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3 , 3)
        }
        dec =  splitnum[1]

        return (type === 'exp' ? '-':  '+') + ' ' + int + '.' + dec;
    }

    return {
        getInput: function (){
            
            return {
                type: document.querySelector(DOMinput.inputType).value,
                description: document.querySelector(DOMinput.inputDes).value,
                value: parseFloat(document.querySelector(DOMinput.inputValue).value)  
            }

        },

        addInput:function (obj,type) {
            let html,newHtml, element;
            if (type === 'inc') {
                element =  DOMinput.inputIncome;
                html = '<div class="income" id="inc-%id%"><div class="income__description">%description%</div><div class="income__value">%value%</div><div class="income__delete"><button class="income__delete income__delete--btn"><svg class="income__del"><use xlink:href="sass/symbol-defs.svg#icon-close"></use></svg></button></div>' 
            }else if(type === 'exp'){
                element = DOMinput.inputExpense;
                html = ' <div class="expense" id="exp-%id%"><div class="expense__description">%description%</div><div class="expense__value">%value%</div><div class="percentage">---</div><div class="expense__delete"><button class="expense__delete--btn"><svg class="expense__del"><use xlink:href="sass/symbol-defs.svg#icon-close"></use></svg></button></div></div>'
            }
            newHtml = html.replace('%id%', obj.id);
            newHtml =  newHtml.replace('%description%', obj.description);
            newHtml =  newHtml.replace('%value%', formantnumber( obj.value,  type));
            
            document.querySelector(element).insertAdjacentHTML('beforeend',newHtml);  
        },

        clearField:function () {
            let fields, arrField;
            fields =  document.querySelectorAll(DOMinput.inputDes + ',' + DOMinput.inputValue);

            arrField = Array.prototype.slice.call(fields);

            arrField.forEach(current => {  //its also receives index , array, current
               current.value = "";
            });

            arrField[0].focus();

            // let des, val;
            // des = document.querySelector(DOMinput.inputDes);
            // des.value = "";

            // value = document.querySelector(DOMinput.inputValue);

            // val.value = 0;
        },

        deleteParent:function(selectorID) {
            let el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);
        },

        displayBudget:function(obj) {
            let type;
            obj.budget > 0 ? type = 'inc' : type = 'exp';
            document.querySelector(DOMinput. incomeLabel).textContent =  formantnumber(obj.totalInc,'inc'); 
            document.querySelector(DOMinput. expenseLabel).textContent =  formantnumber(obj.totalExp, 'exp');
            document.querySelector(DOMinput. budgetLabel).textContent =   formantnumber(obj.budget, type);
            if (obj.percentage > 0) {
                document.querySelector(DOMinput. expensePer).textContent =   obj.percentage + '%';
            }else{
                document.querySelector(DOMinput. expensePer).textContent =   '---';
            }
           
        },

        displayPercentage:function(percentage) {
            let fields = document.querySelectorAll(DOMinput.expperLabel)
            
            //another alternative but I (me wen write the code) don't understand

            // let nodeList = function(list , callBack) {
            //     for (let i = 0; i < list.length; i++) {
            //         callBack(list[i], i)     
            //     }
            // };
            
            // nodeList(fields, function(current, index){
            //     current.innerText = percentage[index] + '%';
            // });

            if (percentage > 0) {
                Array.from(fields).forEach(function(field) {
                    field.innerText =  percentage + '%';
                });
            }else{
                percentage = -1
            }

        },

        displayDate:function(){
            let today, year,  months,  month,  day,  days, date;
            today = new Date();
            year = today.getFullYear();
            months = ['january', 'febuary', 'march' , 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']
            month = today.getMonth();
            day = today.getDay();
            days = ['sunday' ,'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
            date = today.getDate();

            document.querySelector(DOMinput.inputMouth ).textContent = date + ' ' + '('+days[day] +')' + ' ' + months[month] + ' ' + year;
        },

        changeColor:function() {
            let focuses = document.querySelectorAll(DOMinput.inputType + ',' +
                                      DOMinput.inputDes + ',' +
                                      DOMinput.inputValue)
            
            Array.from(focuses).forEach(focus => {
                focus.classList.toggle('redfocus')
            }); 
            
            document.querySelector(DOMinput.inputCheck).classList.toggle('red');
        },
        
        getDOM:function(){
            return DOMinput
        }
        
    }

})();

        

var nextControl = (function (budCtrl, uiCtrl) {

    var getEventListener = function(){

        var DOM = uiCtrl.getDOM();
    
        document.querySelector(DOM.inputCheck).addEventListener('click', eventsAll);
    
        document.addEventListener('keypress', function(event) {
        
        if (event.keycode === 13  || event.which === 13) {

           eventsAll();

        }

        });

        document.querySelector(DOM.deleteButon).addEventListener('click', deleteEvent);
        document.querySelector(DOM. inputType).addEventListener('change',  uiCtrl.changeColor);    

    } ;

    var eventsAll = function() {
        var input, newLine;
        //get the field input data
        input = uiCtrl.getInput(); 

        if ( input.description !== " " &&   !isNaN(input.value) && input.value > 0) {
            //addthe item to the budget controller
            newLine = budCtrl.addItems(input.type, input.description, input.value);

            //add the item to the the ui 
            uiCtrl.addInput(newLine, input.type)

            //clear fields
            uiCtrl.clearField()

            //calculate budget 
            upDateBudget()

            percentage() 
        }
    };

    var upDateBudget= function() {

        //calculate budget
        budCtrl.calculateBudget()

        //return the budget
        let budget = budCtrl.returnBudget();

        //display the budget
        uiCtrl.displayBudget(budget);
    }; 
    
    let deleteEvent = function (e) {
        let itemID, splitID, type, id
        itemID = e.target.parentNode.parentNode.parentNode.id;
        if ( itemID) {
            splitID =  itemID.split('-');
            type = splitID[0];
            id = parseInt(splitID[1]);

            //delete ite

            budCtrl.deleteItem(type, id)

            //display it o the ui
            uiCtrl.deleteParent(itemID)

            //update the budget
            upDateBudget()

            percentage() 
        }
    }

    let percentage = function() {
        //calculate percetage
        budCtrl.calculatepercentages()
        
        //get the percetage 
        let perc = budCtrl.getcalper()

        //display the percetage o the ui 
        uiCtrl.displayPercentage(perc)
    }

    return {
        init : function(){
            getEventListener();
            uiCtrl.displayDate();
            uiCtrl.displayBudget({
                totalInc : 0,
                totalExp : 0,
                budget : 0,
                percetage : -1   
            });
            console.log('application has started');   
        }
    }

})(budgetControl,  UIcontrol);

nextControl.init();