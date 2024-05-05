/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CourseCreate } from '../models/CourseCreate';
import type { CourseOut } from '../models/CourseOut';
import type { CoursesOut } from '../models/CoursesOut';
import type { CourseUpdate } from '../models/CourseUpdate';
import type { Message } from '../models/Message';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CoursesService {

    /**
     * Read Courses
     * Retrieve courses.
     * @returns CoursesOut Successful Response
     * @throws ApiError
     */
    public static readCourses({
skip,
limit = 100,
}: {
skip?: number,
limit?: number,
}): CancelablePromise<CoursesOut> {
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
     * Create Course
     * Create new Course.
     * @returns CourseOut Successful Response
     * @throws ApiError
     */
    public static createCourse({
requestBody,
}: {
requestBody: CourseCreate,
}): CancelablePromise<CourseOut> {
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
     * Read Course
     * Get Course by ID.
     * @returns CourseOut Successful Response
     * @throws ApiError
     */
    public static readCourse({
id,
}: {
id: number,
}): CancelablePromise<CourseOut> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/Course/{id}',
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
     * Update an Course.
     * @returns CourseOut Successful Response
     * @throws ApiError
     */
    public static updateCourse({
id,
requestBody,
}: {
id: number,
requestBody: CourseUpdate,
}): CancelablePromise<CourseOut> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/Courses/{id}',
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
     * Delete Item
     * Delete an item.
     * @returns Message Successful Response
     * @throws ApiError
     */
    public static deleteCourse({
id,
}: {
id: number,
}): CancelablePromise<Message> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/Courses/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
