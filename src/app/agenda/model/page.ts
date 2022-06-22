import { Pageable } from "./pageable";
import { Sort } from "./sort";

export interface Page {
    content: Array<any>;
    pageable: Pageable;
    last: boolean;
    totalPages: number;
    totalElements: number;
    first: boolean;
    sort: Sort;
    numberOfElements: number;
    size: number;
    number: number;
    empty: boolean;
  }