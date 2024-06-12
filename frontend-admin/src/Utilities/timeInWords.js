const TimeInWords = (props) => {
    try{
        //00:00:00
    let time = props.time;
    let f1 = parseInt(time.slice(0,2))
    let f2 = parseInt(time.slice(3,5))
    let f3 = parseInt(time.slice(6,8))
    if(f1 < 1 && f2 < 1){
        return f3+" Sec"
    }
    else if(f1 < 1 && f2 > 0){
        return f2+" Min"
    }
    else if(f1 > 0 && f2 > 0){
        return f1+" Hr " +f2+ "Min"
    }
    }
    catch(e){
        console.log(e)
        return 
    }
}

export default TimeInWords;