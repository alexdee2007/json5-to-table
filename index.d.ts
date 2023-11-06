declare module "@alexdee2007/json5-to-table" {
  export interface ISchema {
    title: string;
    path: string;
    props?: ISchema[];
  }

  export interface IOptions {
    parseSchemaToData?: "stack" | "flatten";
    attributes?: {
      table?: HTMLTableElement;
      thead?: HTMLTableSectionElement;
      tbody?: HTMLTableSectionElement;
      tr?: HTMLTableSectionElement;
      "thead.tr"?: HTMLTableSectionElement;
      "tbody.tr"?: HTMLTableSectionElement;
      th?: HTMLTableCellElement;
      td?: HTMLTableCellElement;
    };
    HTMLTableCellElement;
  }

  export function generateHTMLTable(data: Array<Record<string, unknown>>, schema: ISchema[], options: IOptions): string;
}
