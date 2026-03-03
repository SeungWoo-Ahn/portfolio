import React, { useState } from "react";
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

    const handleHref = (e: React.MouseEvent) => {
        e.stopPropagation();
    }

    return (
        <article
            className={styled.article}
            style={{ zIndex: zIndex }}
            onClick={toggleExpanded}>
            <div className={styled.header}>
                <div className={styled.headerTop}>
                    <h3 className={styled.headerTitle}>{project.title}</h3>
                    <span
                        className={styled.headerChip}
                        style={{ backgroundColor: project.category.color }}>
                        {project.category.label}
                    </span>
                    <span
                        className={styled.headerChip}
                        style={{ backgroundColor: project.status.color }}>
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
                            <Link to={PATHS.PROJECT_EDIT(project.id)}>EDIT</Link>
                            <a onClick={onDelete}>DELETE</a>
                        </div>
                    )}
                    <div className={styled.bodyUrlWrapper}>
                        {project.projectUrl && <a href={project.projectUrl} target='_blank' onClick={handleHref}>Github</a>}
                        {project.additionalUrl && <a href={project.additionalUrl} target='_blank' onClick={handleHref}>Link</a>}
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