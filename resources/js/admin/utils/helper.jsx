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

const normalize = (text)=>{

    if (text==null) {
        return "";
    };

    let isYoutube= text.match(/youtu/) != null;

    let isGoogleDrive  = text.match(/drive\.google\.com/) != null;

    if(isYoutube){
        let a= text.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/);

        let b= text.match(/youtu\.be.*(.{11})/);
        let youtube_video_id="";
        if(a!=null){
            youtube_video_id = a.pop();
        }
        else if(b!=null){
            youtube_video_id= b.pop();
        }
        else{
            youtube_video_id=text;
        }

        if(youtube_video_id.length==0){
            return "";
        }

        return "https://youtube.com/embed/"+youtube_video_id;
    }
    else if (isGoogleDrive){

        let isDone= text.match(/preview/) != null;

        let isViewExist= text.match(/view/) != null;

        if(!isDone){

            if(!isViewExist){

                if(text[text.length-1]=="/"){
                    return text+"preview";
                }

                return text+"/preview";
            }

            return text.replace("view", "preview");
        }

        if(isDone){
            return text;
        }

    }

    return "";
}


const makeName =  (s) => {
    let n = s.substr(s.lastIndexOf("\\") + 1);
    if (n.length > 50) {
        n = n.substring(0, 50);
    }

    return n;
}

const str_limit = (str, len = 50) => {
    if (str.length > len) {
        str = str.substring(0, len) + "...";
    }
    return str;
}

const alphaNumeric = txt => {
    return txt
        .replace(/[^\w\s]/gi, "")
        .trim()
        .replace(/\s+/g, "-")
        .toLowerCase();
};

export {
    normalize,
    str_limit,
    makeName,
    alphaNumeric,

    isImageFile,
    isDocument,
    validURL,
    makeURL
}