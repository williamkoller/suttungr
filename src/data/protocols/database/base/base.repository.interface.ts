export interface BaseRepositoryInterface<T> {
  insert(data: T): Promise<T>;
  find(): Promise<T[]>;
  findById(id: number): Promise<T>;
  update(id: number, data: T): Promise<T>;
  delete(id: number): Promise<void>;
}
