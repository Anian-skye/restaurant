


let customers = ["Tom","Jack","Mary","Blues","Janne","Jane"];
let ifeRestaurant = new restaurant({
    cash: 1000000,
    seats: 2,
    waiter:[],
    cook:[]
});
let TIME = 1000;
//
let waiter = new Waiter("Tom",1000);
let cook = new Cook("Jack",1000);
ifeRestaurant.hire(waiter);
ifeRestaurant.hire(cook);
let money = document.getElementById("money");
money.innerHTML = "目前饭店资金:"+ifeRestaurant.cash;


let currentSeats = 2;
let emptySeats = [0,1];
let customerList = new Set();
let customerArray = [];
let currentMenu = new Set();
let currentCustomer = [];
let lastMenu = [];
let c=0;
let cookBusy = 0;


function showDishes(){
    currentMenuArray  = [...currentMenu ];
    let menuName = [];
    for(item of currentMenuArray){
        menuName.push(item.name);
    }
    let span = cookMission.getElementsByTagName("span")[0];
    span.innerHTML = "厨师要做的菜有:"+menuName.join("\n");
}



function searchDish(name){
    let needCustomer=[];
    for(customer of currentCustomer){
        if(customer.menu){
            for(dish of customer.menu){
                if(dish.name === name){
                    needCustomer.push(customer);
                }
            }
        }
    }
    return needCustomer;
}


function runYibu(taskDef) {   //

    let task = taskDef();
    let result = task.next();

    function step() {
        if (!result.done) {
            if (typeof  result.value === "function") {
                result.value(function (data) {
                    result = task.next(data);
                    step();
                })
            } else {
                result = task.next(result.value);
                step();
            }
        }
    }

    step();

}




document.getElementById("addwaiter").onclick = function(){
    let waiter = new Waiter("waiter",1000);
    ifeRestaurant.hire(waiter);
};

document.getElementById("addcook").onclick = function(){
    let waiter = new Waiter("cook",1000);
    ifeRestaurant.hire(cook);
};






setInterval(function(){
    let number = parseInt(Math.random()*5);
    while(customerList.has(customers[number])){
        number = parseInt(Math.random()*5);
    }
    if(customerList.size<4){
        customerList.add(customers[number]);
    }
    customerArray = [...customerList];
    if(currentSeats>0){
        //customerIn(customerArray[0],emptySeats[0]);
        //Event.trigger("serveCus",customerArray[0],emptySeats[0]);
    }
},1000);











//多个顾客一个厨师一个服务员
// waiter.status = 0;
// function customerIn(name,num){
//     let customer = new Customer(name,num);
//     let p = new Promise(resolve=>{
//             resolve(customer);
//         });
//     lastMenu = [];
//
//     if(waiter.status===0) {
//         currentCustomer.push(customer);
//         customerList.delete(name);
//         waiter.status = 1;
//         currentSeats--;
//         emptySeats.splice(0,1); //占用第一个空位
//         waiDiv.style.marginLeft = "100px";
//         waiterMess.innerHTML = "正在为" + name + "点餐";
//         console.log("开始服务" + name);
//         p.then(() => {
//             //客户点餐
//             return new Promise(resolve => {
//                 setTimeout(() => {
//                     resolve(customer.order());
//                 }, 2 * TIME)
//             })
//         }).then((menu) => {
//             return new Promise(resolve => {
//                 customer.money = waiter.countMoney(menu);
//                 setTimeout(() => {
//                     waiter.status = 0;
//                     resolve(waiter.doOrderwork(customer, menu));
//                 }, 0.5 * TIME)
//             });
//         }).then((menu)=>{
//             for (let dish of menu) {
//                 //已经存在的不需要再做
//                 if (lastMenu.indexOf(dish) === -1) {
//                     currentMenu.add(dish);
//                     lastMenu.push(dish);
//                 }
//             }
//             showDishes();
//
//             setInterval(runYibu(function *(){
//                 if(cookBusy===0){
//                     cookBusy=1;
//                     for(let dish of currentMenu){
//                         if(dish.done===false){
//                             currentMenu.delete(dish);
//                             dish.done = false;
//                             console.log("第" + (++c) + "道菜" + dish.name);
//                             yield cook.doIteCookwork(dish);
//                             showDishes();
//                             let needCustomer = searchDish(dish.name);
//                             waiter.doServerWork();
//                             let index = lastMenu.indexOf(dish);
//                             lastMenu.splice(index,1);
//                             for(let thiscustomer of needCustomer){
//                                 thiscustomer.eat(dish);
//                             }
//                         }
//                     }
//                     cookBusy=0;
//                 }
//             }),100);
//         })
//     }
//
// }




            //async awiat循环做菜上菜结账方法
        //     .then(async (menu) => {
        //     for (let dish of menu) {
        //         //已经存在的不需要再做
        //         if (lastMenu.indexOf(dish) === -1) {
        //             currentMenu.add(dish);
        //             lastMenu.push(dish);
        //         }
        //     }
        //     showDishes();
        //     for (let dish of currentMenu) {
        //         //绑定定时器之前先删除,否则同一道菜会重复绑定定时器
        //         currentMenu.delete(dish);
        //         console.log("第" + (++c) + "道菜" + dish.name);
        //         await new Promise(resolve => {
        //             setTimeout(() => {
        //                 resolve(cook.doCookwork(dish));
        //             }, dish.time);
        //         }).then(async (dish) => {
        //             showDishes();
        //             let needCustomer = searchDish(dish.name);
        //             waiter.doServerWork();
        //             for (let customer of needCustomer){
        //                 await new Promise((resolve) => {
        //                     resolve(customer.eat(dish));
        //                 })
        //             }
        //         })
        //     }
        // })
            // return new Promise((resolve) => {
            //     resolve(menu);
            // })
        // }).then(() => {
        //     return new Promise(resolve => {
        //         console.log("调用第"+(++c));
        //         for (let i = 1, len = currentCustomer.length; i <= len; i++) {
        //             customer = currentCustomer[i-1];
        //             console.log(customer.name,customer.menu.length,customer.done);
        //             if(customer.menu.length===0&&customer.done===false){
        //                 setTimeout(() => {
        //                     console.log("结账");
        //                     waiDiv.style.marginLeft = "100px";
        //                     waiterMess.innerHTML = "顾客"+customer.name+"正在结账,共消费" + customer.money;
        //                     ifeRestaurant.cash += customer.money;
        //                     money.innerHTML = "目前饭店资金:" + ifeRestaurant.cash;
        //                     customer.done = true;
        //                     resolve();
        //                 }, 7 * TIME+i*TIME);
        //             }
        //         }
        //
        //     });
        // })




































//只有一个顾客
// let i = 0,
//     cuslength = customers.length;
// function customerIn(){
//         waiDiv.style.marginLeft = "100px";
//         waiterMess.innerHTML = "顾客正在点餐";
//         removeAll();
//         menu.innerHTML = "";
//         let j=i+1;
//         let left = cuslength-j;
//         customerList.innerHTML = "还有"+left+"个客户在等待";
//         let customer = new Customer();
//         let p = new Promise(resolve=>{
//             console.log("开始服务第"+j+"个客户");
//             customer.done = false;
//             customer.id = i;
//             resolve(customer);
//         });
//
//         p.then(()=>{
//             //客户点餐
//             return new Promise(resolve=>{
//                 setTimeout(()=>{
//                     resolve(customer.order());
//                 },3*TIME)
//             })
//         }).then((menu)=>{
//             return new Promise(resolve=>{
//                 customer.money = waiter.countMoney(menu);
//                 console.log(customer.money);
//                 setTimeout(resolve(waiter.doOrderwork(menu)),0.5*TIME);
//             });
//         }).then(async (dishes)=>{
//             console.log("做菜");
//             for(dish of dishes){
//                 // await等待promise被决议后再继续执行
//                 await new Promise(resolve=>{
//                     setTimeout(()=>{
//                         resolve(cook.doCookwork(dish));
//                     },dish.time);
//                 }).then((dish)=>{
//                     waiter.doServerWork(dish);
//                     customer.eat(dish);
//                 })
//             }
//             return new Promise(resolve=>{
//                 resolve(dishes);
//             });
//         }).then(()=>{
//             return new Promise(resolve=>{
//                 setTimeout(()=>{
//                     console.log("结账");
//                     waiDiv.style.marginLeft = "100px";
//                     console.log(customer.money);
//                     waiterMess.innerHTML = "顾客正在结账,共消费"+customer.money;
//                     ifeRestaurant.cash+=customer.money;
//                     money.innerHTML = "目前饭店资金:"+ifeRestaurant.cash;
//                     resolve();
//                 },7*TIME);
//             });
//         }).then(()=>{
//             return new Promise((resolve)=>{
//                 i++;
//                 if(i<cuslength){
//                     setTimeout(() => {
//                         customerIn();
//                     }, 500)
//                 }
//                 resolve();
//             })
//         })
// }
//
// customerIn();










//命令模式
// function orderDish(value){
//     return new Promise(resolve =>{
//         setTimeout(()=>{
//             value.order(orderDishCommand);
//             resolve(value);
//         },3000);
//     })
// }
//
// function cookDish(value){
//     return new Promise(resolve =>{
//         setTimeout(()=>{
//             cook.doCookwork(waiter.menu,cookFinishCommand);
//             resolve(value);
//         },500);
//     })
// }
//
// function eatDish(value){
//     return new Promise(resolve=>{
//         value.eat(waiter.dish);
//         if(value.done){
//             resolve(value);
//         }
//     });
// }
//
// function nextCustomer(value){
//     return new Promise(resolve=>{
//         setTimeout(function(){
//             console.log("顾客"+value.id+"结账完毕");
//         },500);
//     })
// }


// finishOrder = p.then(orderDish);
//
// let dishesNum = waiter.menu.length;
//
// promiseList = [];
// for(let i=0;i<dishesNum;i++){
//     let p = new Promise(resolve=>{
//         setTimeout(()=>{
//             cook.doCookwork(waiter.menu[i],cookFinishCommand);
//             resolve(value);
//         },waiter.menu[i].time);
//     });
//     promiseList.push(p);
// }
//
// let finishCook = Promise.all(promiseList);
//
// finishOrder.then(()=>{
//     return finishCook;
// }).then(eatDish)
//     .then(nextCustomer);

// p.then(orderDish)
//     .then(cookDish)
//     .then(eatDish)
//     .then(nextCustomer);



















