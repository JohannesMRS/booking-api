const response = (status, data, msg, res)=>{
    return res.status(status).json({
        status_code: status,
        msg: msg,
        data: data,
    })
}

export default response;