export type ProjectStatus = 'NOT_DEPLOYED' | 'DEPLOYED';

export type ProjectCategory = 'PERSONAL' | 'TEAM';

export type Project = {
    id: number;
    title: string;
    content: string;
    status: ProjectStatus;
    category: ProjectCategory;
    start_date: string;
    end_date: string | null;
    project_url: string | null;
    additional_url: string | null;
    created_at: string;
}

export type ProjectCreateRequest = Omit<Project, 'id' | 'created_at'>;