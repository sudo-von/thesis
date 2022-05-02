const getFirstName = (name:string) => name.split(' ').shift() ?? '';

const truncateName = (name:string) => (name.length > 22 ? name.slice(0, 22) : name);

export {
  getFirstName,
  truncateName,
};
