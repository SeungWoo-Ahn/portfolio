import type { Project, ProjectCreateRequest } from "../types/domain/projectTypes";
import { wrapDatabaseError } from "./error/errorHandlers";
import { supabaseClient } from "./supabase";

export const PROJECT_TABLE_NAME = 'projects';

interface ProjectRepository {
    createProject(request: ProjectCreateRequest): Promise<void>;

    getProjects(): Promise<Project[]>;

    getProject(id: number): Promise<Project>;

    updateProject(id: number, request: ProjectCreateRequest): Promise<void>;

    deleteProject(id: number): Promise<void>;
}

export const projectRepository: ProjectRepository = {
    createProject: async (request: ProjectCreateRequest): Promise<void> => {
        const { error } = await supabaseClient
            .from(PROJECT_TABLE_NAME)
            .insert(request);
        if (error) {
            throw wrapDatabaseError(error);
        };
    },
    getProjects: async (): Promise<Project[]> => {
        const { data, error } = await supabaseClient
            .from(PROJECT_TABLE_NAME)
            .select('*')
            .order('start_date', { ascending: false });
        if (error) {
            throw wrapDatabaseError(error);
        };
        return data as Project[];
    },
    getProject: async (id: number): Promise<Project> => {
        const { data, error } = await supabaseClient
            .from(PROJECT_TABLE_NAME)
            .select('*')
            .eq('id', id)
            .single();
        if (error) {
            throw wrapDatabaseError(error);
        };
        return data as Project;
    },
    updateProject: async (id: number, request: ProjectCreateRequest): Promise<void> => {
        const { error } = await supabaseClient
            .from(PROJECT_TABLE_NAME)
            .update(request)
            .eq('id', id);
        if (error) {
            throw wrapDatabaseError(error);
        };
    },
    deleteProject: async (id: number): Promise<void> => {
        const { error } = await supabaseClient
            .from(PROJECT_TABLE_NAME)
            .delete()
            .eq('id', id);
        if (error) {
            throw wrapDatabaseError(error);
        };
    }
}