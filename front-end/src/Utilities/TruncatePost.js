import React, { Component } from 'react'; 
const TruncatePost = (text) => {
        try {
                return text.length > 100 ? text.substring(0, 100) + "..." : text;
        } catch (error) {
                return text;                
        }
}
export default  TruncatePost