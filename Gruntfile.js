'use strict';

var path = require('path');
var async = require('async');
var exec = require('child_process').exec;
var _ = require('lodash');

// Thanks: https://gist.github.com/lrvick/2080648
function hexToRGB(hex){
  var r = hex >> 16;
  var g = hex >> 8 & 0xFF;
  var b = hex & 0xFF;
  return [r,g,b];
};

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    grunt.initConfig({

        watch: {
            docx: {
                files: [ 'docx/**/*.xml', 'sample.md', 'theme/**' ],
                tasks: [ 'word' ]
            }
        },

        clean: {
            build: 'data',
            tmp: ['.tmp/**', '!.tmp' ],
            docx: 'data/*/*.docx'
        },

        template: {
            options: {
                themes: ['theme/*']
            },
            build: {
                files: [{
                    expand: true,
                    cwd: '.',
                    dest: 'data/theme/templates',
                    src: ['default.*']
                }]
            },
            docx: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: 'docx',
                    dest: '.tmp/data/theme/docx',
                    src: ['**/*.*']
                }]
            }
        },

        pandoc: {
            options: {
                'templates': [ 'data/*'],
                'args': '-s' + // standalone
                    ' -S' + //convert quotes, dashes, elip
                    ' --toc' + // table of contents
                    ' -N' + // numbered sections
                    ' --mathml' + // for html5
                    ' --filter pandoc-citeproc' + // for citations
                    ' -M docx-title=./title.xml' +
                    ' -F ./node_modules/.bin/docx-toc' +
                    //' -F ./node_modules/.bin/docx-title' +
                    ' -F ./node_modules/.bin/docx-header-num' +
                    ' -F ./node_modules/.bin/codemirror-highlighter' +
                    ' -F ./node_modules/.bin/docx-margin-narrow' +
                    ' --no-highlight'  //supress injection into word
            },
            html: {
                options: {
                    writers: [ 'html:html5' ],
                    'args': [
                        '-s',
                        '-S',
                        '--toc',
                        '--toc-depth 2',
                        '-N',
                        '-F ./node_modules/.bin/codemirror-highlighter',
                        '--no-highlight'
                    ].join(' ')
                },
                src: [ 'sample.md' ],
                dest: '.tmp/samples'
            },
            latex: {
                options: { writers: [ 'latex' ]},
                src: [ 'sample.md' ],
                dest: '.tmp/samples'
            },
            pdf: {
                options: { writers: [ 'pdf' ]},
                src: [ 'sample.md' ],
                dest: '.tmp/samples'
            },
            docx: {
                options: { writers: [ 'docx' ]},
                src: [ 'sample.md' ],
                dest: '.tmp/samples'
            }
        },

        docx: {
            build: {
                options: {
                    archive: 'reference.docx'
                },
                files: [{
                    expand: true,
                    cwd: '.tmp/data',
                    src: [ '*/docx' ],
                    dest: 'data'
                }]
            }
        },

        unpack: {
            samples: {
                files: [{
                    expand: true,
                    cwd: '.tmp/samples',
                    src: [ '*/*.{docx,epub}' ],
                    dest: '.tmp/unpacked'
                }]
            }
        },

        tidy: {
            unpacked: {
                files: [{
                    expand: true,
                    dot: true,
                    src: [ '.tmp/unpacked/**/*.{xml,rels}']
                }]
            }
        },

        shell: {
            docx: { // remove bogus docx changes from the working tree
                options: { failOnError: false },
                command: [
                    'git status --porcelain data/*/reference.docx',
                    'git checkout -- data/*/reference.docx'
                ].join('&&')
            },

            closeWord: {
                options: { failOnError: false },
                command: 'killall "Microsoft Word"'
            },
            openWord: {
                command: 'open .tmp/samples/studio/sample.docx'
            }
        },

        dom_massager: {
            html: {
                options: {
                    writeDom: true,
                    selectors: {
                        "#toc ul": {
                            action: "addClass",
                            input: "nav"
                        }
                    }
                },
                src: [ '.tmp/samples/studio/sample.html' ],
                dest: '.tmp/samples/studio/'

            }
        }
    });

    grunt.registerTask('html', [
        'template:build',
        'pandoc:html',
        'dom_massager'
    ]);

    grunt.registerTask('build', [
        'clean',
        'template',
        'docx',
        'shell:docx'
    ]);

    grunt.registerTask('word', [
        'reference',
        'shell:docx',
        'unpack:samples',
        'tidy:unpacked'
    ]);

    grunt.registerTask('samples', [
        'pandoc',
        'unpack:samples',
        'tidy:unpacked'
    ]);

    grunt.registerTask('reference', [
        'clean:docx',
        'template:docx',
        'docx',
        'pandoc:docx',
        'shell:closeWord',
        'shell:openWord'
    ]);

    grunt.registerTask('default', [
        'build',
        'samples'
    ]);

    grunt.registerMultiTask('template', 'process templates', function () {
        var options = this.options();
        var files = this.files;

        if (!options.themes) grunt.fatal('Option `themes` required');
        var themes = grunt.file.expand(options.themes);

        themes.forEach(function (theme) {
            var pieces = path.basename(theme).split('.');
            var themeName = pieces.slice(0,pieces.length-1).join('.');
            grunt.verbose.subhead(themeName);

            // load theme and convert colors to R,G,B for latex
            var data = require(path.resolve(theme));
            data.tokens.forEach(function (token) {
              token.rgb = hexToRGB(parseInt(token.color,16)).join(',');
            });
            if (data.SourceCode && data.SourceCode.background) {
                data.SourceCode.rgb = hexToRGB(parseInt(data.SourceCode.background,16)).join(',');
            }

            var tmpl = {};
            files.forEach(function (file) {
                var src = file.src[0];
                var dest = file.dest.replace(/theme/,themeName);

                if (!tmpl[src]) {
                    var input = grunt.file.read(src);
                    tmpl[src] = _.template(input,null,{ 'variable': 'theme' });
                }

                var output = tmpl[src](data);
                grunt.file.write(dest, output);
            });
        });
    });

    grunt.registerMultiTask('docx', 'build reference docx', function () {
        var options = this.options();
        var config = {};

        this.files.forEach(function (file) {
            file.src.forEach(function (src) {
                grunt.log.writeln(file.dest + ' ' + src);
                config[src] = {
                    cwd: src,
                    dot: true,
                    src: [ src + '/**/*' ],
                    dest: path.join(path.dirname(file.dest),options.archive)
                };
            });
        });

        grunt.config.set('zip', config);
        grunt.task.run('zip');
    });

    grunt.registerMultiTask('unpack', 'unzip samples', function () {
        var config = {};

        this.files.forEach(function (file) {
            config[file.dest] = file.src[0];
        });

        grunt.config.set('unzip', config);
        grunt.task.run('unzip');
    });

    grunt.registerMultiTask('pandoc', 'process samples', function () {
        var options = this.options({
            templates: [ 'data/studio' ],
            writers: [ 'html' ],
            args: '-s'
        });
        var commands = [];
        var files = this.files;
        var templates = grunt.file.expand(options.templates);

        templates.forEach(function (template) {
            var theme = path.basename(template);

            options.writers.forEach(function (writer) {
                var pieces = writer.split(':');
                var ext = pieces[0];
                writer = (pieces.length > 1) ? pieces[1] : null;

                files.forEach(function (file) {
                    commands.push('cp *.jpg '+path.join(file.dest,theme)); //hack so html sample works

                    file.src.forEach(function (src) {
                        var base = src.replace(/[^\/.]+$/, ext);
                        var dest = path.join(file.dest,theme,base);
                        grunt.file.mkdir(path.dirname(dest));

                        var command = 'pandoc ' +
                            options.args +
                            ' --data-dir=' + template +
                            (writer ? ' -t ' + writer : '') +
                            ' -o ' + dest +
                            ' ' + src;
                        commands.push(command);
                    });
                });
            });
        });

        var done = this.async();
        async.each(commands, function (command, callback) {
            exec(command, function (error, stdout, stderr) {
                grunt.verbose.writeln(command);
                if (error)  { return callback(error); }
                if (stderr) { return callback(new Error(stderr)); }
                // if (stdout) { grunt.verbose.writeln(stdout); }
                callback();
            });
        }, done);
    });

    grunt.registerMultiTask('tidy', 'cleanup xml files', function () {
        var async = require('async');
        var done = this.async();
        // var options = this.options();

        var files = [];
        this.files.forEach(function (file) {
            file.src.forEach(function (filepath) {
                files.push(filepath);
            });
        });

        //var cmd = 'xmllint --format '; // 'tidy -xml -i -utf8 -q -w 98';
        async.each(files, function (filepath, callback) {
            var cmd = 'xmllint --c14n '+filepath+' | xmllint --format -'
            exec(cmd, function (error, stdout, stderr) {
                grunt.log.write('  ' + filepath + ' ');
                if (error)  { return callback(error); }
                if (stderr) { return callback(new Error(stderr)); }
                grunt.file.write(filepath, stdout);  //overwrite!
                grunt.log.ok();
                callback();
            });
        }, done);
    });
};
