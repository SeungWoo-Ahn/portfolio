import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import SubmitButton from "../../components/Button/SubmitButton";
import Input from "../../components/Input/Input";
import { projectRepository } from "../../data/projectRepository";
import { projectCategoryEntries, projectMapper, projectStatusEntries } from "../../types/mapper/projectMapper";
import type { ProjectCreatePayload } from "../../types/uiModel/projectUiModel";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { QUERY_KEYS } from "../../consts/QueryKeys";
import { PATHS } from "../../consts/Paths";

const ProjectPost = () => {
    const { id } = useParams<{ id: string }>();
    const projectId = id ? Number(id) : null;
    const editMode = Boolean(id);
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { register, handleSubmit, reset } = useForm<ProjectCreatePayload>();

    const { data, isError } = useQuery({
        queryKey: QUERY_KEYS.projects.detail(projectId!),
        queryFn: () => projectRepository.getProject(projectId!),
        enabled: editMode,
    });

    useEffect(() => {
        if (isError) {
            alert('데이터 로드에 실패했어요');
            navigate(-1);
        }
    }, [isError, navigate])


    useEffect(() => {
        if (editMode && data) {
            const payload = projectMapper.toPayload(data);
            reset(payload);
        }
    }, [data, editMode]);

    const handleSuccess = async () => {
        await queryClient.invalidateQueries({
            queryKey: QUERY_KEYS.projects.all,
        });
        navigate(PATHS.HOME);
    }

    const createMutation = useMutation({
        mutationFn: (payload: ProjectCreatePayload) =>
            projectRepository.createProject(projectMapper.toRequest(payload)),
        onSuccess: handleSuccess,
        onError: (error) => { alert(error.message) }
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, payload }: { id: number, payload: ProjectCreatePayload }) =>
            projectRepository.updateProject(id, projectMapper.toRequest(payload)),
        onSuccess: handleSuccess,
        onError: (error) => { alert(error.message) }
    });

    const isLoading = editMode ? updateMutation.isPending : createMutation.isPending;

    const onSubmit = (payload: ProjectCreatePayload) => {
        if (editMode) {
            updateMutation.mutate({
                id: projectId!,
                payload: payload,
            });
        } else {
            createMutation.mutate(payload);
        }
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
            <SubmitButton isLoading={isLoading} />
        </form>
    );
};

export default ProjectPost;