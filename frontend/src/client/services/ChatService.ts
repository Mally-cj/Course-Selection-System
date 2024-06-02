/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChatReq } from '../models/ChatReq';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ChatService {

    /**
     * Chat History
     * 获取聊天的历史
     * @returns any Successful Response
     * @throws ApiError
     */
    public static chatChatHistory({
        chatId,
    }: {
        chatId?: (string | null),
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/chat/history',
            query: {
                'chat_id': chatId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Chat History Clear
     * 清除聊天的历史
     * @returns any Successful Response
     * @throws ApiError
     */
    public static chatChatHistoryClear({
        chatId,
    }: {
        chatId?: (string | null),
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/chat/history/clear',
            query: {
                'chat_id': chatId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Chat
     * 进行聊天
     * @returns any Successful Response
     * @throws ApiError
     */
    public static chatChat({
        requestBody,
    }: {
        requestBody: ChatReq,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/chat/chat',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
