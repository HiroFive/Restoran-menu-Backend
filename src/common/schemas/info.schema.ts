import * as yup from 'yup';

export const infoSchema = yup
  .object()
  .shape({
    address: yup.string().when(['contacts', 'wifiPassword'], {
      is: undefined,
      then: yup.string().required('Body must have one value'),
    }),
    contacts: yup.string(),
    wifiPassword: yup.string(),
  })
  .noUnknown();
