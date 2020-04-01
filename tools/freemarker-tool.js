const fs = require("fs");
const path = require("path");
const through = require('through2');
const Freemarker = require('freemarker');
const color = require('gulp-color');

const freemarker = new Freemarker();
const fileUtil = require('./../util/file-util');


module.exports = function (options) {

    //chunk is templeta file
    return through.obj(function (chunk, encoding, callback) {
        const __dirname = options.dirname;

        if (!arguments.length)
            throw new Error('freemarker-tool', 'invoked with no arguments!');

        if (!options.dirname)
            throw new Error('freemarker-tool', 'dirname option is mandatory!');

        //get content of template
        const templateConent = chunk.contents.toString('utf8');
        const filePath = fileUtil.getFilePath(chunk.path);

        const jsonDataFile = fs.readFileSync(path.join(__dirname, filePath.base).replace(filePath.ext,'.json'), 'utf8');

        try {
            var mockData = JSON.parse(jsonDataFile);

            freemarker.render(templateConent, mockData, function(err, result) {
                if (err) {
                    console.log(color(err, 'RED'));
                    chunk.contents = Buffer.from(err);
                    this.push(chunk);
                    callback();
                } else {
                    chunk.contents = Buffer.from(result);
                    this.push(chunk);
                    callback();
                }
            }.bind(this))

        } catch (err) {
            callback(err)
        }


    })
};
