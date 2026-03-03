import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../consts/QueryKeys";
import { projectRepository } from "../../../data/projectRepository";
import { useAuth } from "../../../hooks/useAuth";
import { projectMapper } from "../../../types/mapper/projectMapper";
import ProjectItem from "./ProjectItem/ProjectItem";
import styled from '../Home.module.css'
import { Link } from "react-router-dom";
import { PATHS } from "../../../consts/Paths";
import { forwardRef } from "react";
import { useToast } from "../../../hooks/useToast";

const ProjectsSection = forwardRef<HTMLDivElement, {}>((_, ref) => {
    const { isLoggedIn } = useAuth();
    const queryClient = useQueryClient();
    const { showToast } = useToast();

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
            });
            showToast('success', '프로젝트를 삭제했습니다');
        },
    });

    const onDelete = (id: number) => {
        if (window.confirm('정말 삭제할까요?')) {
            deleteMutation.mutate(id);
        }
    }

    return (
        <section className={styled.section} ref={ref}>
            <div className={styled.sectionHeader}>
                <h2 className={styled.title}>PROJECTS</h2>
                {isLoggedIn && <Link to={PATHS.PROJECT_POST}>NEW →</Link>}
            </div>
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
});

export default ProjectsSection;