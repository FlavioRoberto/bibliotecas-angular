import { IDataBarBindService } from './IDataBarService';
import { DatabarEventClickService } from '../services/ic-databar-event-click.service';

export interface IDatabarBindOnClickService<T> extends IDataBarBindService<T>{
  eventDatabar: DatabarEventClickService;
}
