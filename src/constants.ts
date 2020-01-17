const PLUGIN_NAME: string = 'babel-plugin-cursor-pointer';

type IAttributeIdentifiers = {
  CLICK: string;
  DATA: string;
  DISABLED: string;
};
const ATTRIBUTE_IDENTIFIERS: IAttributeIdentifiers = {
  CLICK: 'onClick',
  DATA: `data-${PLUGIN_NAME}__is-clickable`,
  DISABLED: 'disabled',
};

const CSS_FILE_NAME: string = 'index.css';
const CSS_FILE_PATH: string = `${PLUGIN_NAME}/${CSS_FILE_NAME}`;

export default { ATTRIBUTE_IDENTIFIERS, CSS_FILE_PATH, PLUGIN_NAME };
