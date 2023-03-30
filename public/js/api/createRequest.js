const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    try {
        if (options.method === 'GET') {
            let url = options.url + '?';
            for (item in options.data) {
                url += item + '=' + options.data[item] + '&';
            }
            url = url.slice( 0, url.length - 1 );
            xhr.open(options.method, url) ;
            xhr.send();
        } else {
            const formData = new FormData();
            for (item in options.data) {
                formData.append(item, options.data[item]);
            }
                xhr.open(options.method, options.url);
                xhr.send(formData);  
        }
    } catch(error) {
        console.log(error);
    }
    xhr.onload = function () {
        options.callback(xhr.response.error, xhr.response);
    }
}
