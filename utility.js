function countIF(array,index1,condition1){ //count for 1 condition
    var countVal = 0;
    array.forEach(function(e){
              if(e[index1] == condition1){              
              countVal ++             
              }
                
    });  
    return countVal

}

function countIFS2(array,index1,condition1,index2,condition2){ //count for 2 condition
    var countVal = 0;
    array.forEach(function(e){
              if(e[index1] == condition1 && e[index2] == condition2){              
              countVal ++             
              }
                
    });  
    return countVal

}
////////end count function////////////////// 

function uniqueId(){
        const firstItem = {
            value: "0"
        };
        /*length can be increased for lists with more items.*/
        let counter = "123456789".split('')
            .reduce((acc, curValue, curIndex, arr) => {
                const curObj = {};
                curObj.value = curValue;
                curObj.prev = acc;

                return curObj;
            }, firstItem);
        firstItem.prev = counter;

        return function () {
            let now = Date.now();
            if (typeof performance === "object" && typeof performance.now === "function") {
                now = performance.now().toString().replace('.', '');
            }
            counter = counter.prev;
            return `${now}${Math.random().toString(16).substr(2)}${counter.value}`;
        }
}