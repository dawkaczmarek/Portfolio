
const requireContext = require.context("./img", true, /^\.\/.*\.(jpg|jpeg|png|svg)$/);
requireContext.keys().map(requireContext);

const requireContext2 = require.context("./js", true, /^\.\/.*\.js$/);
requireContext2.keys().map(requireContext2);

require('./index.html');
require('./sass/style.sass');
