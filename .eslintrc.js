module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/essential'
    // vue2代码不能应用vue3规则，否则会使用vue3语法校验当前vue2代码，导致出错
    // 'plugin:vue/vue3-essential'
  ],
  // 'parser': '@babel/eslint-parser',
  // 脚本在执行期间访问的额外的全局变量
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    process: 'readonly'
  },
  overrides: [],
  parserOptions: {
    requireConfigFile: false,
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: '@babel/eslint-parser',
    babelOptions: {
      babelrc: false,
      configFile: false,
      // your babel options
      presets: ['@babel/preset-env']
    }
  },
  plugins: ['vue', 'html'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 1 : 0, // 开发可用console和debugger，生产不可用
    'no-debugger': process.env.NODE_ENV === 'production' ? 1 : 0,
    'no-template-curly-in-string': 0, // 禁止在常规字符串中出现模板字面量占位符语法
    'spaced-comment': ['error', 'always'], // 强制在注释中 // 或 /* 使用一致的空格 never/后没有空格  always/后总有一个空格
    semi: ['error', 'never'], // 关闭无效分号
    indent: ['off', 2, { SwitchCase: 1 }], // 缩进两个，警告
    'no-useless-escape': 0, // 特殊字符可以使用
    'no-unused-vars': 1, // 声明没使用关闭
    'vue/no-side-effects-in-computed-properties': 'off', // 计算属性可以有副作用
    'no-empty': 'off', // 允许空块语句
    'no-undef': 'error', // 变量和参数拼写错误报错
    'comma-style': [2, 'last'], // 逗号在行尾
    'no-extra-semi': 'off',
    eqeqeq: [
      // 只能使用 ===
      'error',
      'always'
    ],
    quotes: [1, 'single'],
    'comma-dangle': 'off',
    'no-multiple-empty-lines': 'error', // 禁止空行
    'no-proto': 2, // 禁用 __proto__ 属性
    'default-case': 2, // switch 语句强制 default 分支
    'no-loop-func': 1, // 禁止在循环中出现 function 声明和表达式
    'no-delete-var': 2, // 禁止删除变量
    'no-catch-shadow': 2, // 禁止catch子句参数与外部作用域变量同名
    'no-class-assign': 2, // 禁止给类赋值
    'no-const-assign': 2, // 禁止修改const声明的变量
    'no-dupe-keys': 2, // 在创建对象字面量时不允许键重复 {a:1,a:1}
    'no-var': 1, // 禁用var，用let和const代替
    'arrow-parens': 0, // 关闭箭头函数用小括号括起来
    camelcase: 0, // 强制驼峰法命名
    'valid-typeof': 2, // 必须使用合法的typeof的值
    'space-after-keywords': [0, 'always'], // 关闭关键字后面是否要空一格
    'space-before-blocks': [0, 'always'], // 关闭不以新行开始的块{前面要不要有空格
    'space-before-function-paren': [0, 'always'], // 关闭函数定义时括号前面要不要有空格
    'space-in-parens': [0, 'never'], // 关闭小括号里面要不要有空格
    'space-infix-ops': 1, // 开启中缀操作符周围要不要有空格,+—*/前后都要有空格
    'constructor-super': 0, // 非派生类不能调用super，派生类必须调用super
    'newline-after-var': 0, // 变量声明后是否需要空一行
    'no-new-wrappers': 2, // 禁止使用new创建包装实例，new String new Boolean new Number
    'keyword-spacing': 2, // 关键字前后的空格,如if
    'no-constant-condition': 0, // 条件语句的条件中不允许出现恒定不变的量
    'sort-vars': 0, // 变量声明时排序
    'no-cond-assign': 0,
    'no-plusplus': 0, // 不允许使用++ --运算符,
    'no-multi-spaces': 0,
    'key-spacing': 0,
    'no-trailing-spaces': 0,
    'object-curly-spacing': 0,
    'vue/require-valid-default-prop': 0,
    'no-unused-expressions': 0,
    'vue/no-v-html': 'off',
    'no-new': 0,
    'no-useless-constructor': 0,
    'vue/return-in-computed-property': 0,
    'no-irregular-whitespace': ['error', { skipComments: true }],
    'vue/multi-word-component-names': ['off', {}], // 组件名不能是单个单词
    'no-prototype-builtins': 'off'
  }
}
