import qs from 'qs';
export interface IQueryParams {
  [key: string]: string | qs.ParsedQs | string[] | qs.ParsedQs[];
}

export interface IDBRequestParams {
  menuCategory: {
    attributes: Array<string>;
    where: {
      [key: string]: any;
    };
  };
  getByWithFood: {
    attributes: Array<string>;
    include: Array<any>;
    where: {
      [key: string]: any;
    };
  };
}
