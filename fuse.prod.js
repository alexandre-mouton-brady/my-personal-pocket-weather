const {
  FuseBox,
  WebIndexPlugin,
  CSSPlugin,
  SassPlugin,
  BabelPlugin,
  QuantumPlugin,
  Sparky,
} = require('fuse-box');

const fuse = FuseBox.init({
  homeDir: 'src/',
  output: 'dist/$name.js',
  hash: true,
  cache: false,
  sourceMaps: false,
  plugins: [
    [
      SassPlugin(),
      CSSPlugin({
        outFile: file => `${__dirname}/dist/styles/main.css`,
      }),
    ],
    WebIndexPlugin({
      template: 'src/public/index.template.html',
      path: './',
    }),
    BabelPlugin({
      presets: ['babel-preset-env'],
      plugins: ['babel-plugin-inferno'],
    }),
    // QuantumPlugin({
    //   treeshake: true,
    //   uglify: true,
    //   bakeApiIntoBundle: 'app',
    // }),
  ],
});

fuse.bundle('app').instructions('> index.js');
fuse.bundle('vendor').instructions('~ index.js');

Sparky.task('clean', () => {
  return Sparky.src('dist/').clean('dist/');
});

Sparky.task('watch:images', () => {
  return Sparky.src('**/*.+(svg|png|jpg|gif)', { base: './src' }).dest(
    './dist',
  );
});

Sparky.task('default', ['clean', 'watch:images'], () => {
  fuse.run();
});
