/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Comment } from '../models/Comment';
import type { CommentCreate } from '../models/CommentCreate';
import type { CommentUpdate } from '../models/CommentUpdate';
import type { ListResp_Comment_ } from '../models/ListResp_Comment_';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CommentsService {

    /**
     * List Comments
     * 获取评价
     * @returns ListResp_Comment_ Successful Response
     * @throws ApiError
     */
    public static commentsListComments({
        skip,
        limit = 100,
    }: {
        skip?: number,
        limit?: number,
    }): CancelablePromise<ListResp_Comment_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/comments/',
            query: {
                'skip': skip,
                'limit': limit,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Create Comments
     * 获取评价
     * @returns Comment Successful Response
     * @throws ApiError
     */
    public static commentsCreateComments({
        requestBody,
    }: {
        requestBody: CommentCreate,
    }): CancelablePromise<Comment> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/comments/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Student
     * 获取评价
     * @returns Comment Successful Response
     * @throws ApiError
     */
    public static commentsGetStudent({
        id,
    }: {
        id: number,
    }): CancelablePromise<Comment> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/comments/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update Student
     * 获取评价
     * @returns Comment Successful Response
     * @throws ApiError
     */
    public static commentsUpdateStudent({
        id,
        requestBody,
    }: {
        id: number,
        requestBody: CommentUpdate,
    }): CancelablePromise<Comment> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/comments/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Delete Student
     * 获取评价
     * @returns Comment Successful Response
     * @throws ApiError
     */
    public static commentsDeleteStudent({
        id,
    }: {
        id: number,
    }): CancelablePromise<Comment> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/comments/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
