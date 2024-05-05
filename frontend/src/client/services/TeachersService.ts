/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ListResp_Teacher_ } from '../models/ListResp_Teacher_';
import type { Teacher } from '../models/Teacher';
import type { TeacherCreate } from '../models/TeacherCreate';
import type { TeacherUpdate } from '../models/TeacherUpdate';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TeachersService {

    /**
     * List Teacher
     * 获取教师
     * @returns ListResp_Teacher_ Successful Response
     * @throws ApiError
     */
    public static teachersListTeacher({
        skip,
        limit = 100,
    }: {
        skip?: number,
        limit?: number,
    }): CancelablePromise<ListResp_Teacher_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/teachers/',
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
     * Create Teacher
     * 获取教师
     * @returns Teacher Successful Response
     * @throws ApiError
     */
    public static teachersCreateTeacher({
        requestBody,
    }: {
        requestBody: TeacherCreate,
    }): CancelablePromise<Teacher> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/teachers/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Teacher
     * 获取教师
     * @returns Teacher Successful Response
     * @throws ApiError
     */
    public static teachersGetTeacher({
        id,
    }: {
        id: number,
    }): CancelablePromise<Teacher> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/teachers/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update Teacher
     * 获取教师
     * @returns Teacher Successful Response
     * @throws ApiError
     */
    public static teachersUpdateTeacher({
        id,
        requestBody,
    }: {
        id: number,
        requestBody: TeacherUpdate,
    }): CancelablePromise<Teacher> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/teachers/{id}',
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
     * Delete Teacher
     * 获取教师
     * @returns Teacher Successful Response
     * @throws ApiError
     */
    public static teachersDeleteTeacher({
        id,
    }: {
        id: number,
    }): CancelablePromise<Teacher> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/teachers/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
