var access = function (sql, callback) {
    var ajax = new XMLHttpRequest(); //one XMLHttpRequest object represents only one request-response cycle!!!!!!!!
    ajax.onreadystatechange = function () {
        if ((this.readyState == 4) && (this.status == 200)) {
            var obj = JSON.parse(this.responseText);
            callback(obj);
        }
    };
    //The value in the ip portion equals ip address of the computer where the server lies
    //127.0.0.1 means localhost
    // var url = 'http://192.168.0.22:8000/sql?query=' + sql;
    var url = 'http://127.0.0.1:8000/sql?query=' + sql;
    ajax.open('GET', url, true);
    ajax.send();
};
