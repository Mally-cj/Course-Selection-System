/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CourseCreate = {
    properties: {
        id: {
            type: 'number',
        },
        teacher_id: {
            type: 'number',
        },
        teacher_name: {
            type: 'string',
        },
        name: {
            type: 'string',
        },
        textbook: {
            type: 'any-of',
            contains: [{
                type: 'string',
            }, {
                type: 'null',
            }],
        },
        description: {
            type: 'any-of',
            contains: [{
                type: 'string',
            }, {
                type: 'null',
            }],
        },
        class_time: {
            type: 'string',
        },
        class_location: {
            type: 'string',
        },
        enrollment_list_id: {
            type: 'number',
        },
        announcement_id: {
            type: 'number',
        },
        comment_id: {
            type: 'number',
        },
        status: {
            type: 'string',
        },
    },
} as const;
