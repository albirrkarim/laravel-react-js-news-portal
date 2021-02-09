const str_limit = (str, len = 100) => {
    if (str.length > len) {
        str = str.substring(0, len) + "...";
    }
    return str;
};

const alphaNumeric = (txt) => {
    return txt
        .replace(/[^\w\s]/gi, "")
        .trim()
        .replace(/\s+/g, "-")
        .toLowerCase();
};


function validURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}


const makeURL =  (s)=>{
    var prefix1 = 'http://';
    var prefix2 = 'https://';
    if (s.substr(0, prefix1.length) !== prefix1 && s.substr(0, prefix2.length) !== prefix2)
    {
        s = prefix1 + s;
    }
    return s;
}

const isImageFile=(url)=>{
    return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
}

const isDocument=(url)=>{
    return (url.match(/\.(pdf|docx|doc|pptx)$/) != null);
}

export { 
	validURL,
	makeURL,
	isImageFile,
	isDocument,

	str_limit, alphaNumeric };
