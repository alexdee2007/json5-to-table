declare module "@alexdee2007/json5-to-table" {
  export interface ISchema {
    title: string;
    path: string;
    props?: ISchema[];
  }

  export interface IOptions {
    parseSchemaToData?: "stack" | "flatten";
    attributes?: {
      table?: HTMLTableElement & Record<string, unknown>;
      thead?: HTMLTableSectionElement & Record<string, unknown>;
      tbody?: HTMLTableSectionElement & Record<string, unknown>;
      tr?: HTMLTableRowElement & Record<string, unknown>;
      "thead.tr"?: HTMLTableRowElement & Record<string, unknown>;
      "tbody.tr"?: HTMLTableRowElement & Record<string, unknown>;
      th?: HTMLTableCellElement & Record<string, unknown>;
      td?: HTMLTableCellElement & Record<string, unknown>;
    };
  }

  export function generateHTMLTable(data: Array<Record<string, unknown>>, schema: ISchema[], options: IOptions): string;
}
