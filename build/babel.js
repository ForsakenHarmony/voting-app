module.exports = (isProd) => {
  const targets = isProd
    ? { browsers: ['last 2 versions'] }
    : { browsers: ['chrome 58'] };
  
  const babelrc = {
    presets: [
      [
        'env',
        {
          modules: false,
          exclude: ['transform-regenerator', 'transform-async-to-generator'],
          targets,
        },
      ],
    ],
    plugins: [
      'fast-async',
      'transform-decorators-legacy',
      ['transform-react-jsx', { pragma: 'h' }],
    ],
    babelrc: false,
  };
  
  if (isProd) {
    babelrc.plugins.concat([
      'transform-class-properties',
      'transform-object-rest-spread',
    ]);
  }
  
  return babelrc;
};
