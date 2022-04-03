import * as yup from 'yup';

export const foodSchema = yup
  .object()
  .shape({
    name: yup.string().required(),
    description: yup.string().required(),
    hidden: yup.boolean().required(),
    categoryId: yup.string().required(),
    portions: yup
      .array()
      .of(
        yup
          .object()
          .shape({
            price: yup.number().required(),
            weight: yup.number().required(),
          })
          .noUnknown()
      )
      .required(),
  })
  .noUnknown();

export const foodPUTSchema = yup
  .object()
  .shape({
    name: yup.string().when(['description', 'hidden', 'categoryId', 'portions'], {
      is: undefined,
      then: yup.string().required('Body must have one value'),
    }),
    description: yup.string(),
    hidden: yup.boolean(),
    categoryId: yup.string(),
    image: yup.string(),
    portions: yup.array().of(
      yup
        .object()
        .shape({
          price: yup.number(),
          weight: yup.number(),
        })
        .noUnknown()
    ),
  })
  .noUnknown();
