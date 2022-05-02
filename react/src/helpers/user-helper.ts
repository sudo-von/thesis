const getFirstName = (name:string) => name.split(' ').shift() ?? '';

const truncateName = (name:string) => (name.length > 28 ? name.slice(0, 28) : name);

export {
  getFirstName,
  truncateName,
};
