/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CommentUpdate = {
    properties: {
        course_id: {
            type: 'number',
            isRequired: true,
        },
        student_id: {
            type: 'number',
            isRequired: true,
        },
        content: {
            type: 'any-of',
            contains: [{
                type: 'string',
            }, {
                type: 'null',
            }],
        },
        id: {
            type: 'any-of',
            contains: [{
                type: 'number',
            }, {
                type: 'null',
            }],
        },
    },
} as const;
