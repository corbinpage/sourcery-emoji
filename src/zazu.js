// NOTE: We limit the number of results because its' a rendering bottleneck.
// Computation time seems fine, but the UI really doesn't render hundreds of
// rapidly changing lists well
const search = require('./moji.js')({ limit: 20 });

/**
 * Map a raw entry from the emojilib to a zazu entry for display
 */
const fromRaw = ({ char, name }) => ({
  id: char,
  icon: `./emoji-images/${name}.png`,
  title: `${char} :${name}:`,
  subtitle: `Copy emoji`,
  value: char,
});

module.exports = (pluginContext) => {
  return {
    respondsTo: (query) => {
      // return query.match(/.*/)
      return true
    },
    search: (query, env = {}) => {
      return new Promise((resolve, reject) => {
        resolve(search(query).map(fromRaw));
      });
    }
  }
}