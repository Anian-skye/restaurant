/**
 * Created by sky on 2018/8/20.
 */
// 餐厅类
// 属性：金钱，座位数量、职员列表
// 方法：招聘职员，解雇职员
// 职员类
// 属性：ID，姓名，工资
// 方法：完成一次工作
// 服务员类，继承自职员
// 完成一次工作：如果参数是个数组，则记录客人点菜，如果参数不是数组则是上菜行为
// 厨师类，继承自职员
// 完成一次工作：烹饪出菜品
// 顾客类
// 方法：点菜，吃
// 菜品类
// 属性：名字、烹饪成本、价格

let foodList = [
    {
        name: '清蒸螃蟹',
        cost: 50,
        price: 100,
        time:4000,
        customer:[]
    },
    {
        name: '麻辣小龙虾',
        cost: 80,
        price: 200,
        time:4000,
        customer:[]
    },
    {
        name: '水煮活鱼',
        cost: 60,
        price: 120,
        time:4000,
        customer:[]
    },
    {
        name: '三鲜汤',
        cost: 8,
        price: 15,
        time:3000,
        customer:[]
    },
    {
        name: '蛋炒饭',
        cost: 6,
        price: 12,
        time:3000,
        customer:[]
    },
    {
        name: '火锅',
        cost: 65,
        price: 150,
        time:3000,
        customer:[]
    }
];

let cusDiv = document.getElementsByClassName("customer");
let waiDiv = document.getElementById("waiter");
let cookStatus = document.getElementById("cookStatus");
// let eatStatus = document.getElementById("eatStatus").getElementsByTagName("table")[0];
// let menuDiv = document.getElementById("menu");
let waiterMess = document.getElementById("waiterMess");
let cookMission = document.getElementById("cookMission");








function addItem(name,status,table){
    let tr = document.createElement("tr");
    let nameTd = document.createElement("td");
    nameTd.innerHTML = name;
    let statusTd = document.createElement("td");
    statusTd.innerHTML = status;
    tr.appendChild(nameTd);
    tr.appendChild(statusTd);
    table.appendChild(tr);
}

function removeAll(table){
    let trs = table.getElementsByTagName("tr");
    for(let i=0,len = trs.length;i<len;i++){
        table.removeChild(trs[0]);
    }
}


class restaurant{
    constructor(resObj){
        this.cash = resObj.cash;
        this.seats = resObj.seat;
        this.cook = resObj.cook;
        this.waiter = resObj.waiter;
    }
    hire(employee){
        if(employee instanceof Cook){
            let cid = this.cook.length+1;
            employee.id = cid;
            employee.status = 1;
            this.cook.push(employee);
        }
        else if(employee instanceof Waiter){
            let wid = this.waiter.length+1;
            employee.id = wid;
            employee.status = 1;
            this.waiter.push(employee);
        }
    }
    fire(employee){
        if(employee instanceof Cook){
            let index = this.cook.indexOf(employee);
            this.cook.splice(index,1);
        }
        else if(employee instanceof Waiter){
            let index = this.waiter.indexOf(employee);
            this.waiter.splice(index,1);
        }
    }
    countMoney(menu){
        let count=0;
        for(let dish of menu){
            count+=dish.price;
        }
        console.log("花费："+count);
        return count;
    }
}

class Employee{
    constructor(name,salary){
        this.name = name;
        this.salary = salary;
    }

    dowork(){
        console.log(this.name+"已经完成了一次工作");
    }
}

class Waiter extends Employee{

    constructor(name,salary){
        super(name,salary);
    }

    doOrderwork(customer,menu){
        let table = customer.statusDiv;
        removeAll(table);
        let menuName = [];
        console.log("点餐完毕正在通知后厨");
        waiterMess.innerHTML = "点餐完毕正在通知后厨";
        waiDiv.style.marginLeft = "700px";
        for(let dish of menu){
            menuName.push(dish.name);
            addItem(dish.name,"未上菜",table);
        }
        customer.menuDiv.innerText = "顾客"+customer.name+"点了:"+menuName.join(",");
        this.status = 1;
        return menu;
    }


    doServerWork(dish){
        this.status=1;
        if(dish){
            console.log("上菜:"+dish.name+"完成品");
            this.dish = dish;
            return dish;
        }

    }

    checkIn(customer) {
        console.log("结账"+customer.name, customer.menu.length);
        let i = parseInt(customer.number);
        let thiswaiter = this;

        setTimeout(() => {
            console.log(customer.name + "结账");
            waiDiv.style.marginLeft = "100px";
            waiterMess.innerHTML = "顾客" + customer.name + "正在结账,共消费" + customer.money;
            ifeRestaurant.cash += customer.money;
            money.innerHTML = "目前饭店资金:" + ifeRestaurant.cash;
            customer.done = true;
            if (currentSeats < 2) {
                currentSeats++;
                customerList.delete(customer);
                emptySeats.push(customer.number);
            }
            thiswaiter.status = 1;
        }, 7 * TIME + i * 1000);
        //延时 7 * TIME + i * 1000
    }
}

class Cook extends Employee{

    constructor(name,salary,workspace){
        super(name,salary);
        this.workspace =workspace;
    }
    doCookwork(dish){

        console.log("正在烹饪"+dish.name+"耗时"+dish.time);
        let thiscook = this;
        for (let i = dish.time/1000; i >= 0; i--){
            setTimeout(function(){
                thiscook.workspace.innerHTML = "厨师"+thiscook.id+"正在烹饪"+dish.name+"。还剩"+(dish.time-i*1000)/1000+"秒做完";
                if(i===dish.time/1000){
                    thiscook.status = 1;
                }
            }, i*1000);
        }

        currentMenu.splice(0,1);
        showDishes();
        return dish;

    }

    doIteCookwork(dish){
        return function(callcack){
            dish.done = true;
            for (let i = dish.time/1000; i >= 0; i--){
                setTimeout(function(){
                    cookStatus.innerHTML = "正在烹饪"+dish.name+"。还剩"+(dish.time-i*1000)/1000+"秒做完";
                    console.log("正在烹饪"+dish.name+"。还剩"+(dish.time-i*1000)/1000+"秒做完");
                }, i*1000);
            }
            setTimeout(function(){
                callcack(dish);
                console.log(dish.name+"烹饪完毕");
            },dish.time);
        }
    }

    // static getInstance(name,salary) {
    //     if(!this.instance) {
    //         this.instance = new Cook(name,salary);
    //     }
    //     return this.instance;
    // }

}


class Customer{

    constructor(name,number){
        this.name = name;
        this.number = number;
        this.done = false;
    }

    order(){
        let number = Math.floor(Math.random()*5)+1;
        let dishes = new Set();
        for(let i=0;i<number;i++){
            let dishPos = Math.floor(Math.random()*6);
            while(dishes.has(dishPos)){
                dishPos = Math.floor(Math.random()*6);
            }
            dishes.add(dishPos);
        }
        dishes = [...dishes];
        let menu = [];
        for(let i=0,len = dishes.length;i<len;i++){
            foodList[dishes[i]].done = false;
            menu.push(foodList[dishes[i]]);
        }
        this.menu = menu;
        let num = this.number;
        this.menuDiv = cusDiv[num].getElementsByClassName("menu")[0];
        this.statusDiv = cusDiv[num].getElementsByClassName("eatStatus")[0].getElementsByTagName("table")[0];
        let menuName = [];
        removeAll(this.statusDiv);
        let thiscus = this;
        this.menuDiv.innerHTML = "";

        for(let i=3;i>=0;i--){

            setTimeout(()=>{
                this.statusDiv.innerHTML = "顾客"+thiscus.name+"正在点餐，还剩"+(2-i)+"秒";
                if(i===3){
                    this.statusDiv.innerHTML = "";
                    for(let dish of menu){
                        menuName.push(dish.name);
                        addItem(dish.name,"未上菜",this.statusDiv);
                    }
                    this.menuDiv.innerText = "顾客"+this.name+"点了:"+menuName.join(",");
                }
            },i*TIME)
        }

        return menu;
    }


    eatIte(dish){
        let statusDiv = this.statusDiv;
        let customer = this;
        return function(callback){
            setTimeout(()=>{
                setTimeout(()=>{
                    waiDiv.style.marginLeft = "100px";
                    waiterMess.innerHTML = "上菜"+dish.name;
                    setTimeout(()=>{
                        waiDiv.style.marginLeft = "700px";
                        waiterMess.innerHTML = "等待下一个菜";
                    },0.5*TIME);
                    console.log("顾客"+this.name+"用"+dish.name);
                    for (let i = 3; i >= 0; i--){
                        setTimeout(function(){
                            let trs = statusDiv.getElementsByTagName("tr");
                            for(let tr of trs){
                                let tds = tr.getElementsByTagName("td");
                                if(tds[0].innerHTML===dish.name){
                                    tds[1].innerHTML="正在食用";
                                    if(tds[2]){
                                        tds[2].innerHTML = "还剩"+(3000-i*1000)/1000+"秒";
                                    }
                                    else{
                                        let timeTd = document.createElement("td");
                                        timeTd.innerHTML ="还剩"+(3000-i*1000)/1000+"秒";
                                        tr.appendChild(timeTd);
                                    }
                                }
                            }

                        }, i*1000);
                    }
                    //从顾客的菜单出移除
                    let index = customer.menu.indexOf(dish);
                    customer.menu.splice(index,1);
                    //console.log(this);
                    //waiter.checkIn(customer);
                },3*TIME);
            },0.5*TIME);

            setTimeout(function(){
                callback(dish);
                console.log("顾客用完了"+dish.name);
            },3.5*TIME);

        }


    }


    eat(dish) {
        if(this.menu.indexOf(dish) !== -1) {
            //从顾客的菜单出移除
            let index = this.menu.indexOf(dish);
            this.menu.splice(index, 1);
            let cusindex = dish.customer.indexOf(this);
            dish.customer.splice(cusindex,1);
            setTimeout(() => {
                setTimeout(() => {
                    waiDiv.style.marginLeft = "100px";
                    waiterMess.innerHTML = "上菜" + dish.name;
                    setTimeout(() => {
                        waiDiv.style.marginLeft = "700px";
                        waiterMess.innerHTML = "等待下一个菜";
                    }, 0.5 * TIME);
                    console.log("顾客" + this.name + "用" + dish.name);
                    let statusDiv = this.statusDiv;
                    for (let i = 3; i >= 0; i--) {
                        setTimeout(function () {
                            let trs = statusDiv.getElementsByTagName("tr");
                            for (let tr of trs) {
                                let tds = tr.getElementsByTagName("td");
                                if (tds[0].innerHTML === dish.name) {
                                    tds[1].innerHTML = "正在食用";
                                    if (tds[2]) {
                                        tds[2].innerHTML = "还剩" + (3000 - i * 1000) / 1000 + "秒";
                                    }
                                    else {
                                        let timeTd = document.createElement("td");
                                        timeTd.innerHTML = "还剩" + (3000 - i * 1000) / 1000 + "秒";
                                        tr.appendChild(timeTd);
                                    }
                                }
                            }

                        }, i * 1000);
                    }
                }, 3 * TIME);
            }, 0.5 * TIME);
        }
        return this;
    }
}



//命令模式
// class OrderDishCommand{                          //将菜单当做一个命令对象
//     constructor(waiter){
//         this.receiver = waiter;
//     }
//     execute(pos){
//         let dish = this.receiver.doOrderwork(pos,this.giveDishInfCommand);
//     }
// }
//
//
// class CookFinishCommand{
//     constructor(waiter,waiterServerCommand){
//         this.receiver = waiter;
//         this.forCommand = waiterServerCommand
//     }
//     execute(dishes,waiterServerCommand){
//         this.receiver.doServerWork(dishes,this.forCommand);
//     }
// }
//
// class WaiterServerCommand{
//     constructor(customer){
//         this.receiver = customer;
//     }
//     execute(dish){
//         this.receiver.eat(dish);
//     }
// }




// let ifeRestaurant = new restaurant({
//     cash: 1000000,
//     seats: 20,
//     staff: []
// });
//
// let newCook = new cook("Tony", 10000);
// ifeRestaurant.hire(newCook);
//
// console.log(ifeRestaurant.staff);
//
// ifeRestaurant.fire(newCook);
// console.log(ifeRestaurant.staff);






