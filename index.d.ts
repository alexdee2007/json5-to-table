declare module '@alexdee2007/json5-to-table' {
  export interface ISchema {
    title: string;
    path: string;
    props?: ISchema[];
  }

  export interface IOptions {
    parseSchemaToData?: 'stack' | 'flatten';
    attributes?: {
      table?: import('vue').TableHTMLAttributes;
      thead?: import('vue').HTMLAttributes;
      tbody?: import('vue').HTMLAttributes;
      tr?: import('vue').HTMLAttributes;
      'thead.tr'?: import('vue').HTMLAttributes;
      'tbody.tr'?: import('vue').HTMLAttributes;
      th?: import('vue').HTMLAttributes;
      td?: import('vue').HTMLAttributes;
    };
  }

  export function generateHTMLTable(data: Array<Record<string, unknown>>, schema: ISchema[], options: IOptions): string;
}
