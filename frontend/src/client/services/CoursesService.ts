/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Course } from '../models/Course';
import type { CourseCreate } from '../models/CourseCreate';
import type { CourseSelect } from '../models/CourseSelect';
import type { CourseUpdate } from '../models/CourseUpdate';
import type { ListResp_CourseOut_ } from '../models/ListResp_CourseOut_';
import type { ListResp_EnrollmentOut_ } from '../models/ListResp_EnrollmentOut_';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CoursesService {

    /**
     * List Teachercourses
     * 获取教师的课程
     * @returns ListResp_CourseOut_ Successful Response
     * @throws ApiError
     */
    public static coursesListTeachercourses({
        skip,
        limit = 100,
    }: {
        skip?: number,
        limit?: number,
    }): CancelablePromise<ListResp_CourseOut_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/courses/teachercourse',
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
     * List Courses
     * 获取所有的课程
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
     * List Checkedcourses
     * 获取审核已通过的课程
     * @returns ListResp_CourseOut_ Successful Response
     * @throws ApiError
     */
    public static coursesListCheckedcourses({
        skip,
        limit = 100,
    }: {
        skip?: number,
        limit?: number,
    }): CancelablePromise<ListResp_CourseOut_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/courses/checked',
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
     * List Checkedcourses
     * 获取审核未通过的课程
     * @returns ListResp_CourseOut_ Successful Response
     * @throws ApiError
     */
    public static coursesListUnCheckedcourses({
        skip,
        limit = 100,
    }: {
        skip?: number,
        limit?: number,
    }): CancelablePromise<ListResp_CourseOut_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/courses/unchecked',
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
     * 添加课程课程
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
            url: '/api/v1/courses/add',
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
     * Update Course
     * 审核通过课程
     * @returns Course Successful Response
     * @throws ApiError
     */
    public static coursesUpdateAuditCourse({
        id,
        requestBody,
    }: {
        id: number,
        requestBody: CourseUpdate,
    }): CancelablePromise<Course> {
        return __request(OpenAPI, {
            method: 'DELETE',
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
     * 学生选课
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

    /**
     * Unselect Course
     * 学生退课
     * @returns any Successful Response
     * @throws ApiError
     */
    public static coursesUnselectCourse({
        requestBody,
    }: {
        requestBody: CourseSelect,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/courses/unselect',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Getenrollmentlist
     * 获取课程报名名单
     * @returns ListResp_EnrollmentOut_ Successful Response
     * @throws ApiError
     */
    public static coursesGetenrollmentlist({
        courseId,
        skip,
        limit = 100,
    }: {
        courseId: number,
        skip?: number,
        limit?: number,
    }): CancelablePromise<ListResp_EnrollmentOut_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/courses/getenrollmentlist/{course_id}',
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

}
