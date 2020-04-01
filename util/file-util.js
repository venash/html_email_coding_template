const path = require("path");
const rename = require("gulp-rename");


module.exports = {

    getFilePath: function (p) {
        return path.parse(p);
    },

    fileExtensionType: {
        FTL: '.ftl',
        HTML: '.html',
        JSON: '.json'
    },

    renameExtension: function (extension) {
        return rename(function (path) {
            return {
                dirname: path.dirname,
                basename: path.basename,
                extname: extension
            }
        });
    }

};
