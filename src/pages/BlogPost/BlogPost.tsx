import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import FileInput from "../../components/Form/Input/FileInput";
import TextInput from "../../components/Form/Input/TextInput";
import FormManager from "../../components/Form/Manager/FormManager";
import TextArea from "../../components/Form/TextArea/TextArea";
import MarkdownPreview from "../../components/MarkdownPreview/MarkdownPreview";
import { PATHS } from "../../consts/Paths";
import { QUERY_KEYS } from "../../consts/QueryKeys";
import { blogRepository } from "../../data/blogRepository";
import { useImageUpload } from "../../hooks/useImageUpload";
import { blogMapper } from "../../types/mapper/blogMapper";
import type { BlogPostCreatePayload } from "../../types/uiModel/blogUiModel";

const BlogPost = () => {
    const { id } = useParams<{ id: string }>();
    const projectId = id ? Number(id) : null;
    const editMode = Boolean(id);
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { register, handleSubmit, reset, watch, getValues, setValue } = useForm<BlogPostCreatePayload>();
    const { mutate: imageUploadMutate, isPending: imageUploadPending } = useImageUpload();
    const markdown = watch('content');

    const { data, isError } = useQuery({
        queryKey: QUERY_KEYS.blogs.detail(projectId!),
        queryFn: () => blogRepository.getBlogPost(projectId!),
        enabled: editMode,
    });

    useEffect(() => {
        if (isError) {
            alert('데이터 로드에 실패했어요');
            navigate(-1);
        }
    }, [isError, navigate]);

    useEffect(() => {
        if (editMode && data) {
            const payload = blogMapper.toPayload(data);
            reset(payload);
        }
    }, [data, editMode]);

    const handleSuccess = async () => {
        await queryClient.invalidateQueries({
            queryKey: QUERY_KEYS.blogs.all,
        });
        navigate(PATHS.HOME);
    }

    const createMutation = useMutation({
        mutationFn: (payload: BlogPostCreatePayload) =>
            blogRepository.createBlogPost(blogMapper.toRequest(payload)),
        onSuccess: handleSuccess,
        onError: (error) => { alert(error.message) }
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, payload }: { id: number, payload: BlogPostCreatePayload }) =>
            blogRepository.updateBlogPost(id, blogMapper.toRequest(payload)),
        onSuccess: handleSuccess,
        onError: (error) => { alert(error.message) }
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
            }
        )
    }

    const onSubmit = (payload: BlogPostCreatePayload) => {
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
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextInput
                    type='text'
                    placheholder='제목을 입력하세요'
                    registration={register('title', {
                        required: true
                    })}
                />
                <FileInput onSelectedFile={uploadImage} />
                <TextArea
                    placeholder='내용...'
                    disabled={imageUploadPending}
                    registration={register('content', {
                        required: true
                    })}
                />
                <FormManager isLoading={isLoading} />
            </form>
            <MarkdownPreview markdown={markdown} />
        </>
    );
};

export default BlogPost;