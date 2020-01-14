const PLUGIN_NAME = "babel-plugin-cursor-pointer";

const ATTRIBUTE_IDENTIFIERS = {
  CLICK: "onClick", DATA: `data-${PLUGIN_NAME}/clickable`, DISABLED: "disabled"
};

const CSS_FILE_NAME = "index.css";
const CSS_FILE_PATH = `${PLUGIN_NAME}/${CSS_FILE_NAME}`;

module.exports = {
  ATTRIBUTE_IDENTIFIERS,
  CSS_FILE_PATH,
  PLUGIN_NAME,
};
