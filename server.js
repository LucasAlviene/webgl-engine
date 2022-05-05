const WebpackCLI = require("webpack-cli");
const webpack = require("webpack");
const http = require("http");
const fs = require('fs');
const host = 'localhost';
const port = 3000;

const listPath = {
    "/": { path: "/index.html", "contentType": "text/html" },
    //"/main.js": {path: "/main.js","contentType": "application/javascript"}
}
const requestListener = function (req, res) {
    try {
        let path = "/index.html";
        if (req.url != "/") path = req.url;
        if (fs.existsSync(__dirname + "/build" + path)) {
            fs.promises.readFile(__dirname + "/build" + path).then(contents => {
                res.writeHead(200);
                res.end(contents);
            });
        } else {
            res.setHeader("Content-Type", "text/html");
            res.writeHead(404);
            res.end();
        }
    } catch (e) {
        res.setHeader("Content-Type", "text/html");
        res.writeHead(500);
        res.end();
    }
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
    compile();
});

const compile = async () => {
    console.log("Compile...");
    const cli = new WebpackCLI();

    try {
        process.env.NODE_ENV = process.argv[2] ?? "development";
        process.argv.push("--watch")
        await cli.run(process.argv);
    } catch (error) {
        cli.logger.error(error);
        process.exit(2);
    }

    /*
    webpack(webpackConfig,function(err,stats){
        if(err == null) console.log(stats)
        else console.error("Error",stats)
    })
    exec("webpack --mode development","",function(err,stdout,sterr){
        console.log("Oi");
        if(err == null) console.log(stdout,sterr)
        else console.error("Error",stdout)
    });*/

}
/*
watch(__dirname + "/src", { recursive: true }, function () {
    compile();
});*/