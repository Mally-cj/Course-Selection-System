/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Course = {
    properties: {
        id: {
            type: 'number',
            isRequired: true,
        },
        teacher_id: {
            type: 'number',
            isRequired: true,
        },
        teacher_name: {
            type: 'string',
            isRequired: true,
        },
        name: {
            type: 'string',
            isRequired: true,
        },
        textbook: {
            type: 'string',
            isRequired: true,
        },
        description: {
            type: 'string',
            isRequired: true,
        },
        class_time: {
            type: 'string',
            isRequired: true,
        },
        class_location: {
            type: 'string',
            isRequired: true,
        },
        enrollment_list_id: {
            type: 'number',
            isRequired: true,
        },
        announcement_id: {
            type: 'number',
            isRequired: true,
        },
        comment_id: {
            type: 'number',
            isRequired: true,
        },
        status: {
            type: 'string',
            isRequired: true,
        },
    },
} as const;
