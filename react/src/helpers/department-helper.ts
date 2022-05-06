export const formatDepartmentCost = (cost: number) => `$${cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;

export const handleDepartmentStatus = (status:boolean) => (status ? 'Disponible' : 'No disponible');
