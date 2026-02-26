import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import SubmitButton from "../../components/Button/SubmitButton";
import Input from "../../components/Input/Input";
import { projectRepository } from "../../data/projectRepository";
import { projectCategoryEntries, projectMapper, projectStatusEntries } from "../../types/mapper/projectMapper";
import type { ProjectCreatePayload } from "../../types/uiModel/projectUiModel";

const ProjectPost = () => {
    const { register, handleSubmit } = useForm<ProjectCreatePayload>();

    const createMutation = useMutation({
        mutationFn: (payload: ProjectCreatePayload) => {
            const request = projectMapper.toRequest(payload);
            console.log(request);
            return projectRepository.createProject(request);
        },
        onError: (error) => { alert(error.message) }
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, payload }: { id: number, payload: ProjectCreatePayload }) => 
            projectRepository.updateProject(id, projectMapper.toRequest(payload)),
        onError: (error) => { alert(error.message) }
    });
    
    const onSubmit = (payload: ProjectCreatePayload) => {
        createMutation.mutate(payload);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Input
                type='text'
                placheholder='제목을 입력하세요'
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
                registration={register('startDate', {
                    required: true
                })}
            />
            <Input
                type='date'
                registration={register('endDate', {
                    validate: (value, formValues) => {
                        if (!value) return true;
                        return value >= formValues.startDate || '종료일은 시작일보다 빠를 수 없습니다.'
                    }
                })}
            />
            <Input
                type='text'
                placheholder='내용...'
                registration={register('content', {
                    required: true
                })}
            />
            <Input
                type='text'
                placheholder='https://... (github)'
                registration={register('projectUrl')}
            />
            <Input
                type='text'
                placheholder='https://... (추가 링크)'
                registration={register('additionalUrl')}
            />
            <SubmitButton isLoading={createMutation.isPending}/>
        </form>
    );
};

export default ProjectPost;