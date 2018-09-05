/**
 * Created by sky on 2018/8/27.
 */
let Event = (function(){
    let clientList = {},
        listen,
        trigger,
        remove;
    listen = function(key,fn){
        if(!clientList[key]){
            clientList[key] = [];
        }
        clientList[key].push(fn);
    };

    trigger = function(){
        let key = Array.prototype.shift.call(arguments),
            fns = clientList[key];
        if(!fns || fns.length === 0){
            return false;
        }
        for(let i=0,fn = fns.length;fn = fns[i++];){
            fn.apply(this,arguments);
        }
    };

    remove = function(key,fn){
        let fns = clientList[key];
        if(!fns){
            return false;
        }
        if(!fn){
            fns&&(fns.length=0);  //取消所有订阅事件
        }else{
            for(let l = fns.length-1;l>=0;l--){
                let _fn = fns[l];
                if(_fn===fn){
                    fns.splice(l,1);
                }
            }
        }
    };
    return{
        listen:listen,
        trigger:trigger,
        remove:remove
    }

})();















