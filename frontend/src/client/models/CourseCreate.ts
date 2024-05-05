/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CourseCreate = {
    id?: (number | null);
    name?: (string | null);
    textbook: string;
    description?: (string | null);
    class_time: string;
    class_location: string;
    teacher_id?: (number | null);
    status: string;
    max_capacity?: (number | null);
    current_capacity?: (number | null);
};

