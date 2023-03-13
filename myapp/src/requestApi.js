
const requestApi = async (url = '' , optionsobj = null , errMsg = null ) =>{

    try{
        const response = await fetch(url , optionsobj);
        if(!response.ok){
            throw Error ("Please Reload Website");
        }    
    }catch(err){
        errMsg = err.message;
    }finally{
        return errMsg;
    }
}

export default requestApi;