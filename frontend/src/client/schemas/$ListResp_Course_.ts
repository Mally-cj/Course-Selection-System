/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ListResp_Course_ = {
    properties: {
        data: {
            type: 'any-of',
            contains: [{
                type: 'array',
                contains: {
                    type: 'Course',
                },
            }, {
                type: 'null',
            }],
        },
        count: {
            type: 'number',
            isRequired: true,
        },
    },
} as const;
