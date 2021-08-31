const toArray = (value: object) => <string[]>Object.keys(value).filter(i => isNaN(Number(value)) !== false);

export default { toArray };
