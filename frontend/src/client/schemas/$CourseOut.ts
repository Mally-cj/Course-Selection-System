/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CourseOut = {
    properties: {
        id: {
            type: 'any-of',
            contains: [{
                type: 'number',
            }, {
                type: 'null',
            }],
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
            type: 'any-of',
            contains: [{
                type: 'string',
            }, {
                type: 'null',
            }],
        },
        class_time: {
            type: 'string',
            isRequired: true,
        },
        class_location: {
            type: 'string',
            isRequired: true,
        },
        teacher_id: {
            type: 'any-of',
            contains: [{
                type: 'number',
            }, {
                type: 'null',
            }],
        },
        status: {
            type: 'string',
            isRequired: true,
        },
        max_capacity: {
            type: 'any-of',
            contains: [{
                type: 'number',
            }, {
                type: 'null',
            }],
        },
        current_capacity: {
            type: 'any-of',
            contains: [{
                type: 'number',
            }, {
                type: 'null',
            }],
        },
        teacher: {
            type: 'any-of',
            contains: [{
                type: 'Teacher',
            }, {
                type: 'null',
            }],
        },
    },
} as const;
