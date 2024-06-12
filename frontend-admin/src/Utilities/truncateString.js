const truncate = (str, len) => {
    if (str.length > len) {
        return str.slice(0, len) + '...';
      } else return str;
} 

export default truncate