const number_format = (x) => {
   /*try{
    if (x == '' || x == null) x = 0;
    x = parseFloat(x.toFixed(2))
    return x.toLocaleString('en-US');
//return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
   }
   catch(e){
    return "0";
   } */

   try{
      if (x == '' || x == null) x = 0;
      else if (x < 1000){
         return x.toLocaleString('en-US');
      }
      else if (x > 1000 && x < 1000000){
         x = x/1000
         x = parseFloat(x.toFixed(1))
         return x.toLocaleString('en-US')+"K";
      }
      else
      {
         return x.toLocaleString('en-US');
      }
  //return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
     }
     catch(e){
      return "0";
     }
}

export default number_format