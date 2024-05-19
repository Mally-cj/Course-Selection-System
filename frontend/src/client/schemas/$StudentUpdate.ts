/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $StudentUpdate = {
    properties: {
        name: {
            type: 'any-of',
            contains: [{
                type: 'string',
            }, {
                type: 'null',
            }],
        },
        student_id: {
            type: 'string',
            isRequired: true,
        },
        email: {
            type: 'string',
            isRequired: true,
        },
        major: {
            type: 'string',
            isRequired: true,
        },
        classLocation: {
            type: 'string',
            isRequired: true,
        },
    },
} as const;
