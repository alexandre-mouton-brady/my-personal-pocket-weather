const {
  FuseBox,
  WebIndexPlugin,
  CSSPlugin,
  SassPlugin,
  BabelPlugin,
  QuantumPlugin,
  Sparky,
} = require('fuse-box');

let isProduction;

const fuse = FuseBox.init({
  homeDir: 'src/',
  output: 'dist/$name.js',
  hash: isProduction,
  cache: true,
  sourceMaps: !isProduction,
  plugins: [
    [SassPlugin(), CSSPlugin()],
    CSSPlugin(),
    WebIndexPlugin({ template: 'public/index.template.html' }),
    BabelPlugin({
      presets: ['babel-preset-env'],
      plugins: ['babel-plugin-inferno'],
    }),
  ],
});

fuse.dev();

fuse.bundle('app').instructions('> index.js').watch().hmr();

Sparky.task('clean', () => {
  return Sparky.src('dist/').clean('dist/');
});

Sparky.task('default', ['clean'], () => {
  fuse.run();
});
