/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ListResp_Course_ } from '../models/ListResp_Course_';
import type { ListResp_Student_ } from '../models/ListResp_Student_';
import type { Student } from '../models/Student';
import type { StudentCreate } from '../models/StudentCreate';
import type { StudentUpdate } from '../models/StudentUpdate';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class StudentsService {

    /**
     * List Students
     * 获取学生
     * @returns ListResp_Student_ Successful Response
     * @throws ApiError
     */
    public static studentsListStudents({
        skip,
        limit = 100,
    }: {
        skip?: number,
        limit?: number,
    }): CancelablePromise<ListResp_Student_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/students/',
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
     * Create Students
     * 获取学生
     * @returns Student Successful Response
     * @throws ApiError
     */
    public static studentsCreateStudents({
        requestBody,
    }: {
        requestBody: StudentCreate,
    }): CancelablePromise<Student> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/students/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Student
     * 获取学生
     * @returns Student Successful Response
     * @throws ApiError
     */
    public static studentsGetStudent({
        id,
    }: {
        id: number,
    }): CancelablePromise<Student> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/students/{id}',
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
     * 获取学生
     * @returns Student Successful Response
     * @throws ApiError
     */
    public static studentsUpdateStudent({
        id,
        requestBody,
    }: {
        id: number,
        requestBody: StudentUpdate,
    }): CancelablePromise<Student> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/students/{id}',
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
     * 获取学生
     * @returns Student Successful Response
     * @throws ApiError
     */
    public static studentsDeleteStudent({
        id,
    }: {
        id: number,
    }): CancelablePromise<Student> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/students/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * List Student Courses
     * 获取学生
     * @returns ListResp_Course_ Successful Response
     * @throws ApiError
     */
    public static studentsListStudentCourses({
        id,
        skip,
        limit = 100,
    }: {
        id: number,
        skip?: number,
        limit?: number,
    }): CancelablePromise<ListResp_Course_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/students/{id}/courses',
            path: {
                'id': id,
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
