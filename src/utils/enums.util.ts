const toArray = (value: object) => <string[]>Object.keys(value).filter(i => isNaN(Number(i)) === true);

export default { toArray };
