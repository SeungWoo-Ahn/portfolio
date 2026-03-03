import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm, type FieldErrors } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import FileInput from "../../components/Form/Input/FileInput";
import TextInput from "../../components/Form/Input/TextInput";
import FormManager from "../../components/Form/Manager/FormManager";
import TextArea from "../../components/Form/TextArea/TextArea";
import MarkdownPreview from "../../components/MarkdownPreview/MarkdownPreview";
import { QUERY_KEYS } from "../../consts/QueryKeys";
import { blogRepository } from "../../data/blogRepository";
import { useImageUpload } from "../../hooks/useImageUpload";
import { useToast } from "../../hooks/useToast";
import { blogMapper } from "../../types/mapper/blogMapper";
import type { BlogPostCreatePayload } from "../../types/uiModel/blogUiModel";
import styled from './BlogPost.module.css';
import { useEffect } from "react";
import { PATHS } from "../../consts/Paths";

const BlogPost = () => {
    const { id } = useParams<{ id: string }>();
    const blogPostId = id ? Number(id) : null;
    const editMode = Boolean(id);
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { showToast } = useToast();

    const { data, isError } = useQuery({
        queryKey: QUERY_KEYS.blogs.detail(blogPostId!),
        queryFn: () => blogRepository.getBlogPost(blogPostId!),
        select: (data) => blogMapper.toPayload(data),
        enabled: editMode,
        retry: false,
    });

    useEffect(() => {
        if (isError) {
            setTimeout(() => {
                navigate(PATHS.HOME, { replace: true });
            }, 1_500);
        }
    }, [isError, navigate]);

    const {
        register,
        handleSubmit,
        watch,
        getValues,
        setValue
    } = useForm<BlogPostCreatePayload>({
        values: data,
    });
    const { mutate: imageUploadMutate, isPending: imageUploadPending } = useImageUpload();
    const markdown = watch('content');

    const handleSuccess = async (message: string) => {
        await queryClient.invalidateQueries({
            queryKey: QUERY_KEYS.blogs.all,
        });
        showToast('success', message);
        navigate(-1);
    }

    const createMutation = useMutation({
        mutationFn: (payload: BlogPostCreatePayload) =>
            blogRepository.createBlogPost(blogMapper.toRequest(payload)),
        onSuccess: () => handleSuccess('포스트를 추가했습니다'),
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, payload }: { id: number, payload: BlogPostCreatePayload }) =>
            blogRepository.updateBlogPost(id, blogMapper.toRequest(payload)),
        onSuccess: () => handleSuccess('포스트를 생성했습니다'),
    });

    const isLoading = imageUploadPending &&
        editMode ? updateMutation.isPending : createMutation.isPending;

    const uploadImage = (file: File) => {
        imageUploadMutate(
            { bucket: 'blogs', file: file },
            {
                onSuccess: (url) => {
                    const originContent = getValues('content');
                    const imageMarkdown = `![](${url})`;
                    setValue('content', `${originContent}\n${imageMarkdown}`);
                },
                onError: (error) => {
                    showToast('error', error.message);
                }
            }
        )
    }

    const onSubmit = (payload: BlogPostCreatePayload) => {
        if (editMode) {
            updateMutation.mutate({
                id: blogPostId!,
                payload: payload,
            });
        } else {
            createMutation.mutate(payload);
        }
    }

    const onSubmitInvalid = (errors: FieldErrors) => {
        const e = Object.values(errors);
        showToast('error', e[0]?.message as string);
    }

    return (
        <div className={styled.container}>
            <form
                className={styled.form}
                onSubmit={handleSubmit(onSubmit, onSubmitInvalid)}>
                <div className={styled.inputWrapper}>
                    <TextInput
                        type='text'
                        placheholder='제목을 입력하세요'
                        registration={register('title', {
                            required: '제목을 입력해주세요'
                        })}
                    />
                    <div className={styled.rowWrapper}>
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

export default BlogPost;