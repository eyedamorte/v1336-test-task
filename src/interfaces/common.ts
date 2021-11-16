export interface IListDataElement {}

export interface IPaginateConfig {
  perPage: number;
  currentPage: number;
}

export interface IDepartment {
  id: number;
  name: string;
}

export interface IPosition {
  field: string;
  cluster: number;
  well: number;
}

export interface IBrigade {
  id: number;
  brigade_name: string;
  connection_state: number;
  department: IDepartment;
  position: IPosition;
}

export interface IBrigadesState {
  isPending: boolean;
  brigades: IBrigade[];
  filteredBrigades: IBrigade[];
}

export interface ISelectItem {
  id: number
  name: string
}