export interface IRepository {
  created(dto): any;
  findById(id: number): any;
  findAll(): any;
  updateById(dto): any;
  deleteById(id: number): void;
}
