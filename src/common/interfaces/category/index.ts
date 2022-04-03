export interface ICategory {
    id?: string;
    title: string;
    hidden: boolean;
    parentId: string | null;
}
export interface ICategoryWithChildren {
    id?: string;
    title: string;
    hidden: boolean;
    parentId: string | null;
    childrenCategory: ICategoryWithChildren,
}
