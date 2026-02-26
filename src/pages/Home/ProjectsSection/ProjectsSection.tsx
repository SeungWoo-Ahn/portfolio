import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../consts/QueryKeys";
import { projectRepository } from "../../../data/projectRepository";
import { projectMapper } from "../../../types/mapper/projectMapper";
import { Link } from "react-router-dom";
import { PATHS } from "../../../consts/Paths";

const ProjectsSection = () => {
    const { data } = useQuery({
        queryKey: QUERY_KEYS.projects.all,
        queryFn: () => projectRepository.getProjects(),
        select: (data) => data.map(it => projectMapper.toUiModel(it)),
    });
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
                    <Link to={PATHS.PROJECT_EDIT(it.id)}>수정</Link>
                    <button>삭제</button>
                </article>
            ))}
        </section>
    );
};

export default ProjectsSection;