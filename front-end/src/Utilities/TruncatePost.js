import React, { Component } from 'react'; 
const TruncatePost = (text) => {
        return text.length > 100 ? text.substring(0, 100) + "..." : text;
}
export default  TruncatePost