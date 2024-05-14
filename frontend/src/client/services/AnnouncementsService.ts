/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Comment } from '../models/Comment';
import type { AnnouncementCreate } from '../models/AnnouncementCreate';
import type { CommentUpdate } from '../models/CommentUpdate';
import type { ListResp_Comment_ } from '../models/ListResp_Comment_';
import type {Announcement} from '../models/Announcement'
import type {ListResp_Announcement_} from '../models/ListResp_Announcement_'

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AnnouncementsService {


    
    /**
     * Create Announcement
     * 新增公告
     * @returns Announcement Successful Response
     * @throws ApiError
     */
     public static Createannouncement({
        requestBody,
    }: {
        requestBody: AnnouncementCreate,
    }): CancelablePromise<Announcement> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/announcements/add',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Create Announcement
     * 新增公告
     * @returns Announcement Successful Response
     * @throws ApiError
     */
     public static EditcourseAndnnouncement({
        requestBody,
    }: {
        requestBody: AnnouncementCreate,
    }): CancelablePromise<Announcement> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/announcements/addAndedit',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    // 以下方法未更改：

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
    }): CancelablePromise<ListResp_Announcement_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/announcements/',
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
     * Get Student
     * 通过课程id获取评价
     * @returns Comment Successful Response
     * @throws ApiError
     */
     public static getcommentsBycourse({
        courseId,
    }: {
        courseId: number,
    }): CancelablePromise<ListResp_Announcement_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/announcements/course/{course_id}',
            path: {
                'course_id': courseId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Student by id
     * 获取一个评价
     * @returns Comment Successful Response
     * @throws ApiError
     */
    public static commentsGetbyid({
        id,
    }: {
        id: number,
    }): CancelablePromise<Announcement> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/announcements/one/{id}',
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
    }): CancelablePromise<Announcement> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/announcements/{id}',
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
    }): CancelablePromise<Announcement> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/announcements/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}