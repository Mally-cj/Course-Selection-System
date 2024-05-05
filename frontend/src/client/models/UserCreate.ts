/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserType } from './UserType';

export type UserCreate = {
    email: string;
    is_active?: boolean;
    is_superuser?: boolean;
    full_name?: (string | null);
    student_id?: (number | null);
    teacher_id?: (number | null);
    user_type: UserType;
    password: string;
};

