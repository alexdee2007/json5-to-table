declare module "@alexdee2007/json5-to-table" {
  export interface ISchema {
    title: string;
    path: string;
    props?: ISchema[];
  }

  export interface IOptions {
    parseSchemaToData?: "stack" | "flatten";
    attributes?: {
      table?: Partial<HTMLTableElement> & Record<string, unknown>;
      thead?: Partial<HTMLTableSectionElement> & Record<string, unknown>;
      tbody?: Partial<HTMLTableSectionElement> & Record<string, unknown>;
      tr?: Partial<HTMLTableRowElement> & Record<string, unknown>;
      "thead.tr"?: Partial<HTMLTableRowElement> & Record<string, unknown>;
      "tbody.tr"?: Partial<HTMLTableRowElement> & Record<string, unknown>;
      th?: Partial<HTMLTableCellElement> & Record<string, unknown>;
      td?: Partial<HTMLTableCellElement> & Record<string, unknown>;
    };
  }

  export function generateHTMLTable(data: Array<Record<string, unknown>>, schema: ISchema[], options: IOptions): string;
}
