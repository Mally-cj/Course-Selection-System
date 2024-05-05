/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Teacher } from './Teacher';

export type CourseOut = {
    id?: (number | null);
    name: string;
    textbook: string;
    description?: (string | null);
    class_time: string;
    class_location: string;
    teacher_id?: (number | null);
    status: string;
    max_capacity?: (number | null);
    current_capacity?: (number | null);
    teacher?: (Teacher | null);
};

