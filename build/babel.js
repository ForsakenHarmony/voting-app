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
      'transform-object-rest-spread',
      'transform-class-properties',
      ['transform-react-jsx', { pragma: 'h' }],
    ],
    babelrc: false,
  };
  
  return babelrc;
};
