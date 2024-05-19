/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Announcement } from '../models/Announcement';
import type { AnnouncementCreate } from '../models/AnnouncementCreate';
import type { CommentUpdate } from '../models/CommentUpdate';
import type { ListResp_Announcement_ } from '../models/ListResp_Announcement_';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AnnouncementsService {

    /**
     * Create Announcements
     * 新增公告
     * @returns Announcement Successful Response
     * @throws ApiError
     */
    public static announcementsCreateAnnouncements({
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
     * Createandedit Announcements
     * 新增调课公告
     * @returns Announcement Successful Response
     * @throws ApiError
     */
    public static announcementsCreateAndeditAnnouncements({
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

    /**
     * Get Courseannouncement
     * 获取课程的全部公告
     * @returns ListResp_Announcement_ Successful Response
     * @throws ApiError
     */
    public static announcementsGetCourseannouncement({
        courseId,
        skip,
        limit = 100,
    }: {
        courseId: number,
        skip?: number,
        limit?: number,
    }): CancelablePromise<ListResp_Announcement_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/announcements/course/{course_id}',
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
     * List Announcement
     * 无条件获取全部公告
     * @returns ListResp_Announcement_ Successful Response
     * @throws ApiError
     */
    public static announcementsListAnnouncement({
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
     * Update Announcement
     * 更新评价
     * @returns Announcement Successful Response
     * @throws ApiError
     */
    public static announcementsUpdateAnnouncement({
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
     * Delete Announcement
     * 删除评价
     * @returns Announcement Successful Response
     * @throws ApiError
     */
    public static announcementsDeleteAnnouncement({
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
