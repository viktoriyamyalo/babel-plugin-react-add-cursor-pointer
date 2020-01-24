const PLUGIN_PREFIX: string = 'babel-plugin';
const PLUGIN_NAME_BASE: string = 'react-add-cursor-pointer';
const PLUGIN_NAME: string = `${PLUGIN_PREFIX}-${PLUGIN_NAME_BASE}`;

type IAttributeIdentifiers = {
  CLICK: string;
  DATA: string;
  DISABLED: string;
};
const ATTRIBUTE_IDENTIFIERS: IAttributeIdentifiers = {
  CLICK: 'onClick',
  DATA: `data-${PLUGIN_NAME_BASE}__is-clickable-element`,
  DISABLED: 'disabled',
};

const CSS_FILE_NAME: string = 'index.min.css';
const CSS_FILE_PATH: string = `${PLUGIN_NAME}/${CSS_FILE_NAME}`;

export default { ATTRIBUTE_IDENTIFIERS, CSS_FILE_PATH, PLUGIN_NAME };
