import RegisterStudentInputData from './RegisterStudentInputDataType';

type RegisterCompanyInputData = {
  companyName: string,
  website: string,
  address: string,
  description: string,
};

export function isRegisterCompanyInputData(inputData: RegisterCompanyInputData | RegisterStudentInputData): inputData is RegisterCompanyInputData {
  return (inputData as RegisterCompanyInputData).companyName !== undefined &&
         (inputData as RegisterCompanyInputData).website !== undefined &&
         (inputData as RegisterCompanyInputData).address !== undefined &&
         (inputData as RegisterCompanyInputData).description !== undefined;
}

export default RegisterCompanyInputData;
