export interface borrower{
    borrower_id: number;
    user_id: number;
    librarian_id: number;
    borrow_date: Date;
    return_date: Date;
    status: string;
    created_at?: Date;
    copy_id: number;
}