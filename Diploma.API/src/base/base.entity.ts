export class BaseEntity<T> {
    id?: string;
    created_at?: string;
    updated_at?: string;

    constructor(partial: Partial<T>) {
        Object.assign(this, partial);
    }
}