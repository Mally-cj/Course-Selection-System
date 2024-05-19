/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $StudentCreateList = {
    properties: {
        students: {
            type: 'array',
            contains: {
                type: 'StudentCreate',
            },
            isRequired: true,
        },
    },
} as const;
