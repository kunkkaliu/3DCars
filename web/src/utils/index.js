/**
 * Created by liudonghui on 17/3/6.
 */

export function ajax(options) {
    var
        xhr = null,
        method = options.method || 'get',
        url = options.url,
        data = options.data || '',/*假设是字符串形式 name1=value1&name2=value2*/
        success = options.success
        ;
    try {
        xhr = new XMLHttpRequest();
    } catch (e) {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }

    if (method == 'get' && ( url.indexOf( '?' ) == -1 ) && data) {
        url += '?' + data;
    }

    xhr.open(method,url,true);
    if (method == 'get') {
        xhr.send();
    } else {
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        xhr.send(data);
    }

    xhr.onreadystatechange = function() {
        if ( xhr.readyState == 4 ) {
            if ( xhr.status == 200 ) {
                let dataObj=eval("(" + xhr.responseText + ")");
                success && success(dataObj);
            } else {
                alert('出错了,Err：' + xhr.status);
            }
        }
    }
    return xhr;
}