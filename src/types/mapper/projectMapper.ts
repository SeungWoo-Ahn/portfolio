import type { Project, ProjectCategory, ProjectCreateRequest, ProjectStatus } from "../domain/projectTypes";
import type { ProjectCategoryUiModel, ProjectCreatePayload, ProjectStatusUiModel, ProjectUiModel } from "../uiModel/projectUiModel";
import { dateMapper } from "./dateMapper";

const ProjectStatusRecord: Record<ProjectStatus, ProjectStatusUiModel> = {
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

const ProjectCategoryRecord: Record<ProjectCategory, ProjectCategoryUiModel> = {
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
            title: payload.title.trim(),
            content: payload.content.trim(),
            status: payload.status,
            category: payload.category,
            start_date: payload.startDate,
            end_date: payload.endDate || null,
            project_url: payload.projectUrl || null,
            additional_url: payload.additionalUrl || null,
        }
    },
    toPayload: (project: Project): ProjectCreatePayload => {
        return {
            title: project.title,
            content: project.content,
            status: project.status,
            category: project.category,
            startDate: project.start_date,
            endDate: project.end_date || '',
            projectUrl: project.project_url || '',
            additionalUrl: project.additional_url || '',
        }
    },
    toUiModel: (project: Project): ProjectUiModel => {
        return {
            id: project.id,
            title: project.title,
            content: project.content,
            status: ProjectStatusRecord[project.status],
            category: ProjectCategoryRecord[project.category],
            projectPeriod: project.end_date
                ? `${dateMapper.toFullDate(project.start_date)} - ${dateMapper.toFullDate(project.end_date)}`
                : `${dateMapper.toFullDate(project.start_date)} - 진행 중`,
            projectUrl: project.project_url,
            additionalUrl: project.additional_url,
            createdAt: dateMapper.toFullDate(project.created_at),
        }
    }
}

