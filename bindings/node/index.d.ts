type BaseNode = {
  type: string;
  named: boolean;
};

type ChildNode = {
  multiple: boolean;
  required: boolean;
  types: BaseNode[];
};

type NodeInfo =
  | (BaseNode & {
      subtypes: BaseNode[];
    })
  | (BaseNode & {
      fields: { [name: string]: ChildNode };
      children: ChildNode[];
    });

export const language: unknown;
export const nodeTypeInfo: NodeInfo[] | undefined;

export function getHighlightsQuery(): string;
export function getInjectionsQuery(): string;
export function getLocalsQuery(): string;
export function getFoldsQuery(): string;
export function getIndentsQuery(): string;

export default { language, nodeTypeInfo, getHighlightsQuery, getInjectionsQuery, getLocalsQuery, getFoldsQuery, getIndentsQuery };
