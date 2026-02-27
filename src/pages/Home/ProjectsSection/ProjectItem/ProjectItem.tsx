import { useState } from "react";
import type { ProjectUiModel } from "../../../../types/uiModel/projectUiModel";
import styled from './ProjectItem.module.css';

interface ProjectItemProps {
    project: ProjectUiModel;
    showManageButton: boolean;
    zIndex: number;
    onDelete: () => void;
}

const ProjectItem = ({ project, zIndex }: ProjectItemProps) => {
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
        </article>
    );
};

export default ProjectItem;