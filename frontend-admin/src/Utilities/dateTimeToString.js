import moment from "moment"

const dateTimeToDate = (dt) => {
if(dt != null){
    return moment(dt).format("DD MMM, YYYY");
}
}

export default dateTimeToDate