import type { SkillSet } from "../types/domain/userTypes";

interface UserRepository {
    getSkillSets(): SkillSet[];
}

export const userRepository: UserRepository = {
    getSkillSets: (): SkillSet[] => {
        return [
            {
                field: 'Android',
                stacks: [
                    'Kotlin',
                    'Coroutines/Flow',
                    'Hilt',
                    'Jetpack Compose/Viewmodel/Room',
                    'Retrofit2/Ktor'
                ],
            },
            {
                field: 'Frontend',
                stacks: [
                    'JS/TS',
                    'HTML5/CSS3',
                    'React',
                    'Redux',
                ],
            },
            {
                field: 'Backend',
                stacks: [
                    'Java17',
                    'SpringBoot',
                    'PostgresQL',
                    'Redis',
                ],
            }
        ];
    }
}