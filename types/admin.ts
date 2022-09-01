//Admin types

export interface Admin {
    length: number;
    map(arg0: (admin: any) => JSX.Element): import("react").ReactNode;
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    createdAt: string;
    updatedAt: string;
}
