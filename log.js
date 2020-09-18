/**
 *@author songke
 *@date 2020/8/27 16:33
 */

let Fun = function () {
    return async (req, res, next) => {
        req._startTime = new Date();   // start time
        await next();
        let url = req.url;
        let method = req.method;
        let code = res.statusCode;
        let now = new Date();          // end time
        let responseTime = now - req._startTime;
        // const promise = new Promise((resolve, reject) => {
        //     let body = "";
        //     res.on('data', (chunk) => {
        //         if (body === "") {
        //             resolve((body += chunk));
        //         } else {
        //             reject('body is null');
        //         }
        //     });
        //     res.on('end', function () {
        //         let contentLength = res.getHeader('Content-Length');
        //         let logMsg = `${method} ${url} ${code} ${responseTime} ${contentLength} \n`;
        //         console.log(logMsg);
        //     })
        // });
        // promise
        //     .then(date => {
        //         console.log(date);
        //     }).catch(err => {
        //     console.log(err);
        // });

        let contentLength = res.get("Content-Length");    // ？？？暂放
        // console.log(contentLength);

        let logMsg = `${method} ${url} ${code} ${responseTime} \n`;
        console.log(logMsg);
    }
};

module.exports = Fun;

