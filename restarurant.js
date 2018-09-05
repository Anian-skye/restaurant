/**
 * Created by sky on 2018/8/18.
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


let restarurant = {
    setInfo(asset,seat,staff){
        this.asset = asset;
        this.seat = seat;
        this.staff = staff;
    },
    employ(employee){
        id = this.staff.length+1
        employee.id = id;
        console.log(employee.name,employee.id);
        this.staff.push(employee.id);
    },
    fire(employee){
        id = employee.id;
        let index = this.staff.indexOf(id);
        this.staff.splice(index,1);
    }
};


let Employee = {
    setInfo(name,salary){
        this.name = name;
        this.salary = salary;
    },
    dowork(){
        console.log(this.name+"已经完成了一次工作");
    }
};

let waiter = Object.create(Employee);
waiter.doWaiterwork = function(flag){
    if(flag.isArray()){
        console.log("点菜"+flag.join(","));
    }
    else{
        console.log(this.name+"上菜");
    }
};

let cook = Object.create(Employee);
cook.doCookwork = function(){
    console.log(this.name+"烹饪出菜品");
};

let customer = {
    order(dish){

        console("点菜有："+dish.join(","));
        return dish;
    },
    eat(){
        console.log("顾客用餐");
    }
};

let dish = {
    setInfo(name,cost,price){
        this.name = name;
        this.cost = cost;
        this.price = price;
    }
};



restarurant.setInfo(1000000,20,[]);

let newCook = Object.create(cook);
newCook.setInfo("Tony",10000);

restarurant.employ(newCook);
console.log(restarurant.staff);

restarurant.fire(newCook);
console.log(restarurant.staff);







