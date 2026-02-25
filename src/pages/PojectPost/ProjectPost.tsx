import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import SubmitButton from "../../components/Button/SubmitButton";
import Input from "../../components/Input/Input";
import { projectRepository } from "../../data/projectRepository";
import type { ProjectCreateRequest } from "../../types/domain/projectTypes";
import { projectCategoryEntries, projectStatusEntries } from "../../types/mapper/projectMapper";

const ProjectPost = () => {
    const { register, handleSubmit } = useForm<ProjectCreateRequest>();

    const createMutation = useMutation({
        mutationFn: (request: ProjectCreateRequest) => projectRepository.createProject(request),
        onError: (error) => { alert(error.message) }
    });

    /**
    const updateMutation = useMutation({
        mutationFn: (request: ProjectCreateRequest) => projectRepository.updateProject(id, request),
        onError: (error) => { alert(error.message) }
    });
    */

    const onSubmit = (request: ProjectCreateRequest) => {
        const payload: ProjectCreateRequest = {
            ...request,
            end_date: request.end_date || null,
            cover_image_url: request.cover_image_url || null,
            project_url: request.project_url || null,
            additional_url: request.additional_url || null,
        }
        createMutation.mutate(payload);  
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Input
                type='text'
                registration={register('title', {
                    required: true
                })}
            />
            <select {...register('status', { required: true })}>
                {projectStatusEntries.map(it => {
                    return <option key={it.id} value={it.id}>{it.label}</option>
                })}
            </select>
            <select {...register('category', { required: true })}>
                {projectCategoryEntries.map(it => {
                    return <option key={it.id} value={it.id}>{it.label}</option>
                })}
            </select>
            <Input
                type='date'
                registration={register('start_date', {
                    required: true
                })}
            />
            <Input
                type='date'
                registration={register('end_date')}
            />
            <Input
                type='text'
                registration={register('content', {
                    required: true
                })}
            />
            <Input
                type='text'
                registration={register('project_url')}
            />
            <Input
                type='text'
                registration={register('additional_url')}
            />
            <Input
                type='text'
                registration={register('cover_image_url')}
            />
            <SubmitButton />
        </form>
    );
};

export default ProjectPost;