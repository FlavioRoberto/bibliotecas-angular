import { BehaviorSubject } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

export class IcExpansivelTableDataSource<T> extends MatTableDataSource<T> {

  add(item: T): void {
    this.data = [...this.data, item];
    this.connect();
  }

  addRange(itens: T[]): void {
    this.data = this.data.concat(itens);
    this.connect();
  }

  removeByIndex(index: number): void {
    this.data.splice(index, 1);
    this.connect();
  }

  update(itens: T[]): void {
    this.data = [].concat(itens);
    this.connect();
  }

  clear(): void {
    this.data = [];
    this.connect();
  }

  connect(): BehaviorSubject<T[]> {
    const rows = [];
    this.data.forEach(element => rows.push(element, { detailRow: true, element }));
    super.connect().next(rows);
    return super.connect();
  }

}
