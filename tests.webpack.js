var testsContext = require.context('./test', true, /\.js$/);
testsContext.keys().forEach(testsContext);

var srcContext = require.context('./app', true, /\.js$/);
srcContext.keys().forEach(srcContext);
