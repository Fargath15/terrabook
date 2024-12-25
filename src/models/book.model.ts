export interface IAddBookRequest {
    user_id: string;
    title: string;
    year: number;
    author: string;
    publisher: string;
    publication: string;
    date: Date;
    ISBN: string;
    genre: string;
    description: string;
    keywords: string[];
    language: string;
    page_count: number;
    cover_image: string;
    BISAC_subject_codes: string[];
    reviews: IBookReviewSchema[];
}

export interface IUpdateBookRequest extends IAddBookRequest {
    _id: string;
}

export interface IBookSchema extends BaseSchema {
    _id: string;
    title: string;
    year: number;
    author: string;
    publisher: string;
    publication: string;
    date: Date;
    ISBN: string;
    genre: string;
    description: string;
    keywords: string[];
    language: string;
    page_count: number;
    cover_image: string;
    BISAC_subject_codes: string[];
    reviews: IBookReviewSchema[];
}

export interface IBookReviewSchema extends BaseSchema {
    user_name: string;
    rating: number;
    review: string;
}

export interface BaseSchema {
    created_at: Date;
    created_by: string;
    updated_at: Date;
    updated_by: string;
}