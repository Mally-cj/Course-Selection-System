/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Comment } from '../models/Comment';
import type { CommentCreate } from '../models/CommentCreate';
import type { CommentUpdate } from '../models/CommentUpdate';
import type { CommentwithStudent } from '../models/CommentwithStudent';
import type { ListResp_Comment_ } from '../models/ListResp_Comment_';
import type { ListResp_CommentwithStudent_ } from '../models/ListResp_CommentwithStudent_';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CommentsService {

    /**
     * Get Coursecomments
     * 获取课程的全部评价
     * @returns ListResp_CommentwithStudent_ Successful Response
     * @throws ApiError
     */
    public static commentsGetCoursecomments({
        courseId,
        skip,
        limit = 100,
    }: {
        courseId: number,
        skip?: number,
        limit?: number,
    }): CancelablePromise<ListResp_CommentwithStudent_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/comments/course/{course_id}',
            path: {
                'course_id': courseId,
            },
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
     * List Comments
     * 无条件获取全部评价
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
     * 新增评价
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
     * 通过id获取评价
     * @returns CommentwithStudent Successful Response
     * @throws ApiError
     */
    public static commentsGetStudent({
        id,
    }: {
        id: number,
    }): CancelablePromise<CommentwithStudent> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/comments/one/{id}',
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
     * 更新评价
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
     * 删除评价
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
