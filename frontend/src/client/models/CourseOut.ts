/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Teacher } from './Teacher';

export type CourseOut = {
    id?: (number | null);
    name?: (string | null);
    textbook?: (string | null);
    description?: (string | null);
    class_time?: (string | null);
    class_location?: (string | null);
    teacher_id?: (number | null);
    status?: (string | null);
    max_capacity?: (number | null);
    current_capacity?: (number | null);
    teacher?: (Teacher | null);
};

