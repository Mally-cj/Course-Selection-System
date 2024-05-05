/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $UserOut = {
    properties: {
        email: {
            type: 'string',
            isRequired: true,
        },
        is_active: {
            type: 'boolean',
        },
        is_superuser: {
            type: 'boolean',
        },
        full_name: {
            type: 'any-of',
            contains: [{
                type: 'string',
            }, {
                type: 'null',
            }],
        },
        student_id: {
            type: 'any-of',
            contains: [{
                type: 'number',
            }, {
                type: 'null',
            }],
        },
        teacher_id: {
            type: 'any-of',
            contains: [{
                type: 'number',
            }, {
                type: 'null',
            }],
        },
        user_type: {
            type: 'UserType',
            isRequired: true,
        },
        id: {
            type: 'number',
            isRequired: true,
        },
        student: {
            type: 'any-of',
            contains: [{
                type: 'Student',
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
