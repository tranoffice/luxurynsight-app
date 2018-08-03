import { Account } from './account';

export class ApiResponse {
    status: number;
    message: string;
    session: string;
    user: Account;
}
