## 포트폴리오 웹사이트
제 포트폴리오 웹사이트입니다. 소개, 프로젝트, 블로그 정보를 확인할 수 있습니다. <br>
개인 프로젝트로 React + Typescript로 7일 동안 개발했고, DB는 supabase를 사용했습니다. <br>

### 한 눈에 보기

|<img height="600" src="https://github.com/user-attachments/assets/fdf5ce6d-2cde-4314-8896-dcc103d53513" />|<img height="600" src="https://github.com/user-attachments/assets/642af6a2-95f6-4706-aff9-4fd97895319c" />|
|:-:|:-:|
|로그인|프로젝트 조회|

|<img height="600" src="https://github.com/user-attachments/assets/7e778f49-30a6-44e0-a9ab-ec5986239703" />|
|:-:|
|프로젝트 추가|

<br>

### 주요 구현 사항
#### 사용자 인증
사용자 인증을 위해 supabase auth를 사용했습니다. 관리자용으로만 사용하기 때문에 회원 가입은 제외했습니다. <br>
authListener를 useEffect 내에서 구독하고 인증 정보를 Redux에 저장했고, clear 시점에 구독을 해제했습니다. <br>
Provider와 custom hook으로 앱 전역에서 인증 정보를 사용하도록 만들었습니다. <br>

<a href="https://github.com/SeungWoo-Ahn/portfolio/blob/main/src/providers/AuthProvider.tsx">AuthProvider.tsx</a>
```typescript
export const AuthProvider = ({ children }: AuthProviderProps) => {
    const dispatch = useDispatch();

    useEffect(() => {
        supabaseClient.auth
            .getSession()
            .then(({ data: { session } }) => {
                dispatch(setSession(session?.user));
            });

        const { data: { subscription } } = supabaseClient.auth
            .onAuthStateChange((_, session) => {
                dispatch(setSession(session?.user));
            });

        return () => subscription.unsubscribe();
    }, [dispatch]);

    return <>{children}</>;
}

export const useAuth = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    return { isLoggedIn: !!user } as const;
};
```
<br>

#### Repository 패턴
supabase와 통신하는 비즈니스 로직을 UI에 노출하지 않고, 이미지 업로드 등 기능 합성을 위해 Repository 패턴을 사용했습니다. <br>
도메인별로 나눴고 useQuery, useMutation의 Fn에 사용했습니다. <br>

<a href="https://github.com/SeungWoo-Ahn/portfolio/blob/main/src/data/projectRepository.ts">projectRepository.ts</a>
```typescript
export const projectRepository: ProjectRepository = {
    createProject: async (request: ProjectCreateRequest): Promise<void> => {
        const { error } = await supabaseClient
            .from(PROJECT_TABLE_NAME)
            .insert(request);
        if (error) {
            throw wrapDatabaseError(error);
        };
    },
    getProjects: async (): Promise<Project[]> => {
        const { data, error } = await supabaseClient
            .from(PROJECT_TABLE_NAME)
            .select('*')
            .order('start_date', { ascending: false });
        if (error) {
            throw wrapDatabaseError(error);
        };
        return data as Project[];
    }
...
}

const ProjectPost = () => {
    const { id } = useParams<{ id: string }>();
    const projectId = id ? Number(id) : null;
    const editMode = Boolean(id);

    const { data, isError } = useQuery({
        queryKey: QUERY_KEYS.projects.detail(projectId!),
        queryFn: () => projectRepository.getProject(projectId!),
        select: (data) => projectMapper.toPayload(data),
        enabled: editMode,
        retry: false,
    });
}
```

domain과 uiModel을 분리해서 데이터 변환 로직을 mapper에 집중시켰습니다. <br>
Color 등 디자인 요소를 string으로 관리해서 다이나믹한 디자인이 가능했고, 데이터 일관성을 지키고 유지보수성을 향상했습니다. <br>

<a href="https://github.com/SeungWoo-Ahn/portfolio/blob/main/src/types/mapper/projectMapper.ts">projectMapper.ts</a>
```typescript
export const projectMapper = {
    ...
    toUiModel: (project: Project): ProjectUiModel => {
        return {
            id: project.id,
            title: project.title,
            content: project.content,
            status: ProjectStatusRecord[project.status],
            category: ProjectCategoryRecord[project.category],
            projectPeriod: project.end_date
                ? `${dateMapper.toFullDate(project.start_date)} - ${dateMapper.toFullDate(project.end_date)}`
                : `${dateMapper.toFullDate(project.start_date)} - 진행 중`,
            projectUrl: project.project_url,
            additionalUrl: project.additional_url,
            createdAt: dateMapper.toFullDate(project.created_at),
        }
    }
}
```

<br>

#### 전역 에러 처리
supabase 에러를 알림 메세지로 변환해서 사용자에게 toast로 띄워주었습니다. <br>
auth/database/storage에서 발생하는 에러 종류를 선언하고, 커스텀 에러로 wrapping했습니다. <br>
QueryClient에서 에러를 잡아서 메세지를 처리했습니다. <br>

<a href="https://github.com/SeungWoo-Ahn/portfolio/blob/main/src/data/error/errorHandlers.ts">errorHandler.ts</a>
```typescript
const AuthErrorsRecord: Record<string, string> = {
    'invalid_credentials': '이메일/비밀번호가 일치하지 않습니다',
    'user_not_found': '존재하지 않는 사용자입니다',
};

export const wrapAuthError = (error: AuthError): SupabaseAuthError => {
    const code = error.code || '';
    const message = AuthErrorsRecord[code] ?? '인증 과정에서 오류가 발생했습니다';
    return new SupabaseAuthError(message);
}

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      if (isSupabaseError(error)) {
        toast.error(error.message);
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      if (isSupabaseError(error)) {
        toast.error(error.message);
      }
    }
  })
});
```
