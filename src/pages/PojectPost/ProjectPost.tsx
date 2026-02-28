import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import DateInput from "../../components/Form/Input/DateInput";
import FileInput from "../../components/Form/Input/FileInput";
import Select from "../../components/Form/Input/Select";
import TextInput from "../../components/Form/Input/TextInput";
import FormManager from "../../components/Form/Manager/FormManager";
import TextArea from "../../components/Form/TextArea/TextArea";
import MarkdownPreview from "../../components/MarkdownPreview/MarkdownPreview";
import { PATHS } from "../../consts/Paths";
import { QUERY_KEYS } from "../../consts/QueryKeys";
import { projectRepository } from "../../data/projectRepository";
import { useImageUpload } from "../../hooks/useImageUpload";
import { projectCategoryEntries, projectMapper, projectStatusEntries } from "../../types/mapper/projectMapper";
import type { ProjectCreatePayload } from "../../types/uiModel/projectUiModel";
import styled from './ProjectPost.module.css';

const ProjectPost = () => {
    const { id } = useParams<{ id: string }>();
    const projectId = id ? Number(id) : null;
    const editMode = Boolean(id);
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const {
        register,
        control,
        handleSubmit,
        reset,
        watch,
        getValues,
        setValue,
    } = useForm<ProjectCreatePayload>({
        defaultValues: {
            category: 'PERSONAL',
            status: 'NOT_DEPLOYED'
        }
    });
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
    }, [data, editMode, reset]);

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

    const uploadImage = (file: File) => {
        imageUploadMutate(
            { bucket: 'projects', file: file },
            {
                onSuccess: (url) => {
                    const originContent = getValues('content');
                    const imageMarkdown = `![](${url})`;
                    setValue('content', `${originContent}\n${imageMarkdown}`);
                },
            }
        )
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
        <div className={styled.container}>
            <form className={styled.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={styled.inputWrapper}>
                    <TextInput
                        type='text'
                        fontWeight='medieum'
                        placheholder='제목을 입력하세요'
                        registration={register('title', {
                            required: '제목을 입력해주세요'
                        })} />
                    <div className={styled.rowWrapper}>
                        <div className={styled.rowItem}>
                            <DateInput
                                label='시작 날짜'
                                name='startDate'
                                control={control}
                                rules={{ required: '시작 날짜를 선택해주세요' }} />
                        </div>
                        <div className={styled.rowItem}>
                            <DateInput
                                label='종료 날짜'
                                name='endDate'
                                rules={{
                                    validate: (value, formValues) => {
                                        if (!value) return true;
                                        return value >= formValues.startDate
                                            || '종료 날짜는 시작 날짜보다 빠를 수 없습니다';
                                    }
                                }}
                                control={control} />
                        </div>
                        <div className={styled.rowItem}>
                            <Select
                                options={projectCategoryEntries}
                                valueKey='id'
                                labelKey='label'
                                registration={register('category', {
                                    required: '프로젝트 유형을 선택해주세요'
                                })} />
                        </div>
                        <div className={styled.rowItem}>
                            <Select
                                options={projectStatusEntries}
                                valueKey='id'
                                labelKey='label'
                                registration={register('status', {
                                    required: '프로젝트 상태를 선택해주세요'
                                })} />
                        </div>
                    </div>
                    <div className={styled.rowWrapper}>
                        <div className={styled.rowItem}>
                            <TextInput
                                type='url'
                                placheholder='https://... (github)'
                                registration={register('projectUrl')}
                            />
                        </div>
                        <div className={styled.rowItem}>
                            <TextInput
                                type='url'
                                placheholder='https://... (추가 링크)'
                                registration={register('additionalUrl')}
                            />
                        </div>
                        <FileInput onSelectedFile={uploadImage} />

                    </div>
                    <div className={styled.textareaWrapper}>
                        <TextArea
                            placeholder='내용...'
                            disabled={imageUploadPending}
                            registration={register('content', {
                                required: '내용을 입력해주세요'
                            })}
                        />
                    </div>
                </div>
                <FormManager isLoading={isLoading} />
            </form>
            <div className={styled.markdownContainer}>
                <MarkdownPreview markdown={markdown} />
            </div>
        </div>
    );
};

export default ProjectPost;