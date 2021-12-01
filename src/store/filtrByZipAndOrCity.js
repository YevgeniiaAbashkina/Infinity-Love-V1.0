export const  getArrByZipAndOrCity=(zip, city, array)=>{
    let resultArr = [];
    let index = 0;

        for(let i=0; i<array.length; i++) {

            if(zip !== "" && city !== ""){

                if((array[i].el_zip === zip)&&(array[i].el_city === city)){
                    resultArr[index] = array[i];
                    index++;
                }
            } else if(zip !== ""){

                if(array[i].el_zip === zip){
                    resultArr[index] = array[i];
                    index++;
                }
            } else if(city!==""){

                if((array[i].el_city === city)){
                    resultArr[index] = array[i];
                    index++;
                }
            }

        }
        return resultArr;
}