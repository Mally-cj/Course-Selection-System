/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ChatReq = {
    properties: {
        message: {
            type: 'string',
            isRequired: true,
        },
        model: {
            type: 'ChatModel',
        },
        chat_id: {
            type: 'any-of',
            contains: [{
                type: 'string',
            }, {
                type: 'null',
            }],
            isRequired: true,
        },
    },
} as const;
