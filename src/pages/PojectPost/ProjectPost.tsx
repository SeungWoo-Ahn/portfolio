import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, type ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import SubmitButton from "../../components/Form/Button/SubmitButton";
import TextInput from "../../components/Form/Input/TextInput";
import MarkdownPreview from "../../components/MarkdownPreview/MarkdownPreview";
import TextArea from "../../components/Form/TextArea/TextArea";
import { PATHS } from "../../consts/Paths";
import { QUERY_KEYS } from "../../consts/QueryKeys";
import { projectRepository } from "../../data/projectRepository";
import { useImageUpload } from "../../hooks/useImageUpload";
import { projectCategoryEntries, projectMapper, projectStatusEntries } from "../../types/mapper/projectMapper";
import type { ProjectCreatePayload } from "../../types/uiModel/projectUiModel";

const ProjectPost = () => {
    const { id } = useParams<{ id: string }>();
    const projectId = id ? Number(id) : null;
    const editMode = Boolean(id);
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { register, handleSubmit, reset, watch, getValues, setValue } = useForm<ProjectCreatePayload>();
    const { mutate: imageUploadMutate, isPending: imageUploadPending } = useImageUpload();
    const markdown = watch('content');

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

    const isLoading = imageUploadPending &&
        editMode ? updateMutation.isPending : createMutation.isPending;

    const handleSelectImage = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (!selectedFile) {
            return;
        } 
        imageUploadMutate(
            { bucket: 'projects', file: selectedFile },
            {
                onSuccess: (url) => {
                    const originContent = getValues('content');
                    const imageMarkdown = `![](${url})`;
                    setValue('content', `${originContent}\n${imageMarkdown}`);
                 },
            }
        )
        event.target.value = '';
    }

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
        <>
            <input type='file' accept='image/*' onChange={handleSelectImage} />
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextInput
                    type='text'
                    fontWeight='medieum'
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
                {/* <TextInput
                    type='date'
                    registration={register('startDate', {
                        required: true
                    })}
                />
                <TextInput
                    type='date'
                    registration={register('endDate', {
                        validate: (value, formValues) => {
                            if (!value) return true;
                            return value >= formValues.startDate || '종료일은 시작일보다 빠를 수 없습니다.'
                        }
                    })}
                /> */}
                <TextArea
                    placeholder='내용...'
                    disabled={imageUploadPending}
                    registration={register('content', {
                        required: true
                    })}
                />
                <TextInput
                    type='url'
                    placheholder='https://... (github)'
                    registration={register('projectUrl')}
                />
                <TextInput
                    type= 'url'
                    placheholder='https://... (추가 링크)'
                    registration={register('additionalUrl')}
                />
                <SubmitButton isLoading={isLoading} />
            </form>
            <MarkdownPreview markdown={markdown} />
        </>
    );
};

export default ProjectPost;