/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $EnrollmentOut = {
    properties: {
        course_id: {
            type: 'number',
            isRequired: true,
        },
        student_id: {
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
    },
} as const;
