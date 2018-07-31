import { Account } from './account';

export class ApiResponse {
    status: number;
    message: string;
    user: Account;
}
