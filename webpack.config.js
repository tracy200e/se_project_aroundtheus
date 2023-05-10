// Connect path to webpack config
const path = require("path");

// webpack.config.js
module.exports = {
    devtool: "inline-source-map", // lets you choose a style of source mapping in a browser to enhance the debugging process
    entry: {
        main: "./src/index.js",
    },
    output: {
        // write the output point using the path utility
        path: path.resolve(__dirname, "dist"),
        filename: "main.js",
        publicPath: "",
    },
    mode: "development",
    stats: "errors-only", // only output when errors happen
    devServer: {
        static: path.resolve(__dirname, "./dist"), // specifies a folder from where to serve the application and its contents
        compress: true, // this will speed up file loading in development mode
        port: 8080, // will open your site at localhost:8080
        open: true, // site will open automatically in the browser after executing "npm run dev"
        // below properties are necessary in order to instruct the development server to reload the page whenever it detects changes
        liveReload: true,
        hot: false
    },
};

// module.exports is the syntax for export in Node.js