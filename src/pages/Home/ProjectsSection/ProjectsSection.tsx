import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../consts/QueryKeys";
import { projectRepository } from "../../../data/projectRepository";
import { useAuth } from "../../../hooks/useAuth";
import { projectMapper } from "../../../types/mapper/projectMapper";
import ProjectItem from "./ProjectItem/ProjectItem";
import styled from '../Home.module.css'

const ProjectsSection = () => {
    const { isLoggedIn } = useAuth();
    const queryClient = useQueryClient();

    const { data } = useQuery({
        queryKey: QUERY_KEYS.projects.all,
        queryFn: () => projectRepository.getProjects(),
        select: (data) => data.map(it => projectMapper.toUiModel(it)),
    });

    const deleteMutation = useMutation({
        mutationFn: (id: number) => projectRepository.deleteProject(id),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.projects.all,
            })
        },
        onError: (error) => { alert(error.message) }
    });

    const onDelete = (id: number) => {
        deleteMutation.mutate(id);
    }

    return (
        <section className={styled.section}>
            <h2 className={styled.title}>PROJECTS</h2>
            {data && data.map((it, index) => (
                <ProjectItem 
                    key={it.id} 
                    project={it}
                    showManageButton={isLoggedIn}
                    zIndex={index + 1}
                    onDelete={() => onDelete(it.id)} />
            ))}
        </section>
    );
};

export default ProjectsSection;