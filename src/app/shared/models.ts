export interface User {
    uid?: string;
    name?: string;
    email?: string;
    profileImageURL?: string;
    score?: number;
    admin?: boolean;
    updated?: any;
};

export interface Challenge {
    id?: string;
    name?: string;
    description?: string;
    type?: string;
    maxPoints?: number;
}
