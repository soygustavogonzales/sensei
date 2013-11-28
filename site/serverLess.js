var toCss = function (pathLess,modules){
    var less = modules.less,
        fs = modules.fs,
        path = modules.path;

    var cssFile = '';//a JSON Object
    var files_less = 
      [
        pathLess//'../autoReload/public/stylessheet/less/styles.less'
      ];

    fs.readFile(files_less[0],function(error,data){
      var dataString = data.toString();
      var options = {
        paths         :(function(ruta){
                          return ruta.substring(0,ruta.lastIndexOf('/'));
                       })(files_less[0])//['../autoReload/public/stylessheet/less']
        ,outputDir    :(function(ruta){
                          ruta = ruta.substring(0,ruta.lastIndexOf('/'));
                          return ruta.substring(0,ruta.lastIndexOf('/'))+'/css';
                       })(files_less[0])//"../autoReload/public/stylessheet/css"
        ,optimization :1
        ,filename     :files_less[0].substring(files_less[0].lastIndexOf("/")+1,files_less[0].length)
        ,compress     :false
        ,yuicompress  :false

      };

    //console.log(options.filename);
      options.outputfile = options.filename.split(".less")[0] + (options.compress ? ".min" : "") + ".css";
      options.outputDir = path.resolve( process.cwd(), options.outputDir) + "/";
      ensureDirectory( options.outputDir );

    //console.log(options.filename);
      var parser = new less.Parser(options);
    //console.log(options.filename);
    //console.log(parser);
      parser.parse( dataString, function ( error, cssTree ) {
          if ( error ) {
            less.writeError( error, options );
            return;
          }

        // Create the CSS from the cssTree
        var cssString = cssTree.toCSS( {
          compress   : options.compress,
          yuicompress: options.yuicompress
         } );
 
        // Write output
    //console.log(options.filename);
        fs.writeFileSync( options.outputDir + options.outputfile, cssString, 'utf8' );
        console.log("Converted Less: '" + options.filename + "', to CSS: " + options.outputDir + options.outputfile);
        cssFile = options.outputDir + options.outputfile;
        console.log('cssFile*: '+cssFile);
      });
    });

    var ensureDirectory = function (filepath) {
      var dir = path.dirname(filepath);
      var existsSync = fs.existsSync || path.existsSync;
      if (!existsSync(dir)) { fs.mkdirSync(dir); }
    };

    return (cssFile);
}//end toCss() method
module.exports = toCss; 

/*
var toLess = function(path){
  var less_ = '@color: #ede;  body{ background: @color; }';
  less.render(less_, function (e, css) {
      console.log(css);
  });
};
toLess(files_less[0]);
*/


