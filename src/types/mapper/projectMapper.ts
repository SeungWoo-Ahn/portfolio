import type { ProjectCategory, ProjectCreateRequest, ProjectStatus } from "../domain/projectTypes";
import type { ProjectCategoryUiModel, ProjectCreatePayload, ProjectStatusUiModel } from "../uiModel/projectUiModel";

export const ProjectStatusRecord: Record<ProjectStatus, ProjectStatusUiModel> = {
    NOT_DEPLOYED: {
        label: '미배포',
        color: ''
    },
    DEPLOYED: {
        label: '배포 중',
        color: ''
    }
};

export const projectStatusEntries = Object.entries(ProjectStatusRecord).map(([key, value]) => ({
    id: key as ProjectStatus,
    ...value, 
}));

export const ProjectCategoryRecord: Record<ProjectCategory, ProjectCategoryUiModel> = {
    PERSONAL: {
        label: '개인 프로젝트',
        color: ''
    },
    TEAM: {
        label: '팀 프로젝트',
        color: ''
    }
};

export const projectCategoryEntries = Object.entries(ProjectCategoryRecord).map(([key, value]) => ({
    id: key as ProjectCategory,
    ...value,
}));

export const projectMapper = {
    toRequest: (payload: ProjectCreatePayload): ProjectCreateRequest => {
        return {
            ...payload,
            start_date: payload.startDate,
            end_date: payload.endDate,
            project_url: payload.projectUrl,
            additional_url: payload.additionalUr,
        }
    }
}

