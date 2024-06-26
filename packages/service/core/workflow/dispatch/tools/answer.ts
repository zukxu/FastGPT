import {
  DispatchNodeResponseKeyEnum,
  SseResponseEventEnum
} from '@fastgpt/global/core/workflow/runtime/constants';
import { responseWrite } from '../../../../common/response';
import { textAdaptGptResponse } from '@fastgpt/global/core/workflow/runtime/utils';
import type { ModuleDispatchProps } from '@fastgpt/global/core/workflow/type/index.d';
import { NodeOutputKeyEnum } from '@fastgpt/global/core/workflow/constants';
import { DispatchNodeResultType } from '@fastgpt/global/core/workflow/runtime/type';
export type AnswerProps = ModuleDispatchProps<{
  text: string;
}>;
export type AnswerResponse = DispatchNodeResultType<{
  [NodeOutputKeyEnum.answerText]: string;
}>;

export const dispatchAnswer = (props: Record<string, any>): AnswerResponse => {
  const {
    res,
    detail,
    stream,
    node: { name },
    params: { text = '' }
  } = props as AnswerProps;

  const formatText = typeof text === 'string' ? text : JSON.stringify(text, null, 2);

  if (res && stream) {
    responseWrite({
      res,
      event: detail ? SseResponseEventEnum.fastAnswer : undefined,
      data: textAdaptGptResponse({
        text: `\n${formatText}`
      })
    });
  }

  return {
    [NodeOutputKeyEnum.answerText]: formatText,
    [DispatchNodeResponseKeyEnum.nodeResponse]: {
      textOutput: formatText
    }
  };
};
