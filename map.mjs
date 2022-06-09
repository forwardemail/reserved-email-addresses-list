import list from './index.json';

export default new Map(list.map((key) => ({ [key]: key })));
