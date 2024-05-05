/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Student } from './Student';
import type { Teacher } from './Teacher';
import type { UserType } from './UserType';

export type UserOut = {
    email: string;
    is_active?: boolean;
    is_superuser?: boolean;
    full_name?: (string | null);
    student_id?: (number | null);
    teacher_id?: (number | null);
    user_type: UserType;
    id: number;
    student?: (Student | null);
    teacher?: (Teacher | null);
};

