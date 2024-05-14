/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export const $Announcement = {
    properties: {
        id: {
            type: 'any-of',
            contains: [{
                type: 'number',
            }, {
                type: 'null',
            }],
        },
        announcement_time: {
            type: 'string',
            isRequired: true,
        },
        course: {
            type: 'any-of',
            contains: [{
                type: 'Course',
            }, {
                type: 'null',
            }],
        },
        course_id: {
            type: 'number',
            isRequired: true,
        },
        content: {
            type: 'string',
            isRequired: true,
        },
    },
} as const;
