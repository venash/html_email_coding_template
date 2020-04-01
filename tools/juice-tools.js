const es = require('event-stream');
const juice = require('juice');

Object.assign(juice.codeBlocks, {
    freeMarkerStart: {
        start: '<#',
        end: '>'
    },
    freeMarkerEnd: {
        start: '</#',
        end: '>'
    },
    outlook: {
        start: '<outlook',
        end: '>'
    },
});

Object.assign(juice.styleToAttribute, {
   'border-spacing': 'cellspacing',
   'padding': 'cellpadding',
   'border': 'border',
   'background-color': 'bgcolor',
   'vertical-align': 'valign',
});

Object.assign(juice.tableElements,
    ['TABLE','TR','TD']
);

Object.assign(juice.widthElements,
    ['TABLE','TR','TD']
);
Object.assign(juice.heightElements,
    ['TABLE','TR','TD']
);

function processJuice(options){

    options = options || {};
    return es.map(function(file, fn){
        juice.juiceResources(file.contents.toString(), options, function(err, html){
            if(err) return fn(err);
            file.contents = Buffer.from(html);
            fn(null, file);
        });
    });
};

module.exports = processJuice;


