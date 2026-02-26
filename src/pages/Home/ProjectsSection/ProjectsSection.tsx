import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../consts/QueryKeys";
import { projectRepository } from "../../../data/projectRepository";
import { projectMapper } from "../../../types/mapper/projectMapper";
import { Link } from "react-router-dom";
import { PATHS } from "../../../consts/Paths";
import { useAuth } from "../../../hooks/useAuth";

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
        <section>
            {data?.map(it => (
                <article key={it.id}>
                    <p>{it.title}</p>
                    <p>{it.content}</p>
                    <p>{it.status.label}</p>
                    <p>{it.category.label}</p>
                    <p>{it.projectPeriod}</p>
                    <p>{it.createdAt}</p>
                    {it.projectUrl && <a href={it.projectUrl} target='_blank'>Github</a>}
                    {it.additionalUrl && <a href={it.additionalUrl} target='_blank'>Github</a>}
                    {isLoggedIn && (
                        <>
                            <Link to={PATHS.PROJECT_EDIT(it.id)}>수정</Link>
                            <button onClick={() => onDelete(it.id)}>삭제</button>
                        </>
                    )}

                </article>
            ))}
        </section>
    );
};

export default ProjectsSection;