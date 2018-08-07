
const requireContext = require.context("./img", true, /^\.\/.*\.(jpg|jpeg|png|svg)$/);
requireContext.keys().map(requireContext);

const requireContext2 = require.context("./js", true, /^\.\/.*\.js$/);
requireContext2.keys().map(requireContext2);

require('./sass/style.sass');

if (module.hot) {
    module.hot.accept();
}

if (module.hot) {
    const hotEmitter = require("webpack/hot/emitter");
    const DEAD_CSS_TIMEOUT = 2000;

    hotEmitter.on("webpackHotUpdate", function(currentHash) {
        document.querySelectorAll("link[href][rel=stylesheet]").forEach((link) => {
            const nextStyleHref = link.href.replace(/(\?\d+)?$/, `?${Date.now()}`);
            const newLink = link.cloneNode();
            newLink.href = nextStyleHref;

            link.parentNode.appendChild(newLink);
            setTimeout(() => {
                link.parentNode.removeChild(link);
            }, DEAD_CSS_TIMEOUT);
        });
    })
}