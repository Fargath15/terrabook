import { Schema, model } from 'mongoose';
import Joi from 'joi';
import { IBookSchema, IAddBookRequest, IUpdateBookRequest, IBookReviewSchema } from './book.model';

const bookReviewSchema = new Schema<IBookReviewSchema>({
    user_name: {
        type: String,
        required: true
    },

    rating: {
        type: Number,
        required: true
    },

    review: {
        type: String,
        required: false
    }
});

const booksSchema = new Schema<IBookSchema>({
    created_at: {
        type: Date,
        required: false,
        default: Date.now()
    },

    created_by: {
        type: String,
        required: false
    },

    updated_at: {
        type: Date,
        required: false,
        default: Date.now()
    },

    updated_by: {
        type: String,
        required: false
    },

    title: {
        type: String,
        required: true
    },

    year: {
        type: Number,
        required: true
    },

    author: {
        type: String,
        required: true
    },

    publisher: {
        type: String,
        required: false
    },

    publication: {
        type: String,
        required: false
    },

    date: {
        type: Date,
        required: false,
        default: Date.now()
    },

    ISBN: {
        type: String,
        required: false
    },

    genre: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: false
    },

    keywords: {
        type: [String],
        required: false
    },

    language: {
        type: String,
        required: true
    },

    page_count: {
        type: Number,
        required: true,
        default: 1
    },

    cover_image: {
        type: String,
        required: false
    },

    BISAC_subject_codes: {
        type: [String],
        required: false
    },

    reviews: {
        type: [bookReviewSchema],
        required: false
    }
});

export const Book = model<IBookSchema>('Books', booksSchema);

export const addBookSchemaValidate = Joi.object<IAddBookRequest>({
    user_id: Joi.string(),
    title: Joi.string().required(),
    year: Joi.number().required(),
    author: Joi.string().required(),
    language: Joi.string().required(),
    page_count: Joi.number(),
    genre: Joi.string().required(),
    cover_image: Joi.string(),
    publisher: Joi.string(),
    publication: Joi.string(),
    date: Joi.string().isoDate(),
    ISBN: Joi.string(),
    description: Joi.string(),
    keywords: Joi.array().items(Joi.string()),
    BISAC_subject_codes: Joi.array().items(Joi.string()),
    reviews: Joi.array().items(Joi.object<IBookReviewSchema>({
        user_name: Joi.string(),
        rating: Joi.number().required().allow(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
            .error(new Error("Please enter the ratings from 1 to 10")),
        review: Joi.string()
    }))
});

export const getBookSchemaValidate = Joi.string<string>().required();

export const updateBookSchemaValidate = Joi.object<IUpdateBookRequest>({
    user_id: Joi.string(),
    title: Joi.string(),
    year: Joi.number(),
    author: Joi.string(),
    language: Joi.string(),
    page_count: Joi.number(),
    genre: Joi.string(),
    cover_image: Joi.string(),
    publisher: Joi.string(),
    publication: Joi.string(),
    date: Joi.string().isoDate(),
    ISBN: Joi.string(),
    description: Joi.string(),
    keywords: Joi.array().items(Joi.string()),
    BISAC_subject_codes: Joi.array().items(Joi.string()),
    reviews: Joi.array().items(Joi.object<IBookReviewSchema>({
        user_name: Joi.string(),
        rating: Joi.number().allow(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
            .error(new Error("Please enter the ratings from 1 to 10")),
        review: Joi.string()
    }))
});

export const deleteBookSchemaValidate = Joi.string<string>().required();