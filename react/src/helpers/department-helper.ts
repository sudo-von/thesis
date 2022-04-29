// eslint-disable-next-line import/prefer-default-export
export const formatDepartmentCost = (cost: number) => `$${cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
