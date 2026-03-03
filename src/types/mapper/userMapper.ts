import type { SkillSet } from "../domain/userTypes";
import type { SkillSetUiModel } from "../uiModel/userUiModel";

export const userMapper = {
    toSkillSetUiModel: (skillSet: SkillSet): SkillSetUiModel => {
        return {
            filed: skillSet.field,
            stacks: skillSet.stacks.join(', '),
        }
    }
}