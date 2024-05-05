/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Course } from '../models/Course';
import type { CourseCreate } from '../models/CourseCreate';
import type { CourseSelect } from '../models/CourseSelect';
import type { CourseUpdate } from '../models/CourseUpdate';
import type { ListResp_CourseOut_ } from '../models/ListResp_CourseOut_';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CoursesService {

    /**
     * List Courses
     * 获取课程
     * @returns ListResp_CourseOut_ Successful Response
     * @throws ApiError
     */
    public static coursesListCourses({
        skip,
        limit = 100,
    }: {
        skip?: number,
        limit?: number,
    }): CancelablePromise<ListResp_CourseOut_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/courses/',
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
     * Create Courses
     * 获取课程
     * @returns Course Successful Response
     * @throws ApiError
     */
    public static coursesCreateCourses({
        requestBody,
    }: {
        requestBody: CourseCreate,
    }): CancelablePromise<Course> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/courses/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Course
     * 获取课程
     * @returns Course Successful Response
     * @throws ApiError
     */
    public static coursesGetCourse({
        id,
    }: {
        id: number,
    }): CancelablePromise<Course> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/courses/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update Course
     * 获取课程
     * @returns Course Successful Response
     * @throws ApiError
     */
    public static coursesUpdateCourse({
        id,
        requestBody,
    }: {
        id: number,
        requestBody: CourseUpdate,
    }): CancelablePromise<Course> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/courses/{id}',
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
     * Delete Course
     * 获取课程
     * @returns Course Successful Response
     * @throws ApiError
     */
    public static coursesDeleteCourse({
        id,
    }: {
        id: number,
    }): CancelablePromise<Course> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/courses/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Select Course
     * 获取课程
     * @returns any Successful Response
     * @throws ApiError
     */
    public static coursesSelectCourse({
        requestBody,
    }: {
        requestBody: CourseSelect,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/courses/select',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
