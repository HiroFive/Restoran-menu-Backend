import * as yup from 'yup';

export const categorySchema = yup
  .object()
  .shape({
    title: yup.string().required(),
    hidden: yup.boolean().required(),
    parentId: yup.string().nullable(),
  })
  .noUnknown();

export const categoryPUTSchema = yup
  .object()
  .shape({
    title: yup.string().when(['hidden', 'parentId'], {
      is: undefined,
      then: yup.string().required('Body must have one value'),
    }),
    hidden: yup.boolean(),
    parentId: yup.string().nullable(),
  })
  .noUnknown();
