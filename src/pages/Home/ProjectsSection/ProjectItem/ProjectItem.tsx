import { useState } from "react";
import type { ProjectUiModel } from "../../../../types/uiModel/projectUiModel";
import styled from './ProjectItem.module.css';
import MarkdownPreview from "../../../../components/MarkdownPreview/MarkdownPreview";
import { Link } from "react-router-dom";
import { PATHS } from "../../../../consts/Paths";

interface ProjectItemProps {
    project: ProjectUiModel;
    showManageButton: boolean;
    zIndex: number;
    onDelete: () => void;
}

const ProjectItem = ({ project, showManageButton, zIndex, onDelete }: ProjectItemProps) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpanded = () => {
        setExpanded(it => !it);
    }

    return (
        <article
            className={styled.article}
            style={{ zIndex: zIndex }}
            onClick={toggleExpanded}>
            <div className={styled.header}>
                <div className={styled.headerTop}>
                    <h3 className={styled.headerTitle}>{project.title}</h3>
                    <span className={styled.headerChip}>
                        {project.category.label}
                    </span>
                    <span className={styled.headerChip}>
                        {project.status.label}
                    </span>
                </div>
                <div className={styled.headerBottom}>
                    {project.projectPeriod}
                </div>
            </div>
            <div className={`${styled.body} ${expanded ? styled.expanded : ''}`}>
                <div className={styled.bodyContent}>
                    {showManageButton && (
                        <div className={styled.bodyManageWrapper}>
                            <Link to={PATHS.BLOG_EDIT(project.id)}>EDIT</Link>
                            <a onClick={onDelete}>DELETE</a>
                        </div>
                    )}
                    <div className={styled.bodyUrlWrapper}>
                        {project.projectUrl && <a href={project.projectUrl} target='_blank'>Github</a>}
                        {project.additionalUrl && <a href={project.additionalUrl} target='_blank'>Link</a>}
                    </div>
                    <div className={styled.bodyMarkdownWrapper}>
                        <MarkdownPreview markdown={project.content} />
                    </div>
                </div>
            </div>
        </article>
    );
};

export default ProjectItem;