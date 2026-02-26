import type { ProjectCategory, ProjectStatus } from "../domain/projectTypes";

export type ProjectStatusUiModel = {
    label: string;
    color: string;
}

export type ProjectCategoryUiModel = {
    label: string;
    color: string;
}

export type ProjectCreatePayload = {
    title: string;
    content: string;
    status: ProjectStatus;
    category: ProjectCategory;
    startDate: string;
    endDate: string;
    projectUrl: string;
    additionalUr: string;
}