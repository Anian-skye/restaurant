/**
 * Created by sky on 2018/8/27.
 */
let customers = ["Tom","Jack","Mary","Blues","Janne","Jane"];
let ifeRestaurant = new restaurant({
    cash: 1000000,
    seats: 2,
    waiter:[],
    cook:[]
});
let TIME = 1000;
//
let waiter1 = new Waiter("waiter",1000);
let waiter2 = new Waiter("waiter",1000);
let cook = new Cook("Jack",1000,addCookStatus());
ifeRestaurant.hire(waiter1);
ifeRestaurant.hire(waiter2);
ifeRestaurant.hire(cook);
let money = document.getElementById("money");
money.innerHTML = "目前饭店资金:"+ifeRestaurant.cash;




//用到的变量
let currentSeats = 2;     //当前座位总数
let emptySeats = [0,1];   // 当前空位
let customerList = new Set();  //顾客集合为了不重复
let currentCustomer = [];   //当前服务的顾客
let currentMenu = [];


//展示厨师当前要做的菜
function showDishes(){
    let menuName = [];
    for(item of currentMenu){
        menuName.push(item.name);
    }
    let span = cookMission.getElementsByTagName("span")[0];
    span.innerHTML = "厨师要做的菜有:"+menuName.join("\n");
}

//增加厨师状态栏
function addCookStatus(){
    let tr = document.createElement("tr");
    cookStatus.appendChild(tr);
    let trs = cookStatus.getElementsByTagName("tr");
    return trs[trs.length-1];
}





document.getElementById("addwaiter").onclick = function(){
    if(ifeRestaurant.waiter.length<3){
        let waiter = new Waiter("waiter",1000);
        ifeRestaurant.hire(waiter);
    }else{
        alert("雇不起这么多服务员啦！");
    }
};

document.getElementById("addcook").onclick = function(){
    let cook = new Cook("cook",1000,addCookStatus());
    ifeRestaurant.hire(cook);
};




//每隔1s有新顾客到来，并查看是否有空位给排队中的顾客。
setInterval(function(){
    let number = parseInt(Math.random()*5);
    while(customerList.has(customers[number])){
        number = parseInt(Math.random()*5);
    }
    if(customerList.size<4){
        customerList.add(customers[number]);
    }
    let customerArray = [...customerList];
    if(currentSeats>0){
        let customer = new Customer(customerArray[0],emptySeats[0]);
        Event.trigger("serveCus",customer);
    }
},1000);



//每隔1s查看是否有空闲的厨师可以做菜
setInterval(function(){

    for(let cook of ifeRestaurant.cook){
        console.log(currentMenu);
        if(cook.status===1&&currentMenu.length!==0){
            cook.status = 0;
            Event.trigger("cookDish",cook);
        }
    }
},1000);







Event.listen("serveCus", function (customer) {
    let p = new Promise(resolve => {
        resolve(customer);
    });
    currentCustomer.push(customer);
    customerList.delete(customer.name);
    currentSeats--;
    emptySeats.splice(0, 1); //占用第一个空位
    //waiDiv.style.marginLeft = "100px";
    //waiterMess.innerHTML = "服务员"+waiter.id+"正在为" + customer.name + "点餐";
    console.log(customer.name + "开始点餐");
    p.then(() => {
        //客户点餐
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(customer.order());
            }, 2 * TIME)
        })
    }).then((menu) => {
        return new Promise(resolve => {
            customer.money = ifeRestaurant.countMoney(menu);
            for (let dish of menu) {
                //已经存在的不需要再做
                let flag = 0;
                for (let current of currentMenu) {
                    if (dish.name === current.name) {
                        current.customer.push(customer);
                        flag = 1;
                    }
                }
                if (flag === 0) {
                    dish.customer.push(customer);
                    currentMenu.push(dish);
                }
            }
            // setTimeout(() => {
            //     showDishes();
            //     resolve(waiter.doOrderwork(customer, menu));
            // }, 0.5 * TIME)
        });
    });
});



Event.listen("cookDish",function(cook){
    let p = new Promise(resolve=>{
        resolve(cook)
    }).then((cook)=>{
        return new Promise(resolve=>{
            setTimeout(()=>{
                cook.status = 1;
            },currentMenu[0].time*TIME);
            resolve(cook.doCookwork(currentMenu[0]));
        })
    }).then((dish)=>{
        return new Promise(resolve=>{
            for(let waiter of ifeRestaurant.waiter){
                console.log(waiter);
                if(waiter.status===1){
                    waiter.status = 0;
                    setTimeout(()=>{
                        resolve(waiter.doServerWork(dish))
                    },0.5*TIME);
                    break;
                }
            }
        })
    }).then(dish=>{
        return new Promise(resolve=>{
            for(let customer of currentCustomer){
                if(dish.customer.indexOf(customer)!==-1){
                    resolve(customer.eat(dish));
                    Event.trigger("checkIn",customer); //用resolve只能触发一次，有顾客同时结账时不能同时执行，所以用事件触发
                }
            }
        });
    })
    //     .then(customer=>{
    //     return new Promise(resolve=>{
    //         if(customer.menu.length===0){
    //             let flag = 0;
    //             for(let waiter of ifeRestaurant.waiter){
    //                 console.log(customer.name+waiter);
    //                 if(waiter.status === 1){
    //                     waiter.status = 0;
    //                     waiter.checkIn(customer);
    //                     flag=1;
    //                     break;
    //                 }
    //             }
    //             resolve();
    //         }
    //     })
    //
    // })
});

Event.listen("checkIn",(customer)=>{
    let flag = 0;
    function checkIn(){
        for(let waiter of ifeRestaurant.waiter){
            console.log(customer.name+waiter);
            if(waiter.status === 1){
                waiter.status = 0;
                waiter.checkIn(customer);
                flag=1;
                break;
            }
        }
    }

    if(customer.menu.length===0){
        checkIn();
        if(flag===0){
            let interval = setInterval(()=>{
                checkIn();
                if(flag===1)
                    clearInterval(interval);
            },1000);
        }
    }
});























