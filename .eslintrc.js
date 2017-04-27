const ENV = process.env.NODE_ENV || 'development';

module.exports = {
  'comment' : 'this is a custom config, it reflects my own preferences',
  'extends' : ['xo-space/esnext', 'xo-react/space'],
  'plugins' : [
    'react',
    'jsx-a11y',
    'import'
  ],
  'env'     : {
    'browser': true,
    'es6'    : true
  },
  'globals' : {
    'ENV': true
  },
  'settings': {
    'react': {
      'pragma' : 'preact',
      'version': '8.1.0'
    }
  },
  'rules'   : {
    'no-debugger': ENV === 'development' ? 'off' : 'error',
    
    'comma-dangle'                : [
      'error', {
        'arrays'   : 'always-multiline',
        'objects'  : 'always-multiline',
        'imports'  : 'always-multiline',
        'exports'  : 'always-multiline',
        'functions': 'ignore'
      }
    ],
    'operator-linebreak'          : ['error', 'before'],
    'import/prefer-default-export': 'off',
    
    'no-multi-spaces'   : 'off',
    'no-trailing-spaces': ['error', { 'skipBlankLines': true }],
    'key-spacing'       : 'off', // should be align: colon
    
    'no-empty-pattern'    : 'off',
    'object-curly-spacing': ['error', 'always'],
    'curly'               : 'off',
    
    'capitalized-comments': 'off',
    
    'func-names'  : ['error', 'as-needed'],
    'arrow-parens': ['error', 'as-needed', { 'requireForBlockBody': true }],
    
    'react/react-in-jsx-scope'          : 'off',
    'react/no-unknown-property'         : ['error'],
    'react/prop-types'                  : 'off',
    'react/jsx-uses-vars'               : 'error',
    'react/jsx-key'                     : 'off',
    'react/self-closing-comp'           : 'off',
    'react/jsx-handler-names'           : 'off',
    'react/jsx-first-prop-new-line'     : 'off',
    'react/jsx-indent-props'            : 'off',
    'react/jsx-closing-bracket-location': 'off',
    'react/jsx-no-bind'                 : 'off'
  },
  'parser'  : 'babel-eslint',
};
