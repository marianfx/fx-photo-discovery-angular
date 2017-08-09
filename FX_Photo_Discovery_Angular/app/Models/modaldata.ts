import { IUser } from './user';
import { DbOperation } from '../shared/optype';

export interface IModalData {
    user: IUser;
    modalTitle: string;
    modalBtnTitle: string;
    dpOpType: DbOperation;
}